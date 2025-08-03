import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import ReactStars from "react-stars";
import { apiConnector } from "../../servises/apiconnector";
import { ratingEndpoints } from "../../servises/apis";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const { GET_ALL_REVIEWS_API } = ratingEndpoints;

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const response = await apiConnector("GET", GET_ALL_REVIEWS_API);
        console.log("response.data.data", response.data.data);
        if (response?.data?.success) {
          setReviews(response.data.data);
        } else {
          console.warn("No reviews found");
        }
      } catch (err) {
        console.error("❌ Error loading reviews:", err);
      }
    };

    fetchAllReviews();
  }, []);

  return (
    <div className="mx-auto rounded-md relative  py-12 max-w-10/12 ">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#F1F2FF]">
        Student Reviews
      </h2>

      {reviews.length > 0 ? (
        <Swiper
          spaceBetween={25}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          className="w-full"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id} className=" rounded-xl">
              <div className="h-full bg-[#161D29]  p-6 rounded-xl  shadow-md flex flex-col gap-4 transition-transform hover:scale-[1.02] duration-200">
                {/* Stars */}
                <div className="flex items-center gap-2">
                  <span>{review.rating}</span>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    color2="#facc15"
                    edit={false}
                  />
                </div>


                <p className="text-gray-600 text-base leading-relaxed italic">
                  “{review.review}”
                </p>

                
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={review.user.image}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-[#999DAA] font-semibold">
                      {review.user.FirstName} {review.user.LastName}
                    </p>
                    <p className="text-xs text-[#585D69]">
                      Student of {review.course.courseName}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex justify-center items-center h-40 text-richblack-300 text-lg font-semibold">
          No Reviews Found
        </div>
      )}
    </div>
  );
};

export default ReviewSlider;
