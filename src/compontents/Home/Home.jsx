import React from 'react'
import RecentProductsts from '../RecentProductsts/RecentProductsts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
  return (
    <div>
      <MainSlider />
      <CategoriesSlider  />
      <RecentProductsts />
    </div>
  )
}
