import axios from 'axios'
import style from './Login.module.css'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react' 
import { DNA } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext'


export default function Login() {
  let {setuserToken,setuserData}= useContext(UserContext);
  let navigate=useNavigate();
  const [error, seterror] = useState(null);
  let [isloading, setisloading] = useState(false)


  async function Login(values){
    setisloading(true)
    let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .catch((err)=>{
      setisloading(false)
      seterror(err.response.data.message)
    })

    if(data.message==='success'){
      setisloading(false)
      localStorage.setItem("userToken2", data.token);
      localStorage.setItem("userData2", data.user.name);
      setuserToken(data.token);
      setuserData(data.user.name)
      navigate('/')
      window.location.reload(true);
    }
  }


  let validationSchema=Yup.object({
    email:Yup.string().email("email invalid").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"email is invalid").required("email is required"),
    password:Yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "The password must contain letters, special characters, and numbers. You have {6-16} valid.").required("password is required"),
  })
  let formik=useFormik({
    initialValues:{
      email:'',
      password:'',
    },validationSchema:validationSchema,
    onSubmit:Login
  })
  return (
    <>
    <div className={`w-50 mx-auto py-5 ${style.login} `}>
        <h3 className='mb-4 text-main'>LOGIN</h3>
        {error ?<div className="alert alert-danger mt-3 p-2">{error}</div>:""}

        <form onSubmit={formik.handleSubmit}>
          
          
          <label htmlFor='email' >Email</label>
          <input className='form-control' id='email' type='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email ? <div className="alert mt-2 p-2 alert-danger">{formik.errors.email}</div>:''}


          <label htmlFor='password' >Password</label>
          <input className='form-control' id='password' type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.password && formik.touched.password ? <div className="alert mt-2 p-2 alert-danger">{formik.errors.password}</div>:''}


          {isloading==true?<button type='button' className='btn bg-white border 3px solid bg-main text-white mt-2'>
          (<DNA
              visible={true}
              height="30"
              width="50"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
              />)
          </button>
          :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Login</button>}
          <Link className='btn mt-2 text-main ' to={"/register"}>Register</Link>
        
        
        </form>

    </div>

    
    </>
  )
}
