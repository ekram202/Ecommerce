import { useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./compontents/Home/Home";
import Layout from "./compontents/Layout/Layout";
import Cart from "./compontents/Cart/Cart";
import Brands from "./compontents/Brands/Brands";
import Notfound from "./compontents/Notfound/Notfound";
import Register from "./compontents/Register/Register";
import Login from "./compontents/Login/Login";
import UserContextprovider from "./Context/CounterContext";
import Protected from "./compontents/Protected-route/Protected";
import Detalis from "./compontents/Detalis/Detalis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartConextProvider from "./Context/Cartcontext";
import  { Toaster } from 'react-hot-toast';
import Categories from "./compontents/Gategory/Categories";
import Checkout from "./compontents/Checkout/Checkout";
import WishCart from "./compontents/WishCart/WishCart";
import WishcartContextProvider from "./Context/WishcartContext";
import Broducts from "./compontents/Broducts/Broducts";


let a = new QueryClient();

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Protected><Home /></Protected> },
      { path: "Brands", element: <Protected><Brands/></Protected> },
      { path: "cart", element: <Protected><Cart /></Protected> },
      { path: "WishCart", element: <Protected><WishCart/></Protected> },
      { path: "detalis/:id/:category", element: <Protected><Detalis /></Protected> },
      { path: "Broducts", element: <Protected><Broducts /></Protected> },
      { path: "Categories", element: <Categories/> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "Checkout", element: <Checkout /> },

      
      { path: "*", element: <Protected><Notfound /></Protected> },
      
    ],
  },
]);

function App() {
  return (
    <UserContextprovider>
      <QueryClientProvider client={a}>
        <CartConextProvider>
          <WishcartContextProvider>
          <RouterProvider router={x} />
          </WishcartContextProvider>
          <Toaster />
        </CartConextProvider>
      </QueryClientProvider>
    </UserContextprovider>
  );
}

export default App;
