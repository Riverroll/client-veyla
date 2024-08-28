import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from "../../../../src/features/cart/cart";
import { QrCode } from 'lucide-react';
import { DataGrid } from '@mui/x-data-grid';
import axiosInstance from '../../../utils/axiosInstance';

const CheckoutModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedTable, setSelectedTable] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart?.items) || [];
  const total = useSelector(state => state.cart?.total) || 0;

  const paymentMethods = ['QRIS', 'Cash', 'Credit Card'];

  const fetchTables = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/tables");
      setTables(response.data.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch tables");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTables();
    }
  }, [isOpen]);

  const handleProceed = () => {
    if (step === 1 && selectedTable) {
      setStep(2);
    } else if (step === 2 && paymentMethod) {
      setStep(3);
    }
  };

  const handlePaymentComplete = () => {
    setIsPaymentComplete(true);
    setTimeout(() => {
      dispatch(clearCart());
      onClose();
      setStep(1);
      setSelectedTable(null);
      setPaymentMethod('');
      setIsPaymentComplete(false);
    }, 2000);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'table_name', headerName: 'Table Name', width: 130 },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full m-4">
        <h2 className="text-2xl font-bold mb-4">
          {step === 3 ? 'Payment Summary' : 'Checkout'}
        </h2>

        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Select a table:</h3>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={tables}
                  columns={columns}
                  loading={loading}
                  checkboxSelection
                  onSelectionModelChange={(newSelection) => {
                    const selectedId = newSelection[0];
                    const selectedTable = tables.find(table => table.id === selectedId);
                    setSelectedTable(selectedTable);
                  }}
                  disableColumnMenu
                />
              </div>
            )}
            {selectedTable && (
              <p className="mt-4">Selected Table: {selectedTable.table_name}</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <label htmlFor="payment-select" className="block mb-2">Select payment method:</label>
            <select
              id="payment-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="">Choose payment method</option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Receipt</h3>
            <p className="mb-2">Table: {selectedTable?.table_name}</p>
            <p className="mb-2">Payment Method: {paymentMethod}</p>
            <h4 className="font-semibold mt-4 mb-2">Purchased Items:</h4>
            <ul className="list-disc list-inside mb-4">
              {cartItems.map((item, index) => (
                <li key={index}>{item.name} - Quantity: {item.quantity} - Price: IDR{item.price.toFixed(2)}</li>
              ))}
            </ul>
            <p className="text-xl font-bold mb-4">Total: IDR{total.toFixed(2)}</p>
            <QrCode size={200} className="mx-auto mb-4" />
            <p>Scan the QR code to complete payment</p>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step < 3 ? (
            <>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleProceed}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={step === 1 ? !selectedTable : !paymentMethod}
              >
                {step === 2 ? 'Review Order' : 'Next'}
              </button>
            </>
          ) : (
            <button
              onClick={handlePaymentComplete}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {isPaymentComplete ? 'Payment Successful!' : 'Simulate Payment'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;