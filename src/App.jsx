import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/layouts/Navbar";
import Footer from "./components/common/layouts/Footer";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
