import React, { useContext, useState } from "react";
import { Cartconext } from "../../Context/Cartcontext";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getLoggedUserCart, ubdateCartProductQuantity ,deletecartitem ,deletcart,setcartItems ,cartItems } = useContext(Cartconext);
  const [Cartdetails, setCartdetails] = useState(null);

  async function getcartitem() {
    let response = await getLoggedUserCart();

    if (response.data.status == "success") {
      setCartdetails(response.data.data);
      console.log(response.data.data);
    }
  }

  async function ubdateProduct(id, count) {
    let response = await ubdateCartProductQuantity(id, count);
    if (response.data.status == "success") {
      setCartdetails(response.data.data);
      if (response.data.status == "success") {
        toast.success("Product ubdated successfully", {
          position: "top-right",
          style: {
            border: "1px solid #007bff",
            backgroundColor: "#479647",
            color: "#fff",
          },
        });
      } else {
        toast.error("Product error ");
      }
    }
  }

  async function deletitem(ProductId) {
   let response = await deletecartitem(ProductId)
   console.log(response);
   if (response.data.status == "success") {
    setCartdetails(response.data.data);
    toast.success("Product deleted successfully")

   }
  }


  async function deletalaacart(ProductId) {
    let response = await deletcart(ProductId)
     setCartdetails([]);
     setcartItems(0)
   }

   
  useEffect(() => {
    getcartitem();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4 w-[90%] m-auto">
        <div className="row flex  justify-between items-center mx-4">
          <h1 className="text-3xl text-black capitalize font-bold my-4">
            Cart Shop{" "}
          </h1>
          
          <Link to="/Checkout">
          <button
            className="p-4 my-4 text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center "
          >check out</button>
          </Link>
         
        </div>
        <div className="row flex justify-between items-center mx-4">
          <h2 className="text-2xl text-emerald-600 capitalize font-bold my-4 ">
            {" "}
            <span className="text-black">Total Price : </span>
            {Cartdetails?.totalCartPrice}
          </h2>
          <h2 className="text-2xl text-emerald-600 capitalize font-bold my-4 ">
            {" "}
            <span className="text-black">total number of items : </span>
            {cartItems}
          </h2>
        
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {Cartdetails?.products?.length > 0 ?  <>
         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Cartdetails?.products?.map((product ) => (
              <tr
                key={product.product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        ubdateProduct(product.product.id, product.count - 1)
                      }
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span>{product.count}</span>
                    </div>
                    <button
                      onClick={() =>
                        ubdateProduct(product.product.id, product.count + 1)
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price}
                </td>
                <td className="px-6 py-4">
                  <span onClick={()=> deletitem(product.product.id)}
                   
                    className="font-medium text-red-600 dark:text-red-500 cursor-pointer "
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
         </> : <h2 className="text-3xl text-black capitalize font-bold my-4 text-center p-3">your cart is empty</h2>}

       
        </table>

        <div className="row flex justify-center "> 
           <button   onClick={()=>deletalaacart ()  }
            className="p-4 my-4 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center "
          >clear your cart</button>
       </div>
      </div>
    </>
  );
}
