import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
// import { Helmet } from "react-helmet";

function Categories() {
  const [categoriesItem, setCategoriesItem] = useState([]);

  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategoriesItem(data?.data);
    console.log(categoriesItem);
  }
  useEffect(() => {
    getCategories();
  }, []);
  if (categoriesItem.length === 0) {
    return  <span className="loader"></span>;
  }
  return (
    <>
     <div className="application">
            <>
                <meta charSet="utf-8" />
                <title>categories</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </>
        </div>
        <div className="grid mt-24 gap-4 sm:grid-cols-2 p-5 md:grid-cols-3 xl:grid-cols-3">
      {categoriesItem.map((p) => (
        <div
          key={p}
          className="border border-gray-300 rounded-lg text-center  hover:shadow-xl hover:shadow-blue-500/50 transition duration-500 ease-in-out"
        >
          <div className="">
            <img className="w-full h-[300px] object-cover" src={p.image} alt="" />

            <h3 className=" text-green-600 py-4 font-bold">{p.name}</h3>
          </div>
        </div>
      ))}
    </div>

    </>
   
  );
}

export default Categories;