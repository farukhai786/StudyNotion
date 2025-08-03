import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../../src/servises/operation/CourseApi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import Upload from "./Upload";
import RequirementField from "./RequirementField";
import ChipInput from "./ChipInput";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import IconButton from "../../../../commen/iconButton";
import { COURSE_STATUS } from "../../../../../utils/constants";

export default function CourseInformationForm() {
  /* ────────────────────────── react‑hook‑form ────────────────────────── */
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
     control, 
    formState: { errors },
  } = useForm();

  /* ────────────────────────── Redux / local state ───────────────────── */
  const dispatch = useDispatch();
  const { token } = useSelector((s) => s.auth);
  const { course, editCourse } = useSelector((s) => s.course);

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  /* ────────────────────────── Fetch + pre‑fill ──────────────────────── */
  useEffect(() => {
    // fetch all categories for the dropdown
    (async () => {
      setLoading(true);
      const cats = await fetchCourseCategories();
      if (cats?.length) setCourseCategories(cats);
      setLoading(false);
    })();

    // if editing, pre‑populate the fields
    if (editCourse && course) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category._id);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
  }, [editCourse, course, setValue]);

  /* ────────────────────────── helpers ──────────────────────────────── */
  const isFormUpdated = () => {
    const cur = getValues();
    return (
      cur.courseTitle !== course.courseName ||
      cur.courseShortDesc !== course.courseDescription ||
      cur.coursePrice !== course.price ||
      cur.courseTags?.toString() !== course.tag?.toString() ||
      cur.courseBenefits !== course.whatYouWillLearn ||
      cur.courseCategory !== course.category._id ||
      cur.courseRequirements?.toString() !== course.instructions?.toString() ||
      cur.courseImage !== course.thumbnail
    );
  };

  /* ────────────────────────── submit handler ───────────────────────── */
  const onSubmit = async (data) => {
    const cur = getValues();


    if (editCourse) {
      if (!isFormUpdated()) {
        toast.error("No changes made");
        return;
      }

      const formData = new FormData();
      formData.append("courseId", course._id);

      if (cur.courseTitle !== course.courseName)
        formData.append("courseName", data.courseTitle);

      if (cur.courseShortDesc !== course.courseDescription)
        formData.append("courseDescription", data.courseShortDesc);

      if (cur.coursePrice !== course.price)
        formData.append("price", data.coursePrice);

      if (cur.courseTags.toString() !== course.tag.toString())
        formData.append("tag", JSON.stringify(data.courseTags));

      if (cur.courseBenefits !== course.whatYouWillLearn)
        formData.append("whatYouWillLearn", data.courseBenefits);

      if (cur.courseCategory !== course.category._id)
        formData.append("category", data.courseCategory);

      if (cur.courseRequirements.toString() !== course.instructions.toString())
        formData.append(
          "instructions",
          JSON.stringify(data.courseRequirements)
        );

      if (cur.courseImage !== course.thumbnail && typeof data.courseImage !== "string") {
        formData.append("thumbnail", data.courseImage);
      } else {
        formData.append("thumbnail", course.thumbnail); 
      }

      setLoading(true);
      const updatedCourse = await editCourseDetails(formData, token);
      setLoading(false);

      if (updatedCourse) {
        toast.success("Course updated");
        dispatch(setCourse(updatedCourse));
        dispatch(setStep(2)); 
      }
      return; 
    }

  
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnail", data.courseImage);
    formData.append("status", COURSE_STATUS.DRAFT);
    console.log("STATUS:", COURSE_STATUS.DRAFT); 

    setLoading(true);
    const newCourse = await addCourseDetails(formData, token);
    setLoading(false);

    if (newCourse) {
      toast.success("Course drafted");
      dispatch(setCourse(newCourse));
      dispatch(setStep(2));
    }
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        w-full
        rounded-lg border border-[#1E293B] bg-[#161D29] p-6
        space-y-6 text-sm
      "
    >
 
      <div className="space-y-1">
        <label className="text-[#E5E7EB] font-medium">
          Course Title <sup className="text-red-500">*</sup>
        </label>
        <input
          {...register("courseTitle", { required: true })}
          placeholder="Enter Course Title"
          className="w-full rounded-md bg-[#2C333F] px-4 py-2 text-[#F1F2FF] placeholder:text-[#999DAA] border border-[#424854] focus:outline-none"
        />
        {errors.courseTitle && (
          <span className="text-[#FF6B6B]">Course title is required</span>
        )}
      </div>

      
      <div className="space-y-1">
        <label className="text-[#E5E7EB] font-medium">
          Course Short Description <sup className="text-red-500">*</sup>
        </label>
        <textarea
          {...register("courseShortDesc", { required: true })}
          placeholder="Enter Description"
          className="min-h-[140px] w-full resize-none rounded-md bg-[#2C333F] px-4 py-2 text-[#F1F2FF] placeholder:text-[#999DAA] border border-[#424854] focus:outline-none"
        />
        {errors.courseShortDesc && (
          <span className="text-[#FF6B6B]">Description is required</span>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-[#E5E7EB] font-medium">
          Price <sup className="text-red-500">*</sup>
        </label>
        <div className="relative">
          <HiOutlineCurrencyRupee className="absolute left-3 top-3 text-[#999DAA]" />
          <input
            type="number"
            {...register("coursePrice", { required: true })}
            placeholder="Enter Price"
            className="w-full rounded-md bg-[#2C333F] pl-10 pr-4 py-2 text-[#F1F2FF] placeholder:text-[#999DAA] border border-[#424854] focus:outline-none"
          />
        </div>
        {errors.coursePrice && (
          <span className="text-[#FF6B6B]">Price is required</span>
        )}
      </div>

   
      <div className="space-y-1">
        <label className="text-[#E5E7EB] font-medium">
          Category <sup className="text-red-500">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          className="w-full rounded-md bg-[#2C333F] px-4 py-2 text-[#F1F2FF] border border-[#424854] focus:outline-none"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {courseCategories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.courseCategory && (
          <span className="text-[#FF6B6B]">Category is required</span>
        )}
      </div>

     
     <ChipInput
  label="Tags"
  name="tags"
  placeholder="Add a tag"
  register={register}
  setValue={setValue}
  control={control}
  errors={errors}
/>


    
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        editData={editCourse ? course.thumbnail : null}
      />

      <div className="space-y-1">
        <label className="text-[#E5E7EB] font-medium">
          Benefits of the course <sup className="text-red-500">*</sup>
        </label>
        <textarea
          {...register("courseBenefits", { required: true })}
          placeholder="Enter Benefits of the course"
          className="min-h-[120px] w-full resize-none rounded-md bg-[#2C333F] px-4 py-2 text-[#F1F2FF] placeholder:text-[#999DAA] border border-[#424854] focus:outline-none"
        />
        {errors.courseBenefits && (
          <span className="text-[#FF6B6B]">Benefits are required</span>
        )}
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />

      
      <div className="flex justify-end gap-x-4 pt-2">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className=" text-[#F1C40F]  hover:text-[#FFD60A] cursor-pointer font-medium                  
       text-[16px]                  
       leading-[24px]               
       tracking-[0]         
       text-center"
          >
            Continue without saving
          </button>
        )}

        <IconButton
          type="submit"
          disabled={loading}
          text={editCourse ? "Save Changes" : "Next"}
          customClasses="
            flex items-center gap-2
            bg-[#FFD60A] hover:bg-[#e6c109] text-black
            px-6 py-2 rounded-md text-sm font-semibold cursor-pointer
          "
        />
      </div>
    </form>
  );
}




