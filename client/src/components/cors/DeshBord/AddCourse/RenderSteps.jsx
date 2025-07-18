import React from 'react';
import { useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import PublishCourse from './PublishCourse/index';
import CourseInformationForm from './CourseInformation/CourseInformation';
import CourseBuilder from '../AddCourse/CourseBuilder/CourseBuilder';

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: 'Course Information' },
    { id: 2, title: 'Course Builder' },
    { id: 3, title: 'Publish' },
  ];

  const tips = [
    "Set the Course Price option or make it free.",
    "Standard size for the course thumbnail is 1024×576.",
    "Video section controls the course overview video.",
    "Course Builder is where you create & organize a course.",
    "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
    "Information from the Additional Data section shows up on the course single page.",
    "Make Announcements to notify any important",
    "Notes to all enrolled students at once.",
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-10 justify-between w-full">
      
   
      <div className="flex-1 flex flex-col gap-6">
        
       
        <div className="flex justify-between items-center px-4 py-6">
          {steps.map((item, index) => (
            <React.Fragment key={item.id}>
           
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border text-sm font-medium
                    ${
                      step > item.id
                        ? 'bg-[#FFD60A] text-black border-[#FFD60A]'
                        : step === item.id
                          ? 'border-2 border-[#FFD60A] text-[#FFD60A]'
                          : 'bg-[#2C333F] text-[#6C757D] border-[#424854]'
                    }`}
                >
                  {step > item.id ? <FaCheck className="text-xs" /> : item.id}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    step >= item.id ? 'text-white' : 'text-[#6C757D]'
                  }`}
                >
                  {item.title}
                </span>
              </div>

            
              {index !== steps.length - 1 && (
                <div className="flex-1 border-t border-dashed border-[#FFD60A] mx-2"></div>
              )}
            </React.Fragment>
          ))}
        </div>

      
        <div className="w-full">
          {step === 1 && <CourseInformationForm />}
          {step === 2 && <CourseBuilder />}
          {step === 3 && <PublishCourse />}
        </div>
      </div>

     
      <div className="w-full lg:w-[40%]">
        <div className="rounded-lg bg-[#2C333F] border border-[#424854] p-6 text-[#F1F2FF]">
          <h2 className="text-lg font-semibold mb-4">
            <span className="mr-2">⚡</span>Course Upload Tips
          </h2>
          <div className="space-y-2">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="mt-[2px] text-[#F1F2FF] text-[12px] font-medium leading-5">•</span>
                <span className="text-[#F1F2FF] text-[12px] font-medium leading-5 tracking-normal">
                  {tip}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderSteps;
