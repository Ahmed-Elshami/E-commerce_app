import React from 'react'
import style from './Footer.module.css'
import img from '../../assets/images/freshcart-logo.svg'
import img2 from '../../assets/images/google play.png'
import img3 from '../../assets/images/App store.png'


export default function Footer() {
  return (
    <>
    <div className={`container-fluid ${style.section}`}>
      <div className={`${style.footer}`}>
        <div className="row">
        <div className={`col-md-3  ${style.colFotter}`}>
          <div className={style.caption}>
            <h5  className={style.captionh3}>Broadway Store</h5>
            <i className="fas fa-chevron-circle-right"></i>
          </div>
          
          <p className={style.captionp}>1260 Broadway, San Francisco, CA 94109</p>
        </div>
        <div className="col-md-3">
          <div className={style.caption}>
            <h5  className={style.captionh3}>Valencia Store</h5>
            <i className="fas fa-chevron-circle-right"></i>
          </div>
          
          <p className={style.captionp}>1501 Valencia St, San Francisco, CA 94110</p>
        </div>
        <div className="col-md-3">
          <div className={style.caption}>
            <h5  className={style.captionh3}>Emeryville Store</h5>
            <i className="fas fa-chevron-circle-right"></i>
          </div>
          
          <p className={style.captionp}>1034 36th St, Emeryville, CA 94608</p>
        </div>
        <div className="col-md-3">
          <div className={style.caption}>
            <h5  className={style.captionh3}>Alameda Store</h5>
            <i className="fas fa-chevron-circle-right"></i>
          </div>
          
          <p className={style.captionp}>1433 High St, Alameda, CA 94501</p>
        </div>
        <hr/>
        </div>

        <div className={`row ${style.footerConnection}`}>
        <div className={`col-md-3 ${style.footerConnectionCol}`}>
          <img src={img} alt='logo img' />
          <p className={style.captionp2}>Condimentum adipiscing vel neque dis nam parturient orci at scelerisque.</p>
          <h3 className={style.captionh32}>Subscribe us</h3>
          <div className={style.icons}>
            <i className={`fab fa-facebook cursor-pointer ${style.facebook}`}></i>
            <i className={`fa-brands fa-x-twitter cursor-pointer ${style.twitter}`}></i>
            <i className={`fa-brands fa-pinterest cursor-pointer ${style.pinterest} `}></i>
            <i className={`fa-brands fa-linkedin cursor-pointer ${style.linkedin}`}></i>
            <i className={`fa-brands fa-telegram cursor-pointer ${style.telegram}`}></i>
          </div>
        </div>
        <div className={`col-md-3 ${style.footerConnectionCol}`}>
          <h5 className={style.captionh3}>Categories</h5>
          <p className={`cursor-pointer ${style.captionp2hover}`}>Clothes</p>
          <p className={`cursor-pointer ${style.captionp2hover}`}>Shoes</p>
            <p className={`cursor-pointer ${style.captionp2hover}`}>Smartphones</p>
            <p className={`cursor-pointer ${style.captionp2hover}`}>Laptops</p>
            <p className={`cursor-pointer ${style.captionp2hover}`}>Cameras</p>
            <p className={`cursor-pointer ${style.captionp2hover}`}>Bathroom</p>
        </div>
        <div className={`col-md-3 ${style.footerConnectionCol}`}>
          <h5 className={style.captionh3}>Useful Links</h5>
          <p className={`cursor-pointer ${style.captionp2hover}`}>Promotions</p>
          <p className={`cursor-pointer ${style.captionp2hover}`}>Stores</p>
            <p className={`cursor-pointer ${style.captionp2hover}`}>Our contacts</p>
            <p className={`cursor-pointer ${style.captionp2hover}`}>Delivery & Return</p>
            <p className={`cursor-pointer ${style.captionp2hover}`}>Outlet</p>
        </div>
        <div className={`col-md-3 ${style.footerConnectionCol}`}>
          <h5 className={style.captionh3}>Download App on Mobile:</h5>
          <p className={`cursor-pointer ${style.captionp2hover}`}>15% discount on your first purchase</p>
          <div className="d-flex align-items-center">
            <img className='cursor-pointer'  src={img2} alt=''/>
            <img className={`cursor-pointer ${style.appImg}`}  src={img3} alt=''/>
          </div>
        </div>
        </div>
        <hr/>

        <div>
          <h6 className={`${style.h6end}`}>FRESHCART <span className={style.h6span}>© 2024 CREATED BY</span> <span className='cursor-pointer'>Ahmed Elshamy.</span> <span className={style.h6span}>PREMIUM E-COMMERCE SOLUTIONS.</span> </h6>
        </div>
    
   
      </div>
  </div>
    
    </>
  )
}
