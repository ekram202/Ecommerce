import React, { useContext, useState } from "react";
import { Cartconext } from "../../Context/Cartcontext";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { WishcartContext } from "../../Context/WishcartContext";

export default function WishCart() {
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(false);

  let { addproducttocart, setcartItems } = useContext(Cartconext);


  let { getLoggedUserCarts, deletecartitem } = useContext(WishcartContext);
  const [Cartdetailss, setCartdetailss] = useState(null);

  async function getcartitems() {
    let response = await getLoggedUserCarts();
    if (response.data.status == "success") {
      setCartdetailss(response.data.data);
    }
  }

  async function deletitem(ProductId) {
    let response = await deletecartitem(ProductId);
    console.log(response);
    if (response.data.status == "success") {
      setCartdetailss(response.data.data);
      toast.success("Product deleted successfully");
    }
  }

  async function addtocart(id) {
    setcurrentId(id);
    setloading(true);
    let response = await addproducttocart(id);

    if (response.data.status == "success") {
      setloading(false);
      toast.success(response.data.message, {
        position: "top-right",
        style: {
          border: "1px solid #007bff",
          backgroundColor: "#479647",
          color: "#fff",
        },
      });
    } else {
      toast.error(response.data.message);
      setloading(false);
    }
  }


  useEffect(() => {
    getcartitems();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4 w-[80%] m-auto bg-gray-100">
        <div className="row flex  justify-between items-center mx-4">
          <h1 className="text-3xl text-black capitalize font-bold my-4">
            My Wish List{" "}
          </h1>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-100">
          <>
            <tbody>
              {Cartdetailss?.map((product) => (
                <tr className=" flex justify-between border-b  hover:bg-gray-50 dark:hover:bg-gray-600 p-10">
                  <td className=" flex gap-8">
                    <img
                      src={product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                    />
                    <div className="flex flex-col gap-2 py-4 font-semibold text-gray-900 dark:text-white">
                      <h1 className="my-2"> {product.title}</h1>
                      <h2> {product.price}</h2>
                      <span
                        onClick={() => deletitem(product.id)}
                        className="font-medium text-red-600 dark:text-red-500 cursor-pointer "
                      >
                        Remove
                      </span>
                    </div>
                  </td>

                  <td className=" py-2">
                    <button
                      className="btn3 text-xl"
                      onClick={() => addtocart(product.id)}
                    >
                      {loading && currentId == product.id ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        </table>
      </div>
    </>
  );
}
