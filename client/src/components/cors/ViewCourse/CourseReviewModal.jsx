import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import { createRating } from "../../../servises/operation/ratingAndReview";
import { FaStar } from "react-icons/fa";

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const [rating, setRating] = useState(0);
  const { token } = useSelector((state) => state.auth);

  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await createRating(
        {
          courseId: courseEntireData._id,
          rating: data.courseRating,
          review: data.courseExperience,
        },
        token
      );

      if (response.success) {
        toast.success("Review submitted successfully!");
        setReviewModal(false);
      } else {
        toast.error(response.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Error while creating rating:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000814] bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-[#161D29] rounded-lg w-[90%] max-w-[600px] p-6">
    
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold text-[#F1F2FF]">Add Review</p>
          <button onClick={() => setReviewModal(false)} className="text-richblack-300 text-2xl">
            <RxCross1 />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <img src={user?.image} alt="profile" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="text-[#F1F2FF] font-medium text-sm">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[#6E727F] text-xs">Posting Publicly</p>
          </div>
        </div>

       
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Stars */}
          <div className="mb-4 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => {
                  setRating(star);
                  setValue("courseRating", star);
                }}
              >
                <FaStar size={24} color={star <= rating ? "#FFD700" : "#4B5563"} />
              </button>
            ))}
          </div>

         
          <div className="mt-4">
            <label htmlFor="courseExperience" className="text-sm text-[#F1F2FF] mb-1 block">
              Add Your Experience
            </label>
            <textarea
              id="courseExperience"
              placeholder="Add Your Experience here"
              {...register("courseExperience", { required: true })}
              className="min-h-[130px] w-full bg-[#161D29] text-[#F1F1FF] border border-[#2C333F] placeholder:text-[#AFB5BF] rounded-md p-3"
            />
            {errors.courseExperience && (
              <span className="text-pink-200 text-sm">Please add your experience</span>
            )}
          </div>

       
          <input
            type="hidden"
            {...register("courseRating", { required: true })}
            value={rating}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => setReviewModal(false)}
              className="px-5 py-2 rounded-md border border-[#2C333F] text-[#AFB5BF]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-[#FFD60A] text-black font-medium hover:bg-[#e6c109]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
