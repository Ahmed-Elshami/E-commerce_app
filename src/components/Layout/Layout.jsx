import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { Offline, Online } from "react-detect-offline";
import ScrollToTop from "react-scroll-to-top";
import style from './Layout.module.css'
import Modal from '../Modal/Modal'





export default function Layout() {

  let {setuserToken,setuserData}=useContext(UserContext);
  useEffect(()=>{
    if(localStorage.getItem('userToken2') !== null){
      setuserToken(localStorage.getItem('userToken2'))
    }
    if(localStorage.getItem('userData2') !== null){
      setuserData(localStorage.getItem('userData2'))
    }
  },[])
  return (
    <>
       <Navbar/>
       <div className={`container-fluid ${style.body}`}>
        <Outlet/>
       </div>

   

      <div >
        <Offline>
          <div className="network">
            <i className='fas fa-wifi'></i>  You are offline (surprise!)
          </div>
        </Offline>
      </div>

      <div >
      <ScrollToTop smooth top={20} className='upIcon' />
      </div>
      
       <Footer/>
       {/* <Footer/> */}


     
        
    
    </>
  )
}
