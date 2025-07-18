// 2️⃣  ViewCourse.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useParams,  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VideoDetailsSidebar from "../components/cors/ViewCourse/VideoDetailsSlider";
import CourseReviewModal from "../components/cors/ViewCourse/CourseReviewModal";
import { getFullCourseDetails } from "../servises/operation/CourseApi";
import {
  setCourseSectionData,
  setEntireCourseData,
  setCompletedLectures,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

const ViewCourse = () => {
  const { courseId } = useParams();
  const { token }   = useSelector((s) => s.auth);
  const dispatch    = useDispatch();
  

  const [loading, setLoading]       = useState(true);
  const [reviewModal, setReviewModal] = useState(false);

useEffect(() => {
  if (!courseId) return;          // invalid URL

  const fetchData = async () => {
    try {
      const  data  = await getFullCourseDetails(courseId, token);
      console.log("data", data)
      const { courseDetails, completedLectures } = data;
     console.log("🔥 completedVideos from backend:", completedLectures);

      dispatch(setCourseSectionData(courseDetails.courseContent));
      dispatch(setEntireCourseData(courseDetails));
      dispatch(setCompletedLectures(completedLectures));

      const total = courseDetails.courseContent
        .reduce((n, sec) => n + sec.subSection.length, 0);

      dispatch(setTotalNoOfLectures(total));
    } catch (err) {
      console.error("Fetch course details error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [courseId, token, dispatch]);


  if (loading) return <p className="text-white p-6">Loading…</p>;

  return (
    <>
      <div className="relative flex min-h-screen bg-[#000814] text-[#DBDDEA]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;

