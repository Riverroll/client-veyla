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
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.User);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && user.length === 0) {
      const fetchUser = async () => {
        try {
          const userData = await fetchUserDetail(token);
          dispatch(setUser(userData.data));
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      };

      fetchUser();
    }
  }, [dispatch, user]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <PrivateRoute>
              <ReservationAdmin />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginAdmin />} />
      </Routes>
    </>
  );
}

export default App;
