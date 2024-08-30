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
        (product) => product.category.name == category
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

 
  
  useEffect(() => {
    getproducts(id);
    getallprodects();
  }, [id, category]);

  return (
    <>
      <div className="row items-center row container w-[80%]  mx-auto">
        <div className="w-1/4">
          <Slider {...settings}>
            {product?.images.map((src) => (
              <img src={src} className="w-full" alt="product image" />
            ))}
          </Slider>
        </div>
        <div className="w-3/4 p-3 ">
          <h1 className="text-2xl font-semibold capitalize">
            {product?.title}
          </h1>
          <h2 className="text-xl text-gray-700 my-4 ">
            {product?.description}
          </h2>
          <h2 className=" ">{product?.category.name}</h2>

          <div className="flex justify-between p-3 my-4">
            <span>{product?.price}EGP</span>
            <span>
              <i className="fas fa-star text-yellow-400"></i>
              {product?.ratingsQuantity}
            </span>
          </div>
          <button className="btn3" onClick={() => addtocart(product.id)}>
                  {loading && currentId == product.id ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
        </div>
      </div>

      <div className="row  container w-[80%]  mx-auto">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div key={product.id} className="w-1/6 p-2">
              <div className="product">
                <Link to={`detalis/${product.id}/${product.category.name}`}>
                  <img src={product.imageCover} className="w-full" />
                  <h3 className="text-emerald-600">{product.category.name}</h3>
                  <h3 className="font-semibold ">
                    {" "}
                    {product.title.split(" ").splice(0, 2).join("")}
                  </h3>
                  <div className="flex justify-between p-3">
                    <span>{product.price}EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>
                      {product.ratingsQuantity}
                    </span>
                  </div>
                </Link>
                <button className="btn">Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <span className="loader"></span>
        )}
      </div>
    </>
  );
}
