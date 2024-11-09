import React from 'react'
import { useState, useEffect } from 'react';
import BookCard from './BookCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination,Navigation } from 'swiper/modules';
import { useFetchAllBooksQuery } from '../redux/features/books/booksApi';


const TopSelling = () => {

    // const [books, setBooks] = useState([]);
    const categories = ["Choose a genere", "business", "Fiction", "Horror", "Adventure"]
    const [selectedCategory, setSelectedCategory] = useState("Choose a genere")

    // useEffect(() => {
    //     fetch("books.json").then(res => res.json()).then((data) => setBooks(data)
    //     )
    // }, [])


    const { data = { data: [] } } = useFetchAllBooksQuery();
    const books = data.data;    

    // console.log(books);
    const filteredData = selectedCategory === "Choose a genere" ? books : books.filter((book) => (
        book.category === selectedCategory.toLowerCase()
    ))
    console.log("filteredData", filteredData);

    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
            <div className='mb-8 flex items-center'>
                <select name="category" id="category" onChange={(e) => {
                    console.log(e.target.value);

                    setSelectedCategory(e.target.value)


                }} className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {
                        categories?.map((category, index) => (

                            <option key={index} value={category}>{category}</option>
                        ))
                    }

                </select>
            </div>
            <Swiper
             navigation={true} 
                slidesPerView={1}
                spaceBetween={30}
           
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination,Navigation]}
                className="mySwiper"
            >
                {
                 filteredData.length>0 && filteredData?.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard key={index} book={book} />
                        </SwiperSlide>
                    ))
                }









            </Swiper>






        </div>
    )
}

export default TopSelling