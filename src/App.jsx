import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import DashboardAdmin from "./pages/dashboard/DashboardAdmin";
import LoginAdmin from "./pages/auth/LoginAdmin";
function App() {
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
        <Route path="/login" element={<LoginAdmin />} />
      </Routes>
    </>
  );
}

export default App;
