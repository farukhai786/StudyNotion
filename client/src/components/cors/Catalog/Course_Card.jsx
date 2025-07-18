import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../commen/RatingStars";
import getAvgRating from "../../../utils/avgRating";

export default function CourseCard({ course }) {
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const count = getAvgRating(course?.ratingAndReviews || []);
    setAvgRating(count);
  }, [course]);

  return (
    <div>
      <Link to={`/course/${course._id}`}>
        <div className="flex flex-col overflow-hidden rounded-lg bg-[#0F172A] shadow-md">
          {/* Thumbnail */}
          <div className="flex h-40 w-full flex-shrink-0 bg-gray-700">
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col px-4 py-3 text-[#DBDDEA]">
            <h3 className="line-clamp-2 text-base md:text-lg font-semibold">
              {course?.courseName}
            </h3>

            <p className="mt-1 text-sm md:text-base text-gray-400">
              {course?.instructor?.FirstName}
            </p>

            {/* Rating row */}
            <div className="mt-2 flex items-center gap-1 text-yellow-400">
              <span className="text-sm md:text-base font-medium text-white">{avgRating}</span>
              <RatingStars Review_Count={avgRating} />
              <span className="ml-1 text-xs md:text-sm text-gray-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>

            {/* Price */}
            <p className="mt-3 text-lg md:text-xl font-semibold text-white">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
