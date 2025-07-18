import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FreeMode,Pagination, Navigation  } from 'swiper/modules';
import CourseCard from './Course_Card';
function CourseSlider({course}) {
  return (
   <div className=" mx-auto rounded-md relative">
      {course?.length > 0 ? (
        <Swiper
          spaceBetween={25}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          freeMode={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[FreeMode, Pagination, Navigation]}
          className="w-full"
        >
          {course.map((courseItem, index) => (
            <SwiperSlide key={index}>
              <div className="h-full">
                <CourseCard course={courseItem} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex justify-center items-center h-40 text-gray-500 text-lg font-semibold">
          No Course Found
        </div>
      )}
    </div>
  );

  }

export default CourseSlider