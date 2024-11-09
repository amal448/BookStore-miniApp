import { useState,useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useFetchAllBooksQuery } from "../redux/features/books/booksApi";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination,Navigation } from 'swiper/modules';
import BookCard from "./BookCard";

const Recommended = () => {
    // const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Choose a genere")

    
    const { data = { data: [] } } = useFetchAllBooksQuery();
    const books = data.data;    
    console.log("recommednded",books);
    
    // useEffect(() => {
    //     fetch("books.json").then(res => res.json()).then((data) => setBooks(data)
    //     )
    // }, [])
    // console.l
  
  return (
    <div className="py-16">
                    <h2 className='text-3xl font-semibold mb-6'>Recommended</h2>
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
                 books?.length>0 && books?.slice(8,16).map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard key={index} book={book} />
                        </SwiperSlide>
                    ))
                }









            </Swiper>

    </div>
  )
}

export default Recommended