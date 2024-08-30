import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export let WishcartContext = createContext();

export default function WishcartContextProvider(props) {
  let headers = { token: localStorage.getItem("usertoken") };

  const [cartId, setcartId] = useState(0);

  function addproducttocarts(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((error) => error);
  }

  async function getLoggedUserCarts() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => {
        console.log(res.data);  
        setcartId(res.data.data._id);
        return res;
      })
      .catch((error) => error);
  }


  async function deletecartitem(ProductId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${ProductId}`, {
        headers,
      })
      .then((res) => res)
      .catch((error) => error);
  }


 

  useEffect(() => {
    getLoggedUserCarts()
  }, []);

  return (
    <WishcartContext.Provider
      value={{
        addproducttocarts,
        getLoggedUserCarts,
        deletecartitem,
        cartId,
      }}
    >
      {props.children}
    </WishcartContext.Provider>
  );
}
