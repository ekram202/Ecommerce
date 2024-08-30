import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../Context/CounterContext";

export default function Login() {
  const { userlogin, setUserlogin } = useContext(userContext);
  const navigate = useNavigate();
  const [Apierror, setApierror] = useState();
  const [loading, setLoading] = useState(false);

  function handelLogin(values) {
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(function (res) {
        setLoading(false);
        if (res.data.message == "success") {
          localStorage.setItem("usertoken", res.data.token);
          setUserlogin(res.data.user);
          navigate("/");
        }
      })
      .catch(function (res) {
        setLoading(false);
        setApierror(res.response.data.message);
      });
  }

  let schema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is requried"),
    password: Yup.string()
      .matches(/^[A-Za-z0-9]{8}$/, "invalid password ")
      .required("password is requried"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: handelLogin,
  });

  return (
    <>
      <div className=" text-2xl text-emerald-600 mb-3 font-bold text-center">login</div>
      {Apierror ? (
        <div className="w-1/2 mx-auto bg-red-600  text-white font-bold rounded my-4">
          {Apierror}
        </div>
      ) : null}
      <form className="max-w-lg mx-auto " onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group  py-2">
          <input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 
             duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
              peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            enter your email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div className="text-red-500 p-3">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group  py-2">
          <input
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="Password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 
             duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
              peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div className="text-red-500 p-3">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="btn">
          <button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "login"}
          </button>
          <span className="p-3">
            dont have account <Link to="/register">register</Link>
          </span>
        </div>
      </form>
    </>
  );
}
