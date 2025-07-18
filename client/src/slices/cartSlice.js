import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-hot-toast"

// LocalStorage helpers
const updateLocalStorage = (cart, totalItems, totalPrice) => {
  localStorage.setItem("cart", JSON.stringify(cart))
  localStorage.setItem("totalItems", JSON.stringify(totalItems))
  localStorage.setItem("totalPrice", JSON.stringify(totalPrice))
}

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  totalItems: JSON.parse(localStorage.getItem("totalItems")) || 0,
  totalPrice: JSON.parse(localStorage.getItem("totalPrice")) || 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ✅ Manually set total item count
    setTotalItem(state, action) {
      state.totalItems = action.payload
      localStorage.setItem("totalItems", JSON.stringify(action.payload))
    },

    // ✅ Add item to cart
    addToCart(state, action) {
      const item = action.payload
      const existingItem = state.cart.find(i => i._id === item._id)

      if (existingItem) {
        toast.error("Course already in cart")
      } else {
        state.cart.push(item)
        state.totalItems += 1
        state.totalPrice += item.price
        toast.success("Course added to cart")
        updateLocalStorage(state.cart, state.totalItems, state.totalPrice)
      }
    },

    // ✅ Remove item from cart
    removeFromCart(state, action) {
      const id = action.payload
      const itemToRemove = state.cart.find(item => item._id === id)

      if (itemToRemove) {
        state.cart = state.cart.filter(item => item._id !== id)
        state.totalItems -= 1
        state.totalPrice -= itemToRemove.price
        toast.success("Course removed")
        updateLocalStorage(state.cart, state.totalItems, state.totalPrice)
      } else {
        toast.error("Course not found in cart")
      }
    },

    // ✅ Reset cart
    resetCart(state) {
      state.cart = []
      state.totalItems = 0
      state.totalPrice = 0
      localStorage.removeItem("cart")
      localStorage.removeItem("totalItems")
      localStorage.removeItem("totalPrice")
      toast.success("Cart cleared")
    }
  }
})

export const { setTotalItem, addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer
