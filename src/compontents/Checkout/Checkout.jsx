import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/CounterContext";
import { Cartconext } from "../../Context/Cartcontext";

export default function Checkout() {

  let { ckeckout, cartId } = useContext(Cartconext);

  const { userlogin, setUserlogin } = useContext(userContext);
  const [Apierror, setApierror] = useState();
  const [loading, setLoading] = useState(false);

  let schema = Yup.object().shape({
    details: Yup.string().required("Details are required"),
    phone: Yup.string()
      .matches(/^01[1205][0-9]{8}$/, "Invalid phone number")
      .required("Phone is required"),
    city: Yup.string().required("City is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: schema,
    onSubmit: () => handelCheckout(cartId, `http://localhost:5175`),
  });

  async function handelCheckout(cardId, url) {
    let { data } = await ckeckout(cardId, url, formik.values);
    window.location.href = data.session.url;
  }

  return (
    <>
      <div className="text-2xl text-emerald-600 mb-3 font-bold text-center">
        Checkout
      </div>
      <form className="max-w-lg mx-auto w-[90%] md:w-[80%] lg:w-[70%]" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group py-2">
          <input
            name="details"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Details
          </label>
          {formik.errors.details && formik.touched.details ? (
            <div className="text-red-500 p-3">{formik.errors.details}</div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group py-2">
          <input
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="tel"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="text-red-500 p-3">{formik.errors.phone}</div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group py-2">
          <input
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            City
          </label>
          {formik.errors.city && formik.touched.city ? (
            <div className="text-red-500 p-3">{formik.errors.city}</div>
          ) : null}
        </div>

        <div className="w-full mt-4">
          <button
            type="submit"
            className="text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Pay Now
          </button>
        </div>
      </form>
    </>
  );
}
