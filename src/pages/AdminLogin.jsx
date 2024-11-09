import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import getBaseUrl from '../utils/baseUrl';

const AdminLogin = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        try {
          const response=await axios.post(`${getBaseUrl()}/api/auth/admin`,data,{
            headers:{
                'Content-Type':'application/json'
            }
          })
          const auth=response.data
          console.log(auth);
          if(auth.token){
                localStorage.setItem('token',auth.token)
                setTimeout(()=>{
                    localStorage.removeItem('token')
                    alert('Token has been expired!,please login again')
                    navigate('/')
                },3600 * 1000)
          }

          alert('Admin Login Successful')
          navigate('/dashboard')




          
            // navigate('/')
        }
        catch (error) {
            console.log(data)
            console.log(error)
        }
    }
    return (
        <div className='h-[calc(100vh-120px)] border flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-2xl font-semibold mb-4'>Admin Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Username</label>
                        <input
                            {...register("username", {
                                required: "UserName is required",
                                // pattern: {
                                //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                //     message: "Invalid email address"
                                // }
                            })}
                            type="text"
                            id="username"
                            placeholder='UserName'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long"
                                }
                            })}
                            type="password"
                            id="password"
                            placeholder='Password'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>

                    <div className='w-full'>
                        <button className='bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-8 rounded focus:outline-none'>Login</button>
                    </div>
                </form>


                
                <p className='mt-5 text-center text-gray-500 text-sm'>All rights reserved</p>
            </div>
        </div>
    )
}

export default AdminLogin