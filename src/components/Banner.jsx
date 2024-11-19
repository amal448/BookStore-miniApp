import React from 'react'
import bannerImg from '../assets/banner.png'

const Banner = () => {
    return (
        <div className='flex flex-col md:flex-row-reverse py-16 justify-between  items-center gap-12'>
             <div className='md:w-1/2 w-full flex items-center md:justify-end'>
                <img src={bannerImg} alt="" />
            </div>
            <div className='md:w-1/2 w-full'>
                <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Release This Week</h1>
                <p className='mb-10'>Step into a world of stories and possibilities at our bookstore. From timeless classics to thrilling bestsellers, every book invites you on a journey of discovery. Whether for knowledge, escape, or inspiration, find your next favorite read here. Your story begins with the turn of a page.</p>

                <button className='btn-primary'>Subscribe</button>
            </div>
           
        </div>
    )
}

export default Banner