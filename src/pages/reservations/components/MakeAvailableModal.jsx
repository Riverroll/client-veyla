import { useState } from "react";

const MakeAvailableModal = ({ isOpen, onClose, onSubmit, tableName }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(); // Memanggil fungsi onSubmit untuk mengubah status tabel
      onClose(); // Menutup modal setelah berhasil
    } catch (error) {
      console.error("Error making table available:", error);
    }
  };

  if (!isOpen) return null; // Tidak merender modal jika tidak dalam keadaan terbuka

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Make Table Available</h2>
        <p className="mb-4">
          Are you sure you want to make the table <strong>{tableName}</strong>{" "}
          available again? This will remove the reservation.
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Make Available
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeAvailableModal;
