import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep, resetCourseState } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../servises/operation/CourseApi";
import IconButton from "../../../../commen/iconButton";

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, [course?.status, setValue]);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCoursePage = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    const isPublic = getValues("public");

    if (
      (course?.status === COURSE_STATUS.PUBLISHED && isPublic === true) ||
      (course?.status === COURSE_STATUS.DRAFT && isPublic === false)
    ) {
    
      goToCoursePage();
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    formData.append("status", isPublic ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await editCourseDetails(formData, token);
    setLoading(false);

    if (result) {
      goToCoursePage();
    }
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  return (
<form onSubmit={handleSubmit(onSubmit)}>

  <div className="rounded-lg bg-[#2C333F] border border-[#424854] p-6">
    <p className="text-lg font-semibold mb-4 text-[#F1F2FF]">Publish Settings</p>

    <label htmlFor="public" className="flex items-center gap-x-2 text-[#999DAA]">
      <input
        type="checkbox"
        id="public"
        {...register("public")}
        className="h-[18px] w-[18px] accent-[#FFD60A] cursor-pointer"
      />
      <span className="text-sm font-medium">Make this Course Public</span>
    </label>
  </div>

 
  <div className="mt-8 flex items-center justify-between">

    <button
      type="button"
      onClick={goBack}
      disabled={loading}
      className="flex items-center gap-x-2 rounded-md bg-[#2C333F] px-5 py-2 text-sm font-medium text-[#F1F2FF] border border-[#424854]"
    >
      ← Back
    </button>

   
    <button
      type="submit"
      disabled={loading}
      className="rounded-md bg-[#FFD60A] px-5 py-2 text-sm font-semibold text-[#161D29] shadow-sm"
    >
      Save and Publish
    </button>
  </div>
</form>






  );
}
