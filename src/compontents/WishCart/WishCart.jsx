import React, { useContext, useState, useEffect } from "react";
import { Cartconext } from "../../Context/Cartcontext";
import toast from "react-hot-toast";
import { WishcartContext } from "../../Context/WishcartContext";

export default function WishCart() {
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(false);

  let { addproducttocart } = useContext(Cartconext);
  let { getLoggedUserCarts, deletecartitem } = useContext(WishcartContext);
  const [Cartdetailss, setCartdetailss] = useState(null);

  async function getcartitems() {
    let response = await getLoggedUserCarts();
    if (response.data.status === "success") {
      setCartdetailss(response.data.data);
    }
  }

  async function deletitem(ProductId) {
    let response = await deletecartitem(ProductId);
    if (response.data.status === "success") {
      setCartdetailss(response.data.data);
      toast.success("Product deleted successfully");
    }
  }

  async function addtocart(id) {
    setcurrentId(id);
    setloading(true);
    let response = await addproducttocart(id);
    if (response.data.status === "success") {
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4 mx-auto w-full max-w-6xl bg-gray-100">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl md:text-3xl text-black capitalize font-bold">
            My Wish List
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 bg-gray-100">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Cartdetailss?.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 flex items-center gap-4">
                    <img
                      src={product.imageCover}
                      className="w-16 md:w-32 h-auto"
                      alt={product.title}
                    />
                    <div className="flex flex-col gap-2 font-semibold text-gray-900">
                      <h1 className="text-sm md:text-base">{product.title}</h1>
                      <h2 className="text-sm md:text-base">{product.price}</h2>
                      <span
                        onClick={() => deletitem(product.id)}
                        className="text-red-600 cursor-pointer text-sm md:text-base"
                      >
                        Remove
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      className="btn3 text-sm md:text-xl"
                      onClick={() => addtocart(product.id)}
                    >
                      {loading && currentId === product.id ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
