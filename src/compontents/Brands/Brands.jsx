import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function Brands() {
  const [bransItem, setBransItem] = useState([]);
  async function getBrands() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    setBransItem(data?.data);
    console.log(bransItem);
  }

  useEffect(() => {
    getBrands();
  }, []);
    if (bransItem.length === 0) {
      return<span className="loader"></span>;
    }
  return (<>
   <div className="application">
            <>
                <meta charSet="utf-8" />
                <title>brands</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </>
        </div>
  <div className="grid mt-24 gap-4 sm:grid-cols-2 p-5 md:grid-cols-3 xl:grid-cols-4">
      {bransItem.map((p) => (
        <div key={p} className="border border-gray-400 rounded-lg text-center  hover:shadow-xl hover:shadow-blue-500/50 p-3 transition duration-500 ease-in-out">
          <div className="">
            <img className="w-full" src={p.image} alt="" />

            <h5 className="font-normal text-black mt-3">{p.name}</h5>
          </div>
        </div>
      ))}
    </div>
  
  </>

   
  );
}

export default Brands;