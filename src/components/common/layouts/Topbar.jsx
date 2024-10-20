import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartPopup from "../../../pages/dashboard/sections/CartPopup";
import CheckoutModal from "../../../pages/dashboard/sections/CheckoutModal";
import logo from "../../../assets/logo/icon-dark.png";
import ava from "../../../assets/profile/ava.png";

const Topbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk status dropdown pengguna
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk status modal checkout
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State untuk status pop-up keranjang
  const navigate = useNavigate(); // Inisialisasi hook navigate
  const userData = useSelector((state) => state.user.User) || {}; // Mengambil data pengguna dari Redux
  const tables = useSelector((state) => state.tables?.list) || []; // Mengambil daftar tabel dari Redux

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    toast.success("Logout success");
    navigate("/login");
  };

  const isDimmed = isModalOpen || isPopupOpen;

  useEffect(() => {
    if (isDimmed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isDimmed]);

  return (
    <>
      {isDimmed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          style={{ pointerEvents: "none" }}
        />
      )}
      <nav className="relative top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Toggle sidebar</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              <a className="flex ms-2 md:me-24">
                <img src={logo} className="h-16 me-3" alt="Company Logo" />
                <span className="self-center text-xl font-medium sm:text-2xl whitespace-nowrap">
                  D'Restiorante
                </span>
              </a>
            </div>

            {/* Right side */}
            <div className="flex items-center relative">
              <CartPopup setIsPopupOpen={setIsPopupOpen} />
              <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                rows={tables}
              />
              <div className="flex items-center ms-3">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                  aria-expanded={isDropdownOpen}
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={ava}
                    alt="user photo"
                  />
                </button>
                {isDropdownOpen && (
                  <div
                    className="z-50 absolute right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
                    id="dropdown-user"
                    style={{ top: "100%" }}
                  >
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-gray-900" role="none">
                        {userData.name}
                      </p>
                      <p
                        className="text-sm font-medium text-gray-900 truncate"
                        role="none"
                      >
                        {userData.email}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                          role="menuitem"
                          onClick={handleSignOut}
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Topbar;
