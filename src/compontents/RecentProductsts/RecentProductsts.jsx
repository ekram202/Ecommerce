import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useproducts from "../../Hooks/useproducts";
import { Cartconext } from "../../Context/Cartcontext";
import toast from "react-hot-toast";
import { WishcartContext } from "../../Context/WishcartContext";

export default function RecentProductsts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState({});

  let { data, isError, error, isLoading } = useproducts();
  let { addproducttocart, setcartItems } = useContext(Cartconext);
  let { addproducttocarts } = useContext(WishcartContext);

  async function addtocart(id) {
    setcurrentId(id);
    setloading(true);
    let response = await addproducttocart(id);

    if (response.data.status == "success") {
      setloading(false);
      setcartItems(response.data.numOfCartItems);
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

  async function addtoWishcart(id) {
    setcurrentId(id);
    let response = await addproducttocarts(id);

    if (response.data.status == "success") {
      setFavoriteProducts({
        ...favoriteProducts,
        [id]: !favoriteProducts[id],
      });

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

  if (isError) {
    return <h3>{error}</h3>;
  }
  if (isLoading) {
    return <span className="loader"></span>;
  }

  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="row container w-[90%] position-relative  mx-auto my-4">
        <input
          type="text"
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-[80%]  mx-auto border border-gray-300 rounded-lg my-4"
        />
        {filteredProducts.map((product) => (
          <div key={product.id} className="w-1/4 p-3">
            <div className="product">
              <Link to={`/detalis/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} className="w-full" />
                <div className="row ">
                  <div>
                    <h3 className="text-emerald-600">
                      {product.category.name}
                    </h3>
                    <h3 className="font-semibold ">
                      {" "}
                      {product.title.split(" ").splice(0, 2).join("")}
                    </h3>
                  </div>
                </div>

                <div className="flex justify-between px-4">
                  <span>{product.price}EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-400"></i>
                    {product.ratingsQuantity}
                  </span>
                </div>
              </Link>

              <span
                className="flex"
                onClick={() => addtoWishcart(product.id)}
              >
                <i
                  className={`fa-heart cursor-pointer fa-2x position-absolute end-0 right-0 top-0 p-2 ml-auto ${
                    favoriteProducts[product.id] ? "fas text-red-600" : "far text-emerald-500"
                  }`}
                ></i>
              </span>

              <div>
                <button className="btn" onClick={() => addtocart(product.id)}>
                  {loading && currentId == product.id ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
