import React, { useContext } from 'react'
import style from './FeaturedProducts.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import Modal from '../Modal/Modal'







export default function FeaturedProducts() {
  

    // slick slider
    var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:false,
    arrows:false,
  };


  let {addToCart,setcartNum} =useContext(CartContext);

  async function addProduct(productId){
    let response= await addToCart(productId)
    // getFeaturedProducts();
    setcartNum(response?.data.numOfCartItems)
    // console.log(response);
    if(response.data.status === 'success'){
    toast.success('products successfully added');

      
  
  
    

    }else{
      toast.error(' error,,, products not successfully added')
    }
  }


    function getFeaturedProducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }

    let {isLoading,isError,isFetched,data}=useQuery('FeaturedProducts',getFeaturedProducts)
  
    console.log(data?.data.data);
  
  
    return (
    <>
         <>
    {isLoading?

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
     
   <div className=" py-2">
    <div className="row">
    {data?.data.data.map((product)=>
    
    
       
        <div key={product.id} className="col-md-3  mediaProduct">
         
            <div className="product cursor-pointer  px-2">
            <Link to={`/productDetails/${product.id}`} >
                {/*  */}
                <Slider  {...settings}>
                     <img  src={product.images[0]} className='w-100'/>
                     <img  src={product.images[1]} className='w-100'/>
                     <img  src={product.images[2]} className='w-100'/>

                </Slider> 
                {/*  */}
              {/* <img className='w-100' src={product.imageCover} alt={product.title}/> */}
              <div className={`${style.productCaption}`}>
                <h3 className={style.titile}>{product.title.split(" ").slice(0,2).join(' ')}</h3>
                <h6 className={style.name} >{product.category.name}</h6>
                <div className="d-flex justify-content-between mt-1">
                  <span><i className='fas fa-star rating-color'></i> {product.ratingsAverage} </span>
                  <span className='text-main font-sm fw-bolder'>{product.price} EGP</span>
                </div>

              </div>
              
            </Link>

           

            {localStorage.getItem('userToken2') !== null?
            
           <>
            <div className="allBtnCart">

              
              <button id='modell' onClick={()=>addProduct(product.id) }  className='btn bg-main text-white btn-sm'> Add To Cart</button>
                  {/* <button   data-bs-toggle="modal" data-bs-target="#exampleModal"    className='btn bg-main text-white w-100 btn-sm mt-2'><i className="fas fa-shopping-cart"></i></button> */}
            </div>
          
           </>
              
              :

              <div className="allBtnCart">
                <Link to={`/login`}  >
                  <button className='btn bg-main text-white btn-sm'> Add To Cart</button>

                </Link>
              </div>
            
            }
          </div>
         

        </div>
        
       )}
    </div>
   </div>
    }
    
   </>

   <Modal/>
   
   
    </>
  )
}
