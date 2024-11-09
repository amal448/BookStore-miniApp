import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [message,setMessage]=useState('')
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate()
    const { LoginUser, signInWithGoogle } = useAuth();
    console.log(LoginUser);

    const onSubmit = async (data) => {
        console.log(data)
        try {
            await LoginUser(data.email, data.password)
            alert("user login Successfully")
            navigate('/')
        }
        catch (error) {
            console.log(data)
            console.log(error)
        }
    }
    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle()
            alert("Login SuccessFul with Google")
            navigate('/')
        }
        catch (error) {
            alert("Login Failed with Google")
            setMessage("Please Provide a valid email and password")
        }
    }

    return (
        <div className='h-[calc(100vh-120px)] border flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-2xl font-semibold mb-4'>Please Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email"
                            id="email"
                            placeholder='Email Address'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
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

                    <div>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login</button>
                    </div>
                </form>

                <p className='align-baseline font-medium mt-4 text-sm'>Haven't an account? Please <Link to={'/register'} className='text-blue-500 hover:text-blue-700'>Register</Link></p>

                <div className='mt-4'>
                    <button
                    onClick={handleGoogleLogin}
                    className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                        <FaGoogle className='mr-2' />Sign in with Google
                    </button>
                </div>
                <p className='mt-5 text-center text-gray-500 text-sm'>All rights reserved</p>
            </div>
        </div>
    )
}

export default Login
