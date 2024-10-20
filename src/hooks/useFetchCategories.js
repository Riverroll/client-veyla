import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCategories = () => {
  // Mendefinisikan state untuk menyimpan data kategori, status loading, dan pesan error
  const [categories, setCategories] = useState([]); // State untuk menyimpan daftar kategori
  const [loading, setLoading] = useState(true); // State untuk menunjukkan status loading
  const [error, setError] = useState(null); // State untuk menyimpan pesan error

  // Menggunakan useEffect untuk mengambil data kategori saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchCategories = async () => {
      // Fungsi asinkron untuk mengambil data kategori
      try {
        // Melakukan permintaan GET ke endpoint /categories
        const response = await axios.get(
          "http://localhost:8001/api/categories",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.status === "success") {
          setCategories(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories(); // Memanggil fungsi untuk mengambil data kategori
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  // Mengembalikan kategori, status loading, dan error
  return { categories, loading, error };
};

export default useFetchCategories;
