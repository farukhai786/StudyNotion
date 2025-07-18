import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconButton from "../../../../commen/iconButton";
import { BiRightArrowAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LuCirclePlus } from "react-icons/lu";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import {
  createSection,
  updateSection,
} from "../../../../../servises/operation/CourseApi";
import NestedView from "./NestedView";

export default function CourseBuilder() {

  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goNext = () => {
    if (!course?.courseContent?.length) {
      return toast.error("Please add at least one Section");
    }
    if (
      course.courseContent.some(
        (sec) => !sec.subSection || sec.subSection.length === 0
      )
    ) {
      return toast.error("Please add at least one Lecture in each section");
    }
    dispatch(setStep(3));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const body = { sectionName: data.sectionName, courseId: course._id };
      const result = editSectionName
        ? await updateSection(
            { ...body, sectionId: editSectionName },
            token
          )
        : await createSection(body, token);

      if (result) {
        dispatch(setCourse(result));
        toast.success(
          editSectionName ? "✅ Section updated" : "✅ Section created"
        );
        cancelEdit();
      } else {
        toast.error("❌ Invalid response. Check console for details.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  const handleChangeEditSectionName = (id, name) => {
    if (editSectionName === id) return cancelEdit();
    setEditSectionName(id);
    setValue("sectionName", name);
  };

  /* ───────── UI ───────── */
  return (
   <>
    <div className="rounded-lg bg-[#0E1117] p-4 sm:p-6 space-y-6 border border-[#1E293B]">
  <h2 className="text-xl sm:text-2xl font-semibold text-white">Course Builder</h2>

 
  {course?.courseContent?.length > 0 && (
    <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
  )}

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
    <input
      id="sectionName"
      placeholder="Add a section to build your course"
      {...register("sectionName", { required: true })}
      className="w-full rounded-md bg-[#2C333F] text-sm sm:text-base text-[#F1F2FF] px-4 py-2 border border-[#424854] placeholder:text-[#999DAA] focus:outline-none focus:ring-2 focus:ring-[#FFD60A]/40"
    />
    {errors.sectionName && (
      <span className="block text-[#FF6B6B] text-sm">
        Section name is required
      </span>
    )}

    <IconButton
      type="submit"
      disabled={loading}
      text={editSectionName ? "Edit Section" : "Create Section"}
      customClasses="flex flex-row-reverse justify-center text-sm sm:text-base font-medium text-[#FFD60A] border border-[#FFD60A] py-3 rounded-md hover:bg-[#FFD60A]/10 transition"
    >
      <LuCirclePlus className="font-extrabold" fontSize={18} />
    </IconButton>
  </form>
</div>


<div className="flex flex-col sm:flex-row justify-end items-center gap-3 sm:gap-6 pt-6 sm:pt-4 px-4">
  <button
    type="button"
    onClick={goBack}
    className="w-full sm:w-auto text-white text-sm sm:text-base border border-gray-500 px-4 py-2 rounded-md hover:bg-white/5 transition"
  >
    Back
  </button>

  <IconButton
    onClick={goNext}
    text="Next"
    customClasses="w-full sm:w-auto flex items-center justify-center gap-1 bg-[#FFD60A] text-black text-sm sm:text-base px-6 py-2 rounded-md hover:bg-[#e6c109] transition"
  >
    <BiRightArrowAlt className="text-xl" />
  </IconButton>
</div>

   </>
  );
}
