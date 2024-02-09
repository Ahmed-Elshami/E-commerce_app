import React from 'react'
import style from './Home.module.css'

import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'


export default function Home() {
  return (
   <>

    


    <div className={style.mainslider}>
            <MainSlider/>

    </div>

    <CategorySlider/>

    <FeaturedProducts/>
 


    

       
   
   
   </>
  )
}
