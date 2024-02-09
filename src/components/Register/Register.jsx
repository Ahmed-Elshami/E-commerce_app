import axios from 'axios'
import style from './Register.module.css'
import { useFormik } from 'formik'
import React, { useState } from 'react' 
import { DNA } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {

  let navigate=useNavigate();
  const [error, seterror] = useState(null);
  let [isloading, setisloading] = useState(false)


  async function submitRegister(values){
    setisloading(true)
    let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .catch((err)=>{
      setisloading(false)
      seterror(err.response.data.message)
    })

    if(data.message==='success'){
      setisloading(false)
      navigate('/login')
    }
  }


  let validationSchema=Yup.object({
    name:Yup.string().min(3, "name min length is 3").max(20,"name max length is 20").required("name is required"),
    email:Yup.string().email("email invalid").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"email is invalid").required("email is required"),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/ , "phone is invalid").required("phone is required"),
    password:Yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "The password must contain letters, special characters, and numbers. You have {6-16} valid.").required("password is required"),
    rePassword:Yup.string().oneOf([Yup.ref("password")],"password and rePassword They don't match").required("repassword is required")
  })
  let formik=useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:''
    },validationSchema:validationSchema,
    onSubmit:submitRegister
  })
  return (
    <>
    <div className={`w-50 mx-auto py-5 ${style.register} `}>
        <h3 className='text-main mb-4'>REGISTER</h3>
        {error ?<div className="alert alert-danger mt-3 p-2">{error}</div>:""}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor='name' >name</label>
          <input className='form-control' id='name' type='text' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.name && formik.touched.name? <div className="alert mt-2 p-2 alert-danger">{formik.errors.name}</div> :''}
          
          <label htmlFor='phone' >phone</label>
          <input className='form-control' id='phone' type='tel' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.phone && formik.touched.phone? <div className="alert mt-2 p-2 alert-danger">{formik.errors.phone}</div> :''}

          <label htmlFor='email' >email</label>
          <input className='form-control' id='email' type='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email ? <div className="alert mt-2 p-2 alert-danger">{formik.errors.email}</div>:''}


          <label htmlFor='password' >password</label>
          <input className='form-control' id='password' type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.password && formik.touched.password ? <div className="alert mt-2 p-2 alert-danger">{formik.errors.password}</div>:''}


          <label htmlFor='rePassword' >rePassword</label>
          <input className='form-control' id='rePassword' type='password' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.rePassword && formik.touched.rePassword? <div className="alert mt-2 p-2 alert-danger">{formik.errors.rePassword}</div>:''}

          
          
          
          
          
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
          :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Register</button>}
          <Link className='btn mt-2 text-main ' to={"/login"}>Login</Link>
        
        
        </form>

    </div>

    
    </>
  )
}
