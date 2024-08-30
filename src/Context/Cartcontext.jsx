import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export let Cartconext = createContext();

export default function CartConextProvider(props) {
  let headers = { token: localStorage.getItem("usertoken") };
  const [cartId, setcartId] = useState(0);

  function addproducttocart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((error) => error);
  }

  async function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setcartId(res.data.data._id);
        return res;
      })
      .catch((error) => error);
  }

  async function ubdateCartProductQuantity(ProductId, newcount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`,
        { count: newcount },
        { headers }
      )
      .then((res) => res)
      .catch((error) => error);
  }
  async function deletecartitem(ProductId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`, {
        headers,
      })
      .then((res) => res)
      .catch((error) => error);
  }

  async function deletcart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((error) => error);
  }

  const [cartItems, setcartItems] = useState(0);

  async function getcart() {
    let response = await getLoggedUserCart();
    if (response.data.status == "success") {
      setcartItems(response.data.numOfCartItems);
    }
  }

  async function ckeckout(cardId, url, formData) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}? url=${url}`,
      { shippingAddress: formData },
      { headers, }
    );
  }

  useEffect(() => {
    getcart();
    getLoggedUserCart()
  }, []);

  return (
    <Cartconext.Provider
      value={{
        addproducttocart,
        getLoggedUserCart,
        ubdateCartProductQuantity,
        deletecartitem,
        deletcart,
        getcart,
        cartItems,
        setcartItems,
        ckeckout,
        cartId,
      }}
    >
      {props.children}
    </Cartconext.Provider>
  );
}
