import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
<>
<Navbar />
<div className=" w-[95%] mx-auto py-14 my-8">
<Outlet />
</div>
<Footer />

</>  )
}
