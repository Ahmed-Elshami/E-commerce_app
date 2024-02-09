import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import { LineWave } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import style from './Cart.module.css'
import toast from 'react-hot-toast';



export default function Cart() {
  let{getLoggedUserCart,removeCartItem,updateProductQuantity,clearUserCart,setcartNum} =useContext(CartContext);
  let [cartDetails, setCartDetails] = useState(null);
  

  async function getCart(){
    let {data}= await getLoggedUserCart();
    setCartDetails(data);
    setcartNum(data?.numOfCartItems);

  }

  async function RemoveItem(id){
    let {data}= await removeCartItem(id);
    setCartDetails(data);
    setcartNum(data?.numOfCartItems);

    if(data.status === 'success'){
      toast.success("Removed Item Successfully",
      {
        duration:1500,
       position: 'top-center'
      }
      )
      }else{
      toast.error('Error! Removed Item Successfully',
      {
        duration:1500,
       position: 'top-center'
      }
      )
    }
  }
  async function updateCount(id,count){
    let {data}= await  updateProductQuantity(id,count)
    setCartDetails(data);
    if(data.status === 'success'){
      toast.success("Successfully Done",
      {
        duration:2000,
       position: 'top-center'
      }
      )
      
    }else{
      toast.error('Error !! Not successfully',
      {
        duration:2000,
       position: 'top-center'
      }
      )
    }}

    async function deleteCart(){
      let {data}= await clearUserCart()
      setCartDetails(null);
      setcartNum(data?.numOfCartItems);


      if(data.message == 'success'){
        toast.success("Delete Cart Successful",
        {
          duration:1800,
         position: 'top-center'
        })
        }
        else{
        toast.error('Error! Not Delete Cart Successful',
        {
          duration:1500,
         position: 'top-center'
        })
      }
    }
    
  


  useEffect(()=>{
    getCart();
  },[]);
  return (

    <>
      <div className="row my-3 ">
        {cartDetails?
          <>
            <div className={`col-md-7 p-3   ${style.cart}`}>

              <h3 className={style.carth3}>Shop Cart  </h3>

              {cartDetails.data.products.map((product, index) =>
                <div key={index} className={`row ${style.colrrow} border-bottom d-flex align-items-center  py-2 px-2`}>

                  <div className="col-md-1">
                    <div className={style.upremove}>
                      {/* <button className='btn p-0 font-sm brdr-main p-1 brdr-hover'><i className='text-danger font-sm fas fa-trash-can'></i> Remove</button> */}
                      <i onClick={()=> RemoveItem(product.product.id)} className={`fa-solid fa-xmark ${style.remove}`}></i>
                    </div>
                  </div>
                  <div className={`col-md-2 ${style.imgMedia}`}>
                    <img className='w-100 ' src={product.product.imageCover} alt={product.product.title} />
                  </div>

                  <div className= {`col-md-9 mt-1 ${style.controlMeia}`}>
                    <div className="d-flex justify-content-between align-aitems-center">
                      <div>
                        <h3 className='h6'>{product.product.title.split(" ").slice(0,3).join(' ')}</h3>
                        <h6 className='text-main'>Price : {product.price} EGP</h6>
                      </div>
                      <div className='mt-3 hoverrl' >
                      <button onClick={()=> updateCount(product.product.id,product.count - 1)}  className={`btn ${style.brdrmainrl} `}>-</button>
                        <span className={` btn ${style.brdcount} `}>{product.count}</span>
                        <button onClick={()=> updateCount(product.product.id,product.count + 1)} className={`btn ${style.brdrmainrl} `}>+</button>

                      </div>

                    </div>
                   

                  </div>

                </div>)}

                <div className="d-flex align-items-center mt-4">
                <input className={`form-control w-50 ${style.inputcoupon} `} placeholder='Coupon code' id='code' type='text' name='code'  />
                <button className={`btn bg-main ms-3 ${style.butoncoupon}`} >Apply Coupon</button>

                </div>
            </div>

            <div className={`col-md-4`}>
              <div className={`caption p-3 ${style.cart}`}>
                <h3 className={`${style.carth3}`}>Cart Totals</h3>

                <div className={`border-bottom ${style.containerwidth}`}>
                  <h5 className='fw-bold d-flex   align-items-center justify-content-between'>Total Items<span className={style.colorPrice}>{cartDetails.numOfCartItems}</span>  </h5>
                </div>
                <div className={`border-bottom ${style.containerwidth}`}>
                  <h5 className='fw-bold mt-4 d-flex align-items-center justify-content-between '>Total Price<span className='text-main'>{cartDetails.data.totalCartPrice}  EGP </span> </h5>

                </div>
              
                
                <div className="text-center"  >
                  <Link to={"/address"} className='btn bg-main text-white w-100 rounded   mt-2'>Proceed To Checkout</Link>
                </div>
                {/* <div className="text-center">
                  <Link to={"/addresscash"} className='btn bg-main text-white w-100 rounded  btn-sm mt-2'>Cash On Delivery</Link>
                </div> */}
                {/* clear cart */}
                <div className="text-center">
                  <button onClick={()=>deleteCart()} className='btn bg-danger text-white w-100 rounded   mt-2'>Clear Cart</button>
                </div>



              </div>
            </div>
          </>
          :
            <section  className='loading'>
            <div>
            <LineWave
            height="250"
            width="250"
            color="#4fa94d"
            ariaLabel="line-wave"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
            />
            </div>
          </section>
          
          }
        </div>
 
  
    </>



   
  )
}
