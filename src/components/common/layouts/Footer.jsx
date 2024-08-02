import React from "react";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

const TwitterX = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold font-playfair mb-2">
              PERFECT
              <br />
              PALETTE
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Address:</strong>
              <br />
              Jakarta, Indonesia.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Contact:</strong>
              <br />
              PerfectPalette.com
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <TwitterX />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <FaYoutube size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Perfect Palette. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
