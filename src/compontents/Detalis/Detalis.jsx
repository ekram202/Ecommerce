import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { Cartconext } from "../../Context/Cartcontext";
import toast from "react-hot-toast";

export default function Detalis() {
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(false);
  const [product, setproduct] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState([]);
  let { id, category } = useParams();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  function getproducts(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getallprodects() {
    axios.get("https://ecommerce.routemisr.com/api/v1/products").then((res) => {
      let reated = res.data.data.filter(
        (product) => product.category.name === category
      );
      setrelatedProducts(reated);
      console.log(reated);
    });
  }

  let { addproducttocart, setcartItems } = useContext(Cartconext);

  async function addtocart(id) {
    setcurrentId(id);
    setloading(true);
    let response = await addproducttocart(id);

    if (response.data.status === "success") {
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

  useEffect(() => {
    getproducts(id);
    getallprodects();
  }, [id, category]);

  return (
    <>
      <div className="container w-[80%] mx-auto my-5 px-4 py-6">
        <div className="flex flex-col md:flex-row md:space-x-4 items-center">
          <div className="w-full md:w-1/2">
            <Slider {...settings}>
              {product?.images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  className="w-full h-[400px] object-contain"
                  alt="product image"
                />
              ))}
            </Slider>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-2xl font-semibold capitalize">
              {product?.title}
            </h1>
            <h2 className="text-xl text-gray-700 my-4">
              {product?.description}
            </h2>
            <h2 className="text-lg">{product?.category.name}</h2>

            <div className="flex justify-between p-3 my-4">
              <span>{product?.price} EGP</span>
              <span>
                <i className="fas fa-star text-yellow-400"></i>
                {product?.ratingsQuantity}
              </span>
            </div>
            <button
              className="btn3 w-full md:w-auto"
              onClick={() => addtocart(product.id)}
              disabled={loading && currentId === product.id}
            >
              {loading && currentId === product.id ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>

       
        
      </div>
    </>
  );
}
