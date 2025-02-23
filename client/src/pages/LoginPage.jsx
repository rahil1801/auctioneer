import React, { useEffect, useState } from 'react';
import { FiLogIn } from "react-icons/fi";
import { FaEnvelope } from 'react-icons/fa';
import { TbLockPassword } from "react-icons/tb";
import { useForm } from 'react-hook-form';

import { apiConnector } from '../services/apiConnector';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();

  const { 
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitSuccessful },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {

      setLoading(true);
      try{
          const response = await apiConnector("POST", "http://localhost:4000/api/v1/auth/login", data);
          console.log("RESPONSE", response);

          if(!response.data.success){
              throw new Error(response.data.message);
          }

          toast.success("Login Successful");

          localStorage.setItem('user', JSON.stringify(response.data.user));

          navigate('/dashboard/my-profile');
          
      }
      catch(error){
          console.log("ERROR IN SIGNUP", error);
          toast.error("Login Failed");
      }
      setLoading(false);
  }

  useEffect(() => {
    if(isSubmitSuccessful){
        reset({
            email:"",
            password:""
        })
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className='w-full flex items-center justify-center rounded-3xl p-10'>
        <div className='w-[40%] h-[500px] bg-gradient-to-b from-[#F2E8CF] p-8 flex flex-col items-center to-white rounded-3xl shadow-lg'>
            <div className='text-lg p-4 rounded-2xl bg-white w-fit shadow-lg'>
                <FiLogIn />
            </div>

            <h1 className='font-sans font-medium text-2xl mt-5'>Log In with email</h1>
            <p className='mt-2 px-16 text-center font-medium text-gray-600'>Join the new world to discover new auctions and explore new products</p>

            {/* Form */}
            <form className='mt-6 flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center rounded-lg px-4 py-3 w-96 gap-3 
                space-x-3 shadow-md bg-gray-100">
                  <FaEnvelope className="text-gray-500" fontSize={22} />
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-xs text-gray-500 font-medium">Email Address</label>
                    <input
                      required
                      type="email"
                      name='email'
                      id='email'
                      className="outline-none bg-transparent text-gray-800 w-full"
                      placeholder="Enter your email"
                      {...register('email', {required:true}) }
                    />
                    {errors.email && <span className="text-red-500 text-sm mt-1 block">Please enter Email Address</span>}
                  </div>
                </div>

                <div className="flex items-center rounded-lg px-4 py-3 w-96 gap-3 
                space-x-3 shadow-md bg-gray-100">
                  <TbLockPassword className="text-gray-500" fontSize={24} />
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-xs text-gray-500 font-medium">Password</label>
                    <input
                      required
                      type="password"
                      name='password'
                      id='password'
                      {...register('password', {required:true}) }
                      className="outline-none bg-transparent text-gray-800 w-full"
                      placeholder="Enter your password"
                    />
                    {errors.password && <span className="text-red-500 text-sm mt-1 block">Please enter Password</span>}
                  </div>
                </div>
 
                <button type='submit' disabled={loading}
                  className='px-6 py-2 bg-[#2973B2] text-white hover:bg-blue-600 transition-all duration-300 mt-2 rounded-lg cursor-pointer'>
                    {
                        loading ? "Loading..." : "Log In"
                    }
                </button>
            </form>
        
        </div>
    </div>
  )
}

export default LoginPage
