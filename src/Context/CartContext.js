import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let CartContext=createContext();

export default function CartContextProvider(props){

    const [cartNum, setcartNum] = useState(0);


    let userToken= localStorage.getItem("userToken2")
    let headers={
        token:userToken
    }
    
    function addToCart(id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {productId:id},
        {headers:headers},
        )
        .then((response)=> response)
        .catch((error)=> error)
    }

    function getLoggedUserCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
             headers:headers
         }).then((response)=> response)
         .catch((error)=> error)
    }

    function removeCartItem(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          {headers:headers}
          ).then((response)=>response)
          .catch((error)=>error)
    }

    function updateProductQuantity(id,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {count:count},
        {headers:headers}
        ).then((response)=>response)
        .catch((error)=>error)
    }

    function clearUserCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        {headers:headers}
        ).then((response)=>response)
        .catch((error)=>error)
    }

    function onlinePayment(cartId,url,values){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {shippingAddress:values},
        {headers:headers},
        ).then((response)=>response)
        .catch((error)=>error)
    }

    const [cartId, setcartId] = useState(null);

    async function getCartId(){
       let {data} = await getLoggedUserCart();
       setcartId(data?.data._id);
    }

    useEffect(()=>{
        getCartId();
    },[])


    



    return <CartContext.Provider value={{addToCart,getLoggedUserCart,removeCartItem,updateProductQuantity,clearUserCart,setcartNum,cartNum,onlinePayment,setcartId,cartId}}>
            {props.children}
    </CartContext.Provider>
}