import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import CTAButton from "../HomePage/Button";
import  HighlightText from "../HomePage/HighlightText"
import InstructorSectionImage from '../HomePage/../../../assets/IntructorSection.jpg'
export default function InstructorSection() {
  return (
            
    <div className="w-10/12 max-w-maxContent mx-auto my-20">
  <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
   
    <div className="w-full lg:w-[50%] max-w-[500px]">
      <img
        src={InstructorSectionImage}
        alt="Instructor"
        className="w-full h-auto object-cover shadow-[-20px_-20px_0px_0px_#FFFFFF]"
      />
    </div>

  
    <div className="w-full lg:w-[50%] flex flex-col gap-6 text-center lg:text-left">
      <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
        Become an <HighlightText text="Instructor" />
      </h2>

      <p className="font-medium text-sm md:text-base leading-6 tracking-normal text-[#838894] max-w-[486px] mx-auto lg:mx-0">
        Instructors from around the world teach millions of students on StudyNotion.
        We provide the tools and skills to teach what you love.
      </p>

     
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 justify-center lg:justify-start">
        <CTAButton active={true} linkto="/signup">
          <div className="flex gap-2 items-center justify-center">
            Start Teaching Today
            <FaArrowRightLong />
          </div>
        </CTAButton>
      </div>
    </div>
  </div>
</div>

    
    
  )
}
