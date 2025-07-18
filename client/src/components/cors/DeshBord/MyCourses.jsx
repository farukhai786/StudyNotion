import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../commen/iconButton";
import CoursesTable from "../DeshBord/InsructerCourse/CoursesTable";
import { getInstructorCourses } from "../../../servises/operation/CourseApi";
import { LuCirclePlus } from "react-icons/lu";
const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await getInstructorCourses(token);
      console.log("Instructor Courses:", result);
      if (result) {
        setCourses(result);
      }
    };

    if (token) fetchCourses();
  }, [token]);

  return (
    <div className="w-11/12  px- py-6 text-white">
  
      <div className="flex items-center w-[98%] justify-between mb-6">
        <h1 className="text-3xl font-semibold">My Courses</h1>
        <IconBtn
          text="Add Course"
          onClick={() => navigate("/dashboard/add-course")}
          customClasses=" flex-row-reverse px-3 justify-center text-sm font-medium text-[#FFD60A] border border-[#FFD60A] py-3 rounded-md hover:bg-[#FFD60A]/10 transition "
        >
            <span > <LuCirclePlus  className=" font-extrabold" fontSize={"18"}/></span>
        </IconBtn>
        
      </div>

     
      <div className="bg-[#000814] rounded-lg p-4 shadow-md">
        {Array.isArray(courses) && courses.length > 0 ? (
          <CoursesTable courses={courses} setCourses={setCourses} />
        ) : (
          <p className="text-[#999DAA] text-sm">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
