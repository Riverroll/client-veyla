import { formatCurrency } from "../../../utils/format";

const TransactionDetailModal = ({ open, onClose, transaction }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg z-10 p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
        {transaction ? (
          <div>
            <p>
              <strong>ID:</strong> {transaction.id}
            </p>
            <p>
              <strong>User:</strong> {transaction.user?.name || "N/A"}
            </p>
            <p>
              <strong>Table:</strong> {transaction.table?.table_name || "N/A"}
            </p>
            <p>
              <strong>Total Price:</strong> {transaction.total_price}
            </p>
            <p>
              <strong>Datetime:</strong> {transaction.createdAt}
            </p>
            <p>
              <strong>Status:</strong> {transaction.status}
            </p>
            {/* Displaying order details */}
            <h3 className="text-lg font-semibold mt-4">Order Details:</h3>
            {transaction.orderDetails && transaction.orderDetails.length > 0 ? (
              <ul className="mt-2">
                {transaction.orderDetails.map((detail) => (
                  <li key={detail.id} className="flex items-center mb-2">
                    <img
                      src={detail.product.product_image}
                      alt={detail.product.product_name}
                      className="w-16 h-16 object-cover rounded mr-2"
                    />
                    <div>
                      <p>
                        <strong>{detail.product.product_name}</strong>{" "}
                        (Quantity: {detail.quantity})
                      </p>
                      <p>Price: {formatCurrency(detail.product_price)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No order details available.</p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailModal;
