import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../Context/CounterContext";

export default function Login() {
  const { setUserlogin } = useContext(userContext);
  const navigate = useNavigate();
  const [Apierror, setApierror] = useState();
  const [loading, setLoading] = useState(false);

  function handleLogin(values) {
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(function (res) {
        setLoading(false);
        if (res.data.message === "success") {
          localStorage.setItem("usertoken", res.data.token);
          setUserlogin(res.data.user);
          navigate("/");
        }
      })
      .catch(function (error) {
        setLoading(false);
        setApierror(error.response?.data?.message || "An error occurred");
      });
  }

  let schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Za-z0-9]{8}$/, "Password must be 8 characters")
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: handleLogin,
  });

  return (
    <div className="flex flex-col items-center px-4 py-8 mx-auto max-w-md">
      <h1 className="text-2xl text-emerald-600 mb-3 font-bold">Login</h1>
      {Apierror && (
        <div className="w-full bg-red-600 text-white font-bold rounded px-4 py-2 mb-4">
          {Apierror}
        </div>
      )}
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group py-2">
          <input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-emerald-600"
          >
            Enter your email
          </label>
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group py-2">
          <input
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-emerald-600"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {loading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
        <div className="mt-4 text-sm">
          Don't have an account? <Link to="/register" className="text-emerald-600 hover:underline">Register</Link>
        </div>
      </form>
    </div>
  );
}
