import DeleteModal from "../../../components/common/cards/DeleteModal";
import EditModal from "../../../components/common/cards/EditModal";
import DataTable from "../../../components/common/tables/DataTable";
import useFetchUsers from "../../../hooks/useFetchUsers";
import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import AddModal from "../../../components/common/cards/AddModal";
import { toast } from "react-toastify";

const UserList = () => {
  // Mengambil data pengguna dan status loading/error dari hook
  const { users, loading, error, refetch } = useFetchUsers();

  // State untuk pengguna yang dipilih dan status modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Fungsi untuk menambah pengguna
  const handleAddUser = async (newUser) => {
    try {
      const response = await axiosInstance.post("/auth/register", newUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      refetch(); // Memanggil ulang data pengguna
      setAddModalOpen(false); // Menutup modal tambah pengguna
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to add user:", error);
      toast.error(error.response?.data?.message || "Failed to add user");
    }
  };

  // Fungsi untuk membuka modal edit
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  // Fungsi untuk membuka modal delete
  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  // Fungsi untuk mengupdate pengguna
  const handleEditSubmit = async (updatedUser) => {
    try {
      const response = await axiosInstance.put(
        `/users/${selectedUser.id}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch(); // Memanggil ulang data pengguna
      setEditModalOpen(false); // Menutup modal edit pengguna
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  // Fungsi untuk mengkonfirmasi penghapusan pengguna
  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosInstance.delete(`/users/${selectedUser.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      refetch();
      setDeleteModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  // Definisi kolom untuk DataTable
  const columns = [
    { field: "id", headerName: "User ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <button
        onClick={() => setAddModalOpen(true)}
        className="mb-4 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-4 py-2 rounded-md"
      >
        Add User
      </button>
      <DataTable
        rows={users}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddUser}
        fields={[
          { name: "name", label: "Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          },
        ]}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={selectedUser || {}}
        fields={[
          { name: "name", label: "Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
        ]}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedUser?.name || "User"}
      />
    </div>
  );
};

export default UserList;
