import React, { useContext } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from 'axios';
import { Triangle } from 'react-loader-spinner';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';



export default function ProductDetails() {


  let params= useParams();
  // slick slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false,
  };

  let {addToCart,setcartNum} =useContext(CartContext);

  async function addProduct(productId){
    let response= await addToCart(productId)
    // getFeaturedProducts();
    setcartNum(response?.data.numOfCartItems)
    // console.log(response);
    if(response.data.status === 'success'){
    toast.success('products successfully added')

    }else{
      toast.error(' error,,, products not successfully added')
    }
  }


  function getProductDetails(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let {data,isLoading,isError,isFetched}=useQuery('ProductDetails', ()=>getProductDetails(params.id))

  
  return (
    <>
    
    {isLoading?

        <div className="loading">

          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>

    
  
  :

        <div className="productDetailss">
           <div className={`row ${style.section}`}>
        <div className="col-md-4">
          <div className={style.product}>
          {data?.data.data ?<Slider {...settings}>
              {data?.data.data.images.map((img,index)=>  
              <img key={index} src={img} className={`w-100  ${style.detailsImg}`} />)}
            </Slider> :''}
          </div>
        </div>



        <div className='col-md-5  productDetailssCaption'>
            <h2 className={style.title}>{data?.data.data?.title}</h2>
            {/* <h6>{data?.data.data?.category.name}</h6> */}

            <h5 className={style.p}>{data?.data.data?.description}</h5>
            <div className=" w-50 d-flex justify-content-between">
            <h6><i className='fas fa-star rating-color'></i> {data?.data.data?.ratingsAverage} </h6>
              <h6 className={`text-main ${style.salary}`}>{data?.data.data?.price} EGY</h6>
            </div>

            {localStorage.getItem('userToken2') !== null?
           <>
            <button onClick={()=>addProduct(data?.data.data.id)} className={`${style.butonsubmit} btn bg-main text-white btn-sm w-50 mt-2`}>+ add to card</button>
              {/* <button   data-bs-toggle="modal" data-bs-target="#exampleModal"    className='btn bg-main text-white w-100 btn-sm mt-2'><i className="fas fa-shopping-cart"></i></button> */}

           </>
              
              :
             <Link to={`/login`}  >
              <button className='btn bg-main text-white w-50 btn-sm mt-2'>Add To Cart <i className="fas fa-shopping-cart"></i></button>
              </Link>
            }

          </div>






      </div>

        </div>
     
     
  
  
  
  
  }
    

  


    
    </>
  )
}
