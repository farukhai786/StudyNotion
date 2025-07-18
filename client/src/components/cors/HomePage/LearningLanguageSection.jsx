import React from 'react'
import HighlightText from './HighlightText'
import LearningLogo1 from '../../../assets/Frame 55.png'
import LearningLogo2 from '../../../assets/Frame 57.png'
import LearningLogo3 from '../../../assets/Frame 56.png'
 
    import CTButton from '../HomePage/Button'
export default function LearningLanguageSection() {
  return (
    <div className='w-10/12 flex flex-col items-center justify-center'>
        <div className='w-11/12 flex flex-col items-center justify-center gap-14'>
            <div className='flex flex-col gap-3 mx-auto'>
                <div className=' w-9/12 text-center mx-auto font-sans leading-10 text-3xl'>
                    Your swiss knife for 
                   <HighlightText text={"learning any language "}/>
                </div>
                <div className='w-9/11 text-center mx-auto  text-[16px] leading-6 font-semibold'>
                   Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more. 
                </div>
            </div>
             <div className='flex flex-row items-center justify-center'>
                 <div className=' object-contain -mr-25'>
                    <img src={LearningLogo1}/> 
                 </div>
                 <div className='object-contain'>
                    <img src={LearningLogo3}/> 
                 </div>
                 <div className=' object-contain -ml-30'>
                    <img src={LearningLogo2}/> 
                 </div>
             </div>
                <CTButton active={true} linkto={"/signup"}>
                    <div className='flex justify-center '>
                        Learn More
                    </div>
                </CTButton>
              <div></div>
        </div>
    </div>
  )
}
