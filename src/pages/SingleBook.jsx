import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"

import { getImgUrl } from '../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../src/redux/features/cart/CartSlice';
import { useFetchBooksByIdQuery } from '../redux/features/books/booksApi';

const SingleBook = () => {

    const { id } = useParams()
    const dispatch=useDispatch()
    const { data: data, isLoading, isError } = useFetchBooksByIdQuery(id);
    const book = data?.data
    console.log(book);
    

    
    if (isLoading) return <div>Loading ...</div>
    if (isError) return <div>Error</div>
    console.log("single", book);

    const handleAddToCart=(book)=>{
        dispatch(addToCart(book))
    }



    return (
        <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{book[0].title}</h1>

            <div className=''>
                <div>
                    <img
                        src={`${getImgUrl(book[0].coverImage)}`}
                        alt={book[0].title}
                        className="mb-8"
                    />
                </div>

                <div className='mb-5'>
                    <p className="text-gray-700 mb-2"><strong>Author:</strong> {book[0].author || 'admin'}</p>
                    <p className="text-gray-700 mb-4">
                        <strong>Published:</strong> {new Date(book[0]?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-4 capitalize">
                        <strong>Category:</strong> {book[0]?.category}
                    </p>
                    <p className="text-gray-700"><strong>Description:</strong> {book[0].description}</p>
                </div>

                <button onClick={() => handleAddToCart(book[0])} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                    <FiShoppingCart className="" />
                    <span>Add to Cart</span>

                </button>
            </div>
        </div>
    )
}

export default SingleBook