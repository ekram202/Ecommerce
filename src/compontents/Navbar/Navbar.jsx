import React, { useContext } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/CounterContext";
import { Cartconext } from "../../Context/Cartcontext";


export default function Navbar() {
  let { userlogin, setUserlogin} = useContext(userContext);
  let navigate =useNavigate()

  let {cartItems} = useContext(Cartconext)

  function signout() {
    localStorage.removeItem("usertoken");
    setUserlogin(null)
    navigate("/login")

  }
  return (
    <>
      <nav className="bg-white border-gray-200 bg-slate-300 fixed top-0 left-0 right-0  z-10 bg-gray-50">
        <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-4 mx-auto ">
          <div className="flex p-4 items-center ">
            <a
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-7"  alt="Flowbite Logo" />
            </a>
            {userlogin !=null ?
            <>
            <ul className="flex gap-4 mx-3">
              <li>
                <NavLink
                  to="/"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Home{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="categories"
                  className="text-gray-600 hover:text-gray-900"
                >
                  categories{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="brands"
                  className="text-gray-600 hover:text-gray-900"
                >
                  brands{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="Broducts"
                
                  className="text-gray-600 hover:text-gray-900"
                >
                  products{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="Cart"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Cart{" "}
                </NavLink>
                
              </li>
              <li>
                <NavLink
                  to="WishCart"
                  className="text-gray-600 hover:text-gray-900"
                >
                  WishCart{" "}
                </NavLink>
                
              </li>
            </ul>
            </>
             : null}
           
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="icons flex gap-4">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-linkedin"></i>
             
            </div>
            <div className="relative">
          <Link to="/cart" className="text-gray-600 text-2xl">
          <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
               {cartItems}
            </span>
          
        </div>
            <div className="links flex gap-4">
              {userlogin!=null ? 
              <span  onClick={signout} className="text-sm cursor-pointer">
                sign out
              </span> :<> <Link to="login"
               className="text-sm">
                login
              </Link>
              <Link to="register" className="text-sm">
                register
              </Link>
              </>
              }
             
             
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
