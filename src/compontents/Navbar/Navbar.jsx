import React, { useContext, useState } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/CounterContext";
import { Cartconext } from "../../Context/Cartcontext";

export default function Navbar() {
  const { userlogin, setUserlogin } = useContext(userContext);
  const navigate = useNavigate();
  const { cartItems } = useContext(Cartconext);
  const [isOpen, setIsOpen] = useState(false);

  function signout() {
    localStorage.removeItem("usertoken");
    setUserlogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-white border-gray-200 bg-slate-300 fixed top-0 left-0 right-0 z-10 bg-gray-50">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} className="h-7" alt="Logo" />
            </a>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>

          <div className="hidden md:flex items-center justify-between flex-grow">
            {userlogin != null && (
              <ul className="flex gap-4 mx-3">
                <li>
                  <NavLink to="/" className="text-gray-600 hover:text-gray-900">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="categories" className="text-gray-600 hover:text-gray-900">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="brands" className="text-gray-600 hover:text-gray-900">
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink to="Broducts" className="text-gray-600 hover:text-gray-900">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="Cart" className="text-gray-600 hover:text-gray-900">
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink to="WishCart" className="text-gray-600 hover:text-gray-900">
                    WishCart
                  </NavLink>
                </li>
              </ul>
            )}
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <div className="icons flex gap-4">
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-youtube"></i>
                <i className="fab fa-linkedin"></i>
              </div>
              {userlogin != null && (
                <div className="relative">
                  <Link to="/cart" className="text-gray-600 text-2xl">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Link>
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {cartItems}
                  </span>
                </div>
              )}
              <div className="links flex gap-4">
                {userlogin != null ? (
                  <span onClick={signout} className="text-sm cursor-pointer">
                    Sign out
                  </span>
                ) : (
                  <>
                    <Link to="login" className="text-sm">
                      Login
                    </Link>
                    <Link to="register" className="text-sm">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          id="navbar-default"
          className={`fixed top-0 left-0 w-full h-screen bg-slate-300 p-4 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:hidden`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 text-2xl"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <ul className="space-y-4 text-lg">
            <li>
              <NavLink
                to="/"
                className="block py-2 px-4 text-gray-600 hover:bg-gray-200 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="categories"
                className="block py-2 px-4 text-gray-600 hover:bg-gray-200 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="brands"
                className="block py-2 px-4 text-gray-600 hover:bg-gray-200 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink
                to="Broducts"
                className="block py-2 px-4 text-gray-600 hover:bg-gray-200 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="Cart"
                className="block py-2 px-4 text-gray-600 hover:bg-gray-200 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                to="WishCart"
                className="block py-2 px-4 text-gray-600 hover:bg-gray-200 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                WishCart
              </NavLink>
            </li>
            {userlogin == null ? (
              <>
                <li>
                  <Link
                    to="login"
                    className="block py-2 px-4 text-gray-600 hover:bg-gray-200 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="register"
                    className="block py-2 px-4 text-gray-600 hover:bg-gray-200 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <span
                  onClick={() => {
                    signout();
                    setIsOpen(false);
                  }}
                  className="block py-2 px-4 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer"
                >
                  Sign out
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
