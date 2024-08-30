import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../Context/CounterContext";

export default function Register() {
  const { userlogin, setUserlogin } = useContext(userContext);
  const navigate = useNavigate();
  const [Apierror, setApierror] = useState();
  const [loading, setLoading] = useState(false);

  function handelRegister(values) {
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(function (res) {
        console.log(res);
        setLoading(false);
        if (res.data.message == "success") {
          localStorage.setItem("usertoken", res.data.token);
          setUserlogin(res.data.token);
          navigate("/");
        }
      })
      .catch(function (res) {
        setLoading(false);
        setApierror(res?.response.data.message);
      });
  }

  let schema = Yup.object().shape({
    name: Yup.string()
      .required("name is requried")
      .min(3, "min lenghth is 3")
      .max(10, "max lenghth is 3"),
    email: Yup.string().email("invalid email").required("email is requried"),
    phone: Yup.string()
      .matches(/^01[1205][0-9]{8}$/, "invalid phone ")
      .required("phone is required"),
    password: Yup.string()
      .matches(/^[A-Za-z0-9]{8}$/, "invalid password ")
      .required("password is requried"),
    rePassword: Yup.string()
      .required("confirm password is requried")
      .oneOf([Yup.ref("password")], "not the same"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: schema,
    onSubmit: handelRegister,
  });

  return (
    <>
      <div className=" text-2xl text-emerald-700 mb-3 font-bold text-center ">Register</div>
      {Apierror ? (
        <div className="w-1/2 mx-auto bg-red-600  text-white font-bold rounded my-4">
          {Apierror}
        </div>
      ) :null}
      <form className="max-w-lg mx-auto " onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group   py-2">
          <input
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            type="name"
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
            enter your name
          </label>
          {formik.errors.name && formik.touched.name ? (
            <div className="text-red-500 p-3">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group py-2 ">
          <input
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="tel"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="tel"
            className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 
             duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
              peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            enter your phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="text-red-500 p-3">{formik.errors.phone}</div>
          ) : null}
        </div>

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

        <div className="relative z-0 w-full mb-5 group  py-2">
          <input
            name="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            type="Password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 
             duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
              peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            confirmPassword
          </label>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="text-red-500 p-3">{formik.errors.rePassword}</div>
          ) : null}
        </div>

        <div className="btn">
          <button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {loading ? <i className="fas fa-spinner  fa-spin"></i> : "register"}
          </button>
          <span className="p-3">
            do you have account <Link to="/login">sign up</Link>
          </span>
        </div>
      </form>
    </>
  );
}
