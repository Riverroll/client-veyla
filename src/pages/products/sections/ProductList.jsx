import { useState } from "react";
import useCategories from "../../../hooks/useCategories";
import useFetchProducts from "../../../hooks/useFetchProducts";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { formatCurrency } from "../../../utils/format";
import DataTable from "../../../components/common/tables/DataTable";
import AddModal from "../../../components/common/cards/AddModal";
import EditModal from "../../../components/common/cards/EditModal";
import DeleteModal from "../../../components/common/cards/DeleteModal";

const ProductList = () => {
  // Mengambil produk dan kategori menggunakan hook kustom
  const { products, loading, error, refetch } = useFetchProducts();
  const { categories } = useCategories();

  // Mengelola state untuk modal dan produk yang dipilih
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Handler untuk menambahkan produk baru
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axiosInstance.post("/products", newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      refetch();
      setAddModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  // Handler untuk mengedit dan menghapus produk
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  // Handler untuk mengirimkan produk yang telah diedit
  const handleEditSubmit = async (updatedProduct) => {
    try {
      const response = await axiosInstance.put(
        `/products/${selectedProduct.id}`,
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch();
      setEditModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    }
  };

  // Handler untuk mengonfirmasi penghapusan produk
  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosInstance.delete(
        `/products/${selectedProduct.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch();
      setDeleteModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  // Mendefinisikan kolom untuk tabel data
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "product_name", headerName: "Name", width: 200 },
    {
      field: "product_price",
      headerName: "Price",
      width: 150,
      renderCell: (params) => formatCurrency(params.value),
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      renderCell: (params) => (
        <p>{params.row.Category?.category_name || "N/A"}</p>
      ),
    },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "product_image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          className="w-16 h-16 object-cover"
        />
      ),
    },
  ];

  // Mengelola keadaan kesalahan
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <button
        onClick={() => setAddModalOpen(true)}
        className="mb-4 bg-teal-500 text-white px-4 py-2 rounded-md"
      >
        Add Product
      </button>
      <DataTable
        rows={products}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddProduct}
        fields={[
          { name: "product_name", label: "Name", type: "text", required: true },
          {
            name: "product_price",
            label: "Price",
            type: "text",
            required: true,
          },
          {
            name: "category_id",
            label: "Category",
            type: "select",
            required: true,
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
            required: false,
          },
          {
            name: "product_image",
            label: "Image URL",
            type: "text",
            required: false,
          },
        ]}
        options={{
          category_id: categories.map((category) => ({
            value: category.id,
            label: category.category_name,
          })),
        }}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={selectedProduct}
        fields={[
          { name: "product_name", label: "Name", type: "text", required: true },
          {
            name: "product_price",
            label: "Price",
            type: "text",
            required: true,
          },
          {
            name: "category_id",
            label: "Category",
            type: "select",
            required: true,
            options: categories.map((category) => ({
              value: category.id,
              label: category.category_name,
            })),
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
            required: false,
          },
          {
            name: "product_image",
            label: "Image URL",
            type: "text",
            required: false,
          },
        ]}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ProductList;
