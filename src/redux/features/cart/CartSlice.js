import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
const initialState = {
    cartItem: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const existingItem = state.cartItem.find((item) => item._id === action.payload._id)
            if (!existingItem) {
                state.cartItem.push(action.payload)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Item Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Item Already Exist",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        },
        removeFromCart:(state,action)=>{
            state.cartItem=state.cartItem.filter((item)=>(
                item._id !== action.payload._id
            ))
        },
        clearCart:(state)=>{
            state.cartItem=[]
        }
    }
})

export const {addToCart,removeFromCart,clearCart}=cartSlice.actions
export default cartSlice.reducer