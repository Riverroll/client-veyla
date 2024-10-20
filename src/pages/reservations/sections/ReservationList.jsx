import { useState } from "react";
import TableCard from "../components/TableCard";
import useTables from "../../../hooks/useTables";
import AddModal from "../../../components/common/cards/AddModal";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import EditModal from "../../../components/common/cards/EditModal";
import DeleteModal from "../../../components/common/cards/DeleteModal";
import ReserveModal from "../components/ReserveModal";
import MakeAvailableModal from "../components/MakeAvailableModal";

const ReservationList = () => {
  const { tables, loading, error, refetch } = useTables(); // Mengambil data tabel, status loading, error, dan fungsi refetch
  const [selectedTable, setSelectedTable] = useState(null); // State untuk tabel yang dipilih
  const [isAddModalOpen, setAddModalOpen] = useState(false); // State untuk kontrol modal tambah tabel
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State untuk kontrol modal edit tabel
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // State untuk kontrol modal hapus tabel
  const [isReserveModalOpen, setReserveModalOpen] = useState(false); // State untuk kontrol modal reservasi tabel
  const [isMakeAvailableModalOpen, setMakeAvailableModalOpen] = useState(false); // State untuk kontrol modal membuat tabel tersedia

  const handleAddTable = async (newTable) => {
    try {
      const response = await axiosInstance.post("/tables/", newTable, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAddModalOpen(false);
      toast.success(response.data.message);
      refetch();
    } catch (error) {
      console.error("Failed to add table:", error);
      toast.error(error.response?.data?.message || "Failed to add table");
    }
  };

  const handleEditSubmit = async (updatedTable) => {
    try {
      const response = await axiosInstance.put(
        `/tables/${selectedTable.id}`,
        { table_name: updatedTable.tableName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch();
      setEditModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to update table:", error);
      toast.error(error.response?.data?.message || "Failed to update table");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosInstance.delete(
        `/tables/${selectedTable.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch();
      setDeleteModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to delete table:", error);
      toast.error(error.response?.data?.message || "Failed to delete table");
    }
  };

  const handleReserve = async (reservationData) => {
    try {
      const response = await axiosInstance.post(
        `/reservations/`,
        { ...reservationData, table_id: selectedTable.id, status: "reserved" },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch();
      setReserveModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to reserve table:", error);
      toast.error(error.response?.data?.message || "Failed to reserve table");
    }
  };

  const handleMakeAvailable = async () => {
    try {
      const response = await axiosInstance.put(
        `/reservations/${selectedTable.reservation.id}/available`,
        { status: "available" },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch();
      setMakeAvailableModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to make table available:", error);
      toast.error(
        error.response?.data?.message || "Failed to make table available"
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading tables</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Table List</h1>
      <button
        onClick={() => setAddModalOpen(true)}
        className="mb-4 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-4 py-2 rounded-md"
      >
        Add Table
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            onEdit={() => {
              setSelectedTable(table);
              setEditModalOpen(true);
            }}
            onDelete={() => {
              setSelectedTable(table);
              setDeleteModalOpen(true);
            }}
            onReserve={() => {
              setSelectedTable(table);
              setReserveModalOpen(true);
            }}
            onMakeAvailable={() => {
              setSelectedTable(table);
              setMakeAvailableModalOpen(true);
            }}
          />
        ))}
      </div>

      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddTable}
        fields={[
          {
            name: "table_name",
            label: "Table Name",
            type: "text",
            required: true,
          },
        ]}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={selectedTable || {}}
        fields={[
          {
            name: "tableName",
            label: "Table Name",
            type: "text",
            required: true,
          },
        ]}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedTable?.tableName || "Table"}
      />
      <ReserveModal
        isOpen={isReserveModalOpen}
        onClose={() => setReserveModalOpen(false)}
        onSubmit={handleReserve}
        fields={[
          {
            name: "customer_name",
            label: "Customer Name",
            type: "text",
            required: true,
          },
          { name: "pax", label: "Pax", type: "number", required: true },
        ]}
      />
      <MakeAvailableModal
        isOpen={isMakeAvailableModalOpen}
        onClose={() => setMakeAvailableModalOpen(false)}
        onSubmit={handleMakeAvailable}
        tableName={selectedTable?.tableName || "Table"}
      />
    </div>
  );
};

export default ReservationList;
