import React from 'react'
import style from './CategorySlider.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from "react-slick";


export default function CategorySlider() {
     // slick slider
  var settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false,
    className:`${style.cateorySlider}`,
    
    
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]

  };

    function getCategorySlider(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    
    let {isLoading,isError, isFetched, data}=useQuery("CategorySlider", getCategorySlider)
      



  return (
    <>

        <div className="py-5">

        {data?.data.data? <Slider {...settings}>
        {data?.data.data.map((category)=>
        <img key={category._id} height={250} className={` ${style.editImg}`} src={category.image} />
        ) }
        </Slider> :''}
        </div>
    
    </>
  )
}
