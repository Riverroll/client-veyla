function TableCard({ table, onEdit, onDelete, onReserve, onMakeAvailable }) {
  const { tableName, reservation } = table; // Mengambil nama tabel dan reservasi dari objek tabel
  const status = reservation ? "Reserved" : "Available"; // Menentukan status tabel (Tersedia atau Dipesan)

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-xl font-bold">{tableName}</h2>
      <p
        className={`text-lg ${
          status === "Reserved" ? "text-red-500" : "text-green-500"
        }`}
      >
        {status}
      </p>
      {reservation && (
        <div className="mt-2 text-sm text-gray-700">
          <p>
            <strong>Customer Name:</strong> {reservation.customer_name}
          </p>
          <p>
            <strong>Pax:</strong> {reservation.pax}
          </p>
          <p>
            <strong>Reserved At:</strong>{" "}
            {new Date(reservation.createdAt).toLocaleString()}
          </p>
        </div>
      )}
      <div className="mt-4 flex space-x-2">
        {status === "Available" && (
          <button
            onClick={onReserve}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Reserve
          </button>
        )}
        {status === "Reserved" && (
          <button
            onClick={onMakeAvailable}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Make Available
          </button>
        )}
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TableCard;
