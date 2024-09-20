import React, { useCallback, useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate =useNavigate()
  const handlelogout = ()=>{
    localStorage.clear()
    navigate("/login")
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4 px-10">
        {/* Brand Name */}
        <Link to="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            anywhere.com
          </span>
        </Link>
        {/* Sign in & Get Started */}
        <div className="flex md:order-2 space-x-3 md:space-x-0">
          <div className="hidden md:flex gap-5">
            {!user && (
              <>
                <Link to="/login">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign In
                  </button>
                </Link>
                <Link to="/register"
                 type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Get Started
                </Link>
              </>
            )}
            {user &&(
                 <button onClick={handlelogout}
                 type="button"
                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
               >
                logout
               </button>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
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
              ></path>
            </svg>
          </button>
        </div>

        {/* Links */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/mybooking"
                className="block py-2 px-3 md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                My Booking
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block py-2 px-3 md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
