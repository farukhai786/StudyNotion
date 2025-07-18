import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourse/RenderSteps";
import { getFullCourseDetails } from "../../../../servises/operation/CourseApi";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";

export default function EditCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();                
  const { token }   = useSelector((s) => s.auth);
  const { course }  = useSelector((s) => s.course);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    if (!courseId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await getFullCourseDetails(courseId, token);
        if (res) {
          dispatch(setEditCourse(true));
          dispatch(setCourse(res.courseDetails));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [courseId, token, dispatch]);              

  if (loading) return <div>Loading…</div>;

  return (
    <div>
      <h1>Edit course</h1>
      {course ? <RenderSteps /> : <p>CourseNotFound</p>}
    </div>
  );
}
