import React, { useState } from "react";
import { useSelector,  } from "react-redux";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../commen/ConfirmationModal";
import { deleteCourse, getInstructorCourses } from "../../../../servises/operation/CourseApi";
import { useNavigate } from "react-router-dom";


export default function CoursesTable({ courses, setCourses }) {
  const { token } = useSelector((state) => state.auth);
   const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId }, token);
    const result = await getInstructorCourses(token);
    if (result) setCourses(result);
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div className="mt-6 space-y-3">
  
      <div className="grid grid-cols-[7fr_1fr_1fr_1fr] text-[#F1F2FF] text-sm uppercase tracking-wide ">
        <p>Courses</p>
        <p>Duration</p>
        <p>Price</p>
        <p>Actions</p>
      </div>

    
      {courses.map((course) => (
        <div
          key={course._id}
          className="grid grid-cols-[7fr_1fr_1fr_1fr]  text-white pt-6 "
        >
         
          <div className="flex gap-3 ">
            <img
              src={course.thumbnail}
              alt="thumbnail"
              className="w-[200px] h-[120px] object-cover rounded-md border border-[#2b2b2b]"
            />
            <div className=" flex flex-col gap-2">
              <p className=" font-semibold text-[#F1F2FF]">{course.courseName}</p>
              <p className="text-sm text-[#838894]">{course.courseDescription}</p>
              <p className="text-xs text-[#838894]">
                Created: {course.createdAt ? new Date(course.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }) : "Invalid Date"}
              </p>
              <p
                className={`text-xs font-semibold w-fit mt-1 px-2 py-[2px] rounded-full ${
                  course.status === COURSE_STATUS.DRAFT
                    ? "bg-[#f472b6] text-[#831843]"
                    : "bg-[#2C333F] text-[#FBC7D1]"
                }`}
              >
                {course.status === COURSE_STATUS.DRAFT ? "Drafted" : "Published"}
              </p>
            </div>
          </div>

         
          <div className="text-sm text-[#F1F2FF]">2hr 30min</div>

          
          <div className="text-sm text-[#F1F2FF]">₹ {course.price}</div>

        
          <div className="  text-lg">
             <button
              disabled={loading}
              className="hover:text-[#fef08a]"
             onClick={() => navigate(`../edit-course/${course._id}`)}

            >
              <FiEdit />
            </button>
            <button
              disabled={loading}
              className="hover:text-[#f472b6] pl-6"
              onClick={() =>
                setConfirmationModal({
                  text1: "Do you want to delete this course?",
                  text2: "All the data related to this course will be lost.",
                  btn1Text: "Delete",
                  btn2Text: "Cancel",
                  btn1Handler: () => handleCourseDelete(course._id),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      ))}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
