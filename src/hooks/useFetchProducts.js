import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
const useFetchProducts = () => {
  // Mendefinisikan state untuk menyimpan data produk, status loading, dan pesan error
  const [products, setProducts] = useState([]); // State untuk menyimpan daftar produk
  const [loading, setLoading] = useState(true); // State untuk menunjukkan status loading
  const [error, setError] = useState(null); // State untuk menyimpan pesan error

  // Fungsi untuk mengambil data produk dari API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Melakukan permintaan GET ke endpoint /products
      const response = await axiosInstance.get("/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // Memeriksa apakah status respon dari API adalah 'success'
      if (response.data.status === "success") {
        setProducts(response.data.data); // Mengatur produk dengan data yang diterima
      } else {
        // Jika status tidak 'success', mengatur error dengan pesan yang diterima dari API
        setError(response.data.message || "Failed to fetch products");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Mengambil data produk saat komponen pertama kali dimuat
  useEffect(() => {
    fetchProducts(); // Memanggil fungsi fetchProducts untuk mengambil data
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  // Mengembalikan produk, status loading, error, dan fungsi untuk mengambil ulang data
  return { products, loading, error, refetch: fetchProducts };
};

export default useFetchProducts;
