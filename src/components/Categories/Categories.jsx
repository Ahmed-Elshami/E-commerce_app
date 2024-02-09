import React, { useEffect } from 'react'
import style from './Categories.module.css'
import { BallTriangle } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriy } from '../../Redux/CategorySlice'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';


export default function Categories() {
  
  let {categoriy,loading,isError}=  useSelector((state)=> state.category)

  let dispatch=useDispatch();
  
  useEffect(()=>{
    dispatch(getCategoriy())
  },[])
  
  console.log(categoriy);
  
    return (
      <>
  
      {loading?
        <div className="loading">
        <BallTriangle
          height={80}
          width={80}
          radius={8}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
      
    
    :
        <div className={`row my-5 ${style.rowcategory}`}>
          {categoriy.map((categorie,index)=>
           <div key={index} className="col-md-2">
           <div className={style.categorie}>
             <img className={`w-100 ${style.imgg}`} height={250} src={categorie.image} alt='categoriesimg'/>
             <h5 className={` text-center ${style.captionh5}`}>{categorie.name}</h5>
           </div>
         </div>
          
          )}
         
        </div>
  
    }
  
  
  
      </>
    )
  }
  
  