import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import codenito from "../../../assets/logo/icon-dark.png";

const SidebarAdmin = ({ isOpen, onClose }) => {
  // Mengambil lokasi saat ini dari router
  const location = useLocation();
  const [activePage, setActivePage] = useState("");

  // Efek yang akan dijalankan setiap kali lokasi berubah
  useEffect(() => {
    setActivePage(location.pathname); // Mengatur activePage dengan path saat ini
  }, [location.pathname]);

  // Mendefinisikan halaman-halaman yang ada di sidebar
  const pages = [
    { path: "/", icon: DashboardIcon, title: "Home" },
    {
      path: "/users",
      icon: UsersIcon,
      title: "Users",
    },
    { path: "/reservations", icon: ReservationsIcon, title: "Reservations" },
    {
      path: "/transactions",
      icon: TransactionIcon,
      title: "Transactions",
    },
    {
      path: "/products",
      icon: ProductsIcon,
      title: "Products",
    },
  ];

  function DashboardIcon({ activePage }) {
    return (
      <svg
        className={`w-5 h-5 transition duration-75  group-hover:text-teal-500  ${
          activePage === "/home" ? "text-teal-500" : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" />
      </svg>
    );
  }

  function UsersIcon({ activePage }) {
    return (
      <svg
        className={`w-5 h-5 transition duration-75  group-hover:text-teal-500  ${
          activePage === "/users" ? "text-teal-500" : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5 6 6.34 6 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C16 14.17 11.33 13 9 13zm6-2h6v-2h-6v2zm-2-4h8V5h-8v2zm-2 8h4v-2h-4v2z" />
      </svg>
    );
  }

  function ReservationsIcon({ activePage }) {
    return (
      <svg
        className={`w-5 h-5 transition duration-75  group-hover:text-teal-500  ${
          activePage === "/reservations" ? "text-teal-500" : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20 8h-2V5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2zM8 5h8v3H8V5zm8 14H8v-6h8v6zm4-4h-2v2h-2v-2H6v2H4v-2H2v4h20v-4z" />
      </svg>
    );
  }

  function TransactionIcon({ activePage }) {
    return (
      <svg
        className={`w-5 h-5 transition duration-75  group-hover:text-teal-500  ${
          activePage === "/transaction" ? "text-teal-500" : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M11 22v-2H5c-1.11 0-1.99-.89-1.99-2L3 5c0-1.11.89-2 2-2h10c1.11 0 2 .89 2 2v13c0 1.11-.89 2-2 2h-6v2h4c1.11 0 2-.89 2-2V5h2v15h-8zM5 5v13h6V5H5z" />
      </svg>
    );
  }

  function ProductsIcon({ activePage }) {
    return (
      <svg
        className={`w-5 h-5 transition duration-75  group-hover:text-teal-500  ${
          activePage === "/products" ? "text-teal-500" : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10-2c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zm0 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM6.16 13.41c-.13.37.08.77.45.91l1.28.35c.32.09.66-.08.77-.4l.75-2.23 8.32 2.33c.24.07.51.01.69-.18.18-.2.26-.48.2-.75l-1.15-4.7a1 1 0 0 0-.98-.75H7.36l-.79-3.56c-.1-.44-.49-.76-.94-.76H2v2h2.41l1.96 8.84-.82 2.45zm1.28-2.23L7.94 9h9.57l.86 3.52-9.93-2.34z" />
      </svg>
    );
  }

  // Fungsi untuk menangani klik pada halaman
  const handlePageClick = (pagePath) => {
    setActivePage(pagePath);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-600 bg-opacity-50 sm:hidden"
          onClick={onClose}
        ></div>
      )}
      <aside
        id="default-sidebar"
        className={`fixed sm:relative left-0 z-20 sm:z-0 h-screen transition-transform ${
          isOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full sm:translate-x-0 sm:w-16"
        } bg-white `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto border right-full shadow-lg">
          <ul className="space-y-2 font-medium">
            {pages.map((page, index) => (
              <li key={index}>
                <Link
                  to={page.path}
                  className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group ${
                    activePage === page.path ? "font-bold bg-gray-200" : ""
                  }`}
                  onClick={() => handlePageClick(page.path)}
                >
                  <page.icon />
                  {isOpen && <span className="ms-3">{page.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center pt-10 md:text-lg">
            {isOpen ? (
              <>
                <p>D'Restiorante</p>
                {/* <img src={codenito} className="h-8 me-3" alt="Company Logo" /> */}
              </>
            ) : (
              <img src={codenito} className="h-8" alt="Company Logo" />
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarAdmin;
