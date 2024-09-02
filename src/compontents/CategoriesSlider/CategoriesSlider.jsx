import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getcategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        console.log(res.data.data);
        setCategories(res.data.data);
      });
  }

  useEffect(() => {
    getcategories();
  }, []);

  return (
    <>
      <Slider {...settings} className="w-full">
        {categories.map((category) => (
          <div key={category._id} className="p-2">
            <img
              src={category.image}
              className="w-full h-[200px] md:h-[250px] object-cover"
              alt={category.name}
            />
            <h2 className="text-center text-lg md:text-xl font-semibold mt-2">
              {category.name}
            </h2>
          </div>
        ))}
      </Slider>
    </>
  );
}
