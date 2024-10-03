import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../../src/features/cart/cart";
import QRCode from "react-qr-code";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

const CheckoutModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedTable, setSelectedTable] = useState("");
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart?.items) || [];
  const total = useSelector((state) => state.cart?.total) || 0;
  const userId = useSelector((state) => state.user.User.id) || 1;

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
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handlePaymentComplete = async () => {
    try {
      setIsPaymentComplete(true);

      const orderPayload = {
        user_id: userId,
        table_id: selectedTable,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          product_price: item.product_price,
        })),
      };

      const token = localStorage.getItem("token");

      const response = await axiosInstance.post("/orders", orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || "Pesanan berhasil dibuat!");
        // setTimeout(() => {
        dispatch(clearCart());
        onClose();
        setStep(1);
        setSelectedTable("");
        setIsPaymentComplete(false);
        // }, 2000);
      } else {
        console.error("Failed to create order:", response.statusText);
        toast.error(response.data.message || "Gagal membuat pesanan.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Terjadi kesalahan saat mengirim pesanan.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full m-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {step === 2 ? "Payment Summary" : "Checkout"}
        </h2>

        {step === 1 && (
          <div>
            <h4 className="text-xl font-semibold mb-4">Detail Pesanan:</h4>
            <ul className="list-disc list-inside mb-4">
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.product_name} - Quantity: {item.quantity} - Price: IDR
                  {item.product_price ? item.product_price : 0}
                </li>
              ))}
            </ul>

            <p className="text-xl font-bold mb-4">
              Total: IDR{total.toFixed(2)}
            </p>

            <label htmlFor="table-select" className="block mb-2">
              Pilih Meja:
            </label>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <select
                id="table-select"
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              >
                <option value="">Pilih Meja</option>
                {tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.tableName}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Payment</h3>
            <p className="mb-2">Table: {selectedTable}</p>
            <h4 className="font-semibold mt-4 mb-2">Purchased Items:</h4>
            <ul className="list-disc list-inside mb-4">
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.product_name} - Quantity: {item.quantity} - Price: IDR
                  {item.product_price ? item.product_price : 0}
                </li>
              ))}
            </ul>
            <p className="text-xl font-bold mb-4">
              Total: IDR{total.toFixed(2)}
            </p>

            {/* Generate QR Code with data to scan */}
            <QRCode
              value={JSON.stringify({
                user_id: userId,
                table_id: selectedTable,
                items: cartItems.map((item) => ({
                  product_id: item.product_id,
                  quantity: item.quantity,
                  product_price: item.product_price,
                })),
              })}
              size={200}
              className="mx-auto mb-4"
            />

            <p>Scan the QR code to complete payment</p>
          </div>
        )}

<div className="flex justify-between mt-6">
          {step === 1 ? (
            <>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProceed}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                disabled={!selectedTable}
              >
                Next
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleBack}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handlePaymentComplete}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                {isPaymentComplete ? "Payment Successful!" : "Simulate Payment"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
