import React from 'react'
import { Navigate } from 'react-router-dom';

export default function Protected(props) {
if (localStorage.getItem("usertoken")){
  return props.children;
}
else{
  return <Navigate to={"/login"}/>
}
}
