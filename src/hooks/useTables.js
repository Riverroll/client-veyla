import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const useTables = () => {
  const [tables, setTables] = useState([]); // State untuk menyimpan data tabel
  const [loading, setLoading] = useState(true); // State untuk mengatur status loading
  const [error, setError] = useState(null); // State untuk menyimpan error jika ada

  // Fungsi untuk mengambil data tabel dari server
  const fetchTables = async () => {
    try {
      const response = await axiosInstance.get("/tables"); // Mengambil data tabel dari endpoint "/tables"
      setTables(response.data.data); // Menyimpan data tabel ke state
      setLoading(false); // Mengubah status loading menjadi false setelah data berhasil diambil
    } catch (error) {
      setError(error);
      toast.error("Failed to fetch tables");
      setLoading(false);
    }
  };

  // Mengambil data tabel ketika komponen pertama kali dimuat
  useEffect(() => {
    fetchTables(); // Memanggil fungsi fetchTables
  }, []); // Dependensi kosong menandakan efek ini hanya dijalankan sekali setelah komponen dimuat

  // Mengembalikan data yang relevan untuk digunakan di komponen lain
  return { tables, loading, error, refetch: fetchTables };
};

export default useTables;
