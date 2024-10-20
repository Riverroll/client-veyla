import { useEffect, useState } from "react";
import axios from "axios";

const useFetchUsers = () => {
  // State untuk menyimpan data pengguna, status loading, dan error
  const [users, setUsers] = useState([]); // State untuk data pengguna
  const [loading, setLoading] = useState(true); // State untuk status loading, default true
  const [error, setError] = useState(null); // State untuk menyimpan pesan error jika terjadi kesalahan

  // Fungsi untuk mengambil data pengguna dari API
  const fetchUsers = async () => {
    try {
      // Mengambil data dari API dengan axios
      const response = await axios.get("http://localhost:8001/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Menyertakan token autentikasi dalam header permintaan
        },
      });
      setUsers(response.data.data); // Menyimpan data pengguna ke dalam state
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Menggunakan useEffect untuk menjalankan fetchUsers ketika komponen pertama kali dimuat
  useEffect(() => {
    fetchUsers(); // Memanggil fungsi fetchUsers untuk mengambil data
  }, []); // Dependency array kosong menandakan efek ini hanya berjalan sekali saat komponen dimuat

  return { users, loading, error, refetch: fetchUsers };
};

export default useFetchUsers;
