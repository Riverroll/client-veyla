import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaMapMarkerAlt,
  FaUser,
  FaUserPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold font-playfair">
              PERFECT <br />
              PALETTE
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItems />
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-navy hover:text-white hover:bg-navy focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItems mobile />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItems = ({ mobile }) => {
  const navigate = useNavigate();
  const baseClasses = mobile
    ? "text-navy hover:bg-navy hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    : "text-teal hover:text-navy transition duration-300 flex items-center";

  return (
    <>
      <a href="#" className={baseClasses}>
        <FaShoppingBag className={mobile ? "mr-3 inline" : "mr-2"} />
        <span>Cart</span>
      </a>
      <a href="#" className={baseClasses}>
        <FaMapMarkerAlt className={mobile ? "mr-3 inline" : "mr-2"} />
        <span>Track Order</span>
      </a>
      <button
        onClick={() => navigate("/signin")}
        className={`${baseClasses} ${
          mobile
            ? "w-full text-left"
            : "bg-skyblue text-navy px-4 py-2 rounded-md hover:bg-teal hover:text-white"
        }`}
      >
        <FaUser className={mobile ? "mr-3 inline" : "mr-2"} />
        <span>Sign in</span>
      </button>
      <button
        onClick={() => navigate("/register")}
        className={`${baseClasses} ${
          mobile
            ? "w-full text-left"
            : "bg-navy text-white px-4 py-2 rounded-md hover:bg-teal"
        }`}
      >
        <FaUserPlus className={mobile ? "mr-3 inline" : "mr-2"} />
        <span>Register</span>
      </button>
    </>
  );
};

export default Navbar;
