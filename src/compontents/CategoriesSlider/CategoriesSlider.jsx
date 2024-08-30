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
      <Slider {...settings} className="w-100%" >
        {categories.map((category) => (
          <div>
            <img
              src={category.image}
              className="w-full h-[250px] object-cover"
            />
            <h2>{category.name}</h2>
          </div>
        ))}
      </Slider>
    </>
  );
}
