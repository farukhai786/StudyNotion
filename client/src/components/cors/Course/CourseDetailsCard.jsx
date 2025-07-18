import React from "react"
import { useSelector } from "react-redux"
import {
  FaPlayCircle,
  FaInfinity,
  FaMobileAlt,
  FaCertificate,
  FaShareAlt,
} from "react-icons/fa"
import Button from "../../commen/iconButton"
import toast from "react-hot-toast"
import copy from "copy-to-clipboard"

const CourseDetailsCard = ({
  thumbnail,
  price,
  handleAddToCart,
  handleBuyCourse,
  paymentLoading,
  course,
  navigate,
}) => {
  const { user } = useSelector((state) => state.profile)

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link Copied to clipboard")
  }

  const commonBtnClasses =
    "flex items-center justify-center gap-2 bg-[#FFD60A] text-black px-4 py-2 rounded-md hover:bg-[#e6c109] transition text-sm"

  return (
    <div className="w-full max-w-sm bg-[#161D29] rounded-xl p-4 shadow-md md:absolute md:right-10 md:top-8 md:w-[400px] mx-auto mt-6 md:mt-0">
      <img
        src={thumbnail}
        alt={course?.courseTitle || "Course Thumbnail"}
        className="rounded-md w-full h-44 object-cover"
      />

      <div className="text-2xl font-semibold mt-4">₹{price}</div>

      <div className="flex flex-col gap-2 mt-4">
        {user && course?.studentsEnrolled?.includes(user._id) ? (
          <Button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            customClasses={commonBtnClasses}
          >
            Go to Course
          </Button>
        ) : (
          <>
            <Button onClick={handleAddToCart} customClasses={commonBtnClasses}>
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyCourse}
              disabled={paymentLoading}
              customClasses={commonBtnClasses}
            >
              {paymentLoading ? "Processing..." : "Buy Now"}
            </Button>
          </>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-2">30-Day Money-Back Guarantee</p>

      {Array.isArray(course?.instructions) && (
        <div className="mt-4 text-sm text-gray-200">
          {course.instructions.map((item, index) => (
            <p key={index} className="flex gap-2">
              {item}
            </p>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-200 mt-4">
        <div className="flex items-center gap-2">
          <FaPlayCircle /> On-demand Videos
        </div>
        <div className="flex items-center gap-2">
          <FaInfinity /> Lifetime Access
        </div>
        <div className="flex items-center gap-2">
          <FaMobileAlt /> Access on mobile
        </div>
        <div className="flex items-center gap-2">
          <FaCertificate /> Certificate
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={handleShare}
          variant="ghost"
          customClasses="text-blue-400 flex items-center gap-2 text-sm"
        >
          <FaShareAlt /> Share
        </Button>
      </div>
    </div>
  )
}

export default CourseDetailsCard
