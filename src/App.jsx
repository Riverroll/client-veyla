import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchUserDetail } from "./hooks/useFetchUserDetail";
import { setUser } from "./features/users/user";
import PrivateRoute from "./utils/PrivateRoute";
import DashboardAdmin from "./pages/dashboard/DashboardAdmin";
import LoginAdmin from "./pages/auth/LoginAdmin";
import UsersAdmin from "./pages/users/UsersAdmin";
import "./App.css";
import ReservationAdmin from "./pages/reservations/ReservationAdmin";
import TransactionsAdmin from "./pages/transactions/TransactionsAdmin";
import ProductsAdmin from "./pages/products/ProductsAdmin";
function App() {
  const dispatch = useDispatch(); // Inisialisasi fungsi dispatch untuk mengirim aksi Redux
  const user = useSelector((state) => state.user.User); // Mengambil data pengguna dari Redux store

  // Mengambil data pengguna saat komponen dimuat
  useEffect(() => {
    const token = localStorage.getItem("token"); // Mengambil token dari local storage

    // Jika token ada dan data pengguna belum diambil
    if (token && user.length === 0) {
      const fetchUser = async () => {
        try {
          const userData = await fetchUserDetail(token); // Memanggil API untuk mengambil data pengguna
          dispatch(setUser(userData.data)); // Menyimpan data pengguna di Redux store
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      };

      fetchUser(); // Memanggil fungsi untuk mengambil data pengguna
    }
  }, [dispatch, user]); // Efek dijalankan ulang jika nilai dispatch atau user berubah

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardAdmin /> {/* Halaman DashboardAdmin untuk rute utama */}
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersAdmin /> {/* Halaman UsersAdmin untuk manajemen pengguna */}
            </PrivateRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <PrivateRoute>
              <ReservationAdmin />{" "}
              {/* Halaman ReservationAdmin untuk manajemen reservasi */}
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <TransactionsAdmin />{" "}
              {/* Halaman TransactionsAdmin untuk manajemen transaksi */}
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductsAdmin />{" "}
              {/* Halaman ProductsAdmin untuk manajemen produk */}
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginAdmin />} />
      </Routes>
    </>
  );
}

export default App;
