import { useEffect, useState } from "react";
import axios from "axios";

const useFetchTransactions = () => {
  // Mendefinisikan state untuk menyimpan data transaksi, status loading, dan pesan error
  const [transactions, setTransactions] = useState([]); // State untuk data transaksi
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk pesan error

  // Fungsi untuk mengambil data transaksi dari API
  const fetchTransactions = async () => {
    try {
      // Melakukan permintaan GET ke endpoint /api/orders
      const response = await axios.get("http://localhost:8001/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Menyertakan token dalam header Authorization
        },
      });
      // Jika permintaan berhasil, simpan data transaksi ke state
      setTransactions(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Mengambil data transaksi saat komponen pertama kali dimuat
  useEffect(() => {
    fetchTransactions(); // Memanggil fungsi fetchTransactions untuk mengambil data
  }, []); // Menjalankan efek ini hanya sekali saat komponen pertama kali dimuat

  // Mengembalikan data transaksi, status loading, pesan error, dan fungsi refetch untuk mengambil ulang data
  return { transactions, loading, error, refetch: fetchTransactions };
};

export default useFetchTransactions;
