import React, { useState } from 'react'
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import avatarImg from '../assets/avatar.png'
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const {currentUser,logout} = useAuth()

    const [isDropdownOpen, setDropdownOpen] = useState(false)

    const handleLogout=()=>{
        logout()
    }


    const navigation = [
        { name: "DashBoard", href: '/dashboard' },
       { name: "Orders", href: '/orders'},
       { name: "Cart Page", href: '/cart'},
       { name: "CheckOut", href: '/checkout'}

    ]
    const counter=useSelector(state=>state.cart.cartItem)
    return (
        <header className='max-w-screen-2xl mx-auto px-4 py-6'>
            <nav className='flex justify-between items-center'>
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to={'/'}><HiMiniBars3CenterLeft className='size-6' /></Link>

                    <div className='relative sm:w-72 w-40 space-x-2'>
                        <IoSearchOutline className='absolute inline-block left-3 inset-y-2' />
                        <input type="text" placeholder='Search Here' className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none' />
                    </div>
                </div>

                <div className='relative flex items-center space-x-2'>
                    <div>
                        {
                            currentUser ?
                                <>
                                    <button onClick={() => setDropdownOpen(true)}>
                                        <img className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} src={avatarImg} alt="" />
                                    </button>
                                    {
                                        isDropdownOpen && (
                                            <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                                <ul className='py-2'>
                                                    {
                                                        navigation?.map((item) => (
                                                            <li key={item.name} onClick={()=>{
                                                                setDropdownOpen(false)
                                                            }}>
                                                                <Link to={item.href}
                                                                className='block px-4 py-2 text-sm hover:bg-gray-100'
                                                                >{item.name}</Link>
                                                            </li>
                                                        ))
                                                    }
                                                    <li>
                                                        <button onClick={handleLogout} className='block px-4 py-2 text-sm hover:bg-gray-100'>Logout</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    }
                                </> :
                                <Link to={'/login'}>
                                    <HiOutlineUser className='size-6' />
                                </Link>

                        }
                    </div>
                    <button className='hidden sm:block'>
                        <HiOutlineHeart className='size-6' />
                    </button>
                    <Link to={'cart'} className='bg-primary p-1 sm:px-6 py-2 flex items-center rounded-sm' >
                        <HiOutlineShoppingCart />
                        {
                            counter.length>0 ? <span className='text-sm font-semibold sm:ml-1'>{counter?.length}</span>:
                            <span className='text-sm font-semibold sm:ml-1'>0</span>
                        }
                        
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar