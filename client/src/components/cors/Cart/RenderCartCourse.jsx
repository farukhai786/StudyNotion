import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { GiNinjaStar } from "react-icons/gi";
import { removeFromCart } from "../../../slices/cartSlice";
import { FiTrash2 } from "react-icons/fi";

const RenderCartCourses = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className="flex flex-col gap-4">
      {cart.map((course, index) => (
        <div
          key={index}
          className="flex justify-between items-start gap-4 rounded-lg p-4 border"
       
        >
          {/* Left - Image */}
          <div className="flex gap-4">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="w-[140px] h-[120px] object-cover rounded-lg"
            />

            {/* Center - Course Details */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-[#F1F2FF]">
                {course?.courseName}
              </h3>
              <p className="text-sm text-[#838894]">
                {course?.category?.name}
              </p>

              <div className="flex items-center gap-2 text-[#FFD60A]">
                <span className="text-sm font-bold">4.5</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#FFD700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />
                <span className="text-sm text-[#6E727F]">
                  ({course?.ratingAndReviews?.length || 0} Reviews)
                </span>
              </div>

              <p className="text-xs text-[#838894]">
                Total Courses • Lesson • Beginner
              </p>
            </div>
          </div>

          {/* Right - Price and Remove */}
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-1 text-[#FECACA] hover:text-[#FDA4AF]"
            >
              <FiTrash2 size={16} />
              <span>Remove</span>
            </button>
            <p className="font-bold text-lg text-[#FFE47A]">
              Rs. {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;
