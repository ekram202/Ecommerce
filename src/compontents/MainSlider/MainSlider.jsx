import React from 'react'
import slide1 from "../../assets/41nN4nvKaAL._AC_SY200_.jpg"
import slide2 from "../../assets/61cSNgtEISL._AC_SY200_.jpg"
import slide3 from "../../assets/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg"
import slide4 from "../../assets/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg"
import Slider from "react-slick";



export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 2000

  };
  return (
    <>
    <div className="row flex justify-center">
      <div className="w-1/4">
    <Slider {...settings}> 
      <img src={slide1} className='w-full h-[400px] object-contain '/>
      <img src={slide2} className='w-full h-[400px] object-contain '/>
    </Slider>
      </div>
      <div className='w-1/4'>
      <img src={slide3} className='w-full h-[200px]'/>
      <img src={slide4} className='w-full h-[200px]'/>
      </div>
    </div>

    </>
  )
}
