import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import { LineWave } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import style from './Modal.module.css'


export default function Modal() {
    let{getLoggedUserCart,removeCartItem,updateProductQuantity} =useContext(CartContext);
  let [cartDetails, setCartDetails] = useState(null);
  

  async function getCart(){
    let {data}= await getLoggedUserCart();
    setCartDetails(data);
  }

  async function RemoveItem(id){
    let {data}= await removeCartItem(id);
    setCartDetails(data);
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

    
    
  


  useEffect(()=>{
    getCart();
  },[]);
  return (
    <>

<div  className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Shopping cart</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <div className="row my-3 ">
        {cartDetails?
          <>
            <div className={`col-md-12 p-3   ${style.cart}`}>

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
                        <h3 className='h6'>{product.product.title.split(" ").slice(0,4).join(' ')}</h3>
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

            
          </div>
          <div className="modal-footer">
          <Link to={'/cart'} type="button" className="btn bg-main text-white">View Cart</Link>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    
    
    </>
  )
}
