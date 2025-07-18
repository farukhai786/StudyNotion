import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../commen/iconButton'
import { buyCourse } from '../../../servises/operation/studentFeatureAp'

const RenderTotalAmount = () => {
  const navigate = useNavigate()
  const { totalPrice, cart } = useSelector((state) => state.cart)
   const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
   const dispatch = useDispatch()

  const handleBuyCourse = () => {
    if (cart.length === 0) {
      console.log("Cart is empty. Cannot proceed to buy.")
      return
    }

    const courses = cart.map((course) => course._id)
    console.log("Buying these courses:", courses)
console.log("🔑 Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);

 buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[250px] bg-richblack-800 border border-richblack-700 p-6 rounded-lg h-fit">
      <p className="text-lg font-medium text-richblack-300 mb-4">Total:</p>

      <p className="text-2xl font-bold text-yellow-100 mb-2">Rs {totalPrice}</p>
      <p className="text-sm text-richblack-400 line-through mb-6">Rs 5,500</p>

      <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}

export default RenderTotalAmount
