import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../../../slices/courseSlice'
import {
  createSubSection,
  updateSubSection,
} from '../../../../../servises/operation/CourseApi'
import { RxCross2 } from 'react-icons/rx'
import Upload from '../CourseInformation/Upload'
import IconButton from '../../../../commen/iconButton'

export default function SubSectionModal({
  modalData,
  setmodalData,
  add = false,
  edit = false,
  view = false,
}) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const {course} = useSelector((state)=> state.course)
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (view || edit) {
      setValue('lectureTitle', modalData.title)
      setValue('lectureDesc', modalData.description)
      
    }
  }, [edit, view, modalData, setValue])

  const isFormUpdated = () => {
    const currentValues = getValues()
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo?.[0]
    )
  }

  const handleEditSubSection = async () => {
    
    const currentValues = getValues()
    const formData = new FormData()

    formData.append('subSectionId', modalData._id)
    formData.append('sectionId', modalData.sectionId)

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append('title', currentValues.lectureTitle)
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append('description', currentValues.lectureDesc)
    }

    if (currentValues.lectureVideo && currentValues.lectureVideo.length > 0) {
      formData.append('lectureVideo', currentValues.lectureVideo[0])
    }

    setLoading(true)
    const result = await updateSubSection(formData, token)
if (result) {
  const updatedCourseContent = course.courseContent
  .map((section) => {
    if (!section) return null; 
    return section._id === modalData.sectionId ? result : section;
  })
  .filter(Boolean); 

   console.log("✅ updatedSection:", result.updatedSection);

  dispatch(setCourse({
    ...course,
    courseContent: updatedCourseContent,
    
  }));
}
     setmodalData(null)
    setLoading(false)

    console.log("🧾 FormData about to be sent:");
for (let pair of formData.entries()) {
  console.log(pair[0], ":", pair[1]);
}

  }

const onSubmit = async (data) => {
 console.log("🧠 modalData:", modalData);
console.log("📦 modalData.sectionId:", modalData.sectionId);

  if (view) return;
    console.log("lectureVideo data:", data.lectureVideo);
  if (edit) {
    if (!isFormUpdated()) {
      toast.error("No changes made to the form");
      return;
    }
    await handleEditSubSection();
    return;
  }

  if (!data.lectureVideo || data.lectureVideo === 0) {
    toast.error("Video file is required");
    return;
  }

  const formData = new FormData();
  formData.append("sectionId", modalData.sectionId);
  formData.append("title", data.lectureTitle);
  formData.append("description", data.lectureDesc);
  formData.append("timeDuration", "10");
  formData.append("lectureVideo", data.lectureVideo);
   
  setLoading(true);
const result = await createSubSection(formData, token);
if (result) {
  const updatedCourseContent = course.courseContent.map((section) =>
    section._id === modalData.sectionId ? result : section

  );

  const updatedCourse = {
    ...course,
    courseContent: updatedCourseContent,
  };

  dispatch(setCourse(updatedCourse));
}

   setmodalData(null);
  setLoading(false);
};
 console.log("modalData",modalData)

 

  return (
    <div className="w-full max-w-2xl bg-[#161D29] text-white p-6 rounded-lg shadow-md mx-auto backdrop-blur-sm ">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-semibold">
            {view && 'Viewing'}{edit && 'Editing'}{add && 'Adding'} Lecture
        </p>
        <button
          onClick={() => {
           
            if (!loading) setmodalData(null)
          }}
          className="text-2xl text-white hover:text-red-500"
        >
          <RxCross2 />
        </button>
      </div>

       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         <Upload
             name="lectureVideo"
             label="Lecture Video"
             register={register}
             setValue={setValue}
             getValues={getValues}
             errors={errors}
             video={true}
             viewData={view ? modalData.videoUrl : null}
             editData={edit ? modalData.videoUrl : null}
             isRequired={!edit}  
         />
 
        <div>
          <label className="text-[#F1F1F1]">
            Lecture Title <sup className="text-red-500">*</sup>
          </label>
          <input
            {...register('lectureTitle', { required: true })}
            placeholder="Enter Lecture Title"
            className="w-full p-2 rounded bg-[#2C333F] text-white mt-1"
          />
          {errors.lectureTitle && (
            <span className="text-[#FF6B6B] text-sm">
              Lecture Title is required
            </span>
          )}
        </div>

        <div>
          <label className="text-[#F1F1F1]">
            Lecture Description <sup className="text-red-500">*</sup>
          </label>
          <textarea
            id="lectureDesc"
            {...register('lectureDesc', { required: true })}
            placeholder="Enter Lecture Description"
            className="w-full p-2 rounded bg-[#2C333F] text-white mt-1"
          />
          {errors.lectureDesc && (
            <span className="text-[#FF6B6B] text-sm">
              Lecture Description is required
            </span>
          )}
        </div>

        {!view && (
          <div className="text-right">
            <IconButton
              type="submit"
              text={loading ? 'Loading...' : edit ? 'Save Changes' : 'Save'}
            />
          </div>
        )}
      </form>
    </div>
  )
}

