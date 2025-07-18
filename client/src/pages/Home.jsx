
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import  HighlightText from '../components/cors/HomePage/HighlightText'
import  CTButton from '../components/cors/HomePage/Button'
import  Banner from '../assets/video-1.mp4'
import CodeBlock from '../components/cors/HomePage/CodeBlock'

import TimeLineSection  from '../components/cors/HomePage/TimeLineSection';   
import LearningLanguageSection from '../components/cors/HomePage/LearningLanguageSection';
import InstructorSection from '../components/cors/HomePage/InstructorSection';
import ExploreMore from '../components/cors/HomePage/ExploreMore'
import ReviewSlider from "../components/commen/ReviewSlider"
import Footer from '../components/commen/Footer';
export default function Home() {
  return (
    <div>
      <div className=' bg-[#000000]'>
        {/* //section 1 */}
      <div className=' mask-auto flex flex-col max-w-10/12 mx-auto items-center text-white justify-center min-h-screen'>
        <Link to={'/signup'}>
          <div
            className='mt-16 p-1 mx-auto rounded-full font-bold transition-all duration-200 hover:scale-95 w-fit text-[#999DAA] bg-[#161D29]'
          
          >
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200'>
              Become an Instructor
              <FaArrowRightLong />
            </div>
          </div>
        </Link>

        <div className='text-4xl text-center font-semibold mt-7'>
          Empower Your Future With
          <HighlightText text={"Coding Skills"} />
        </div>
        <div
          className='text-center w-[70%] max-w-max text-gray-400 font-medium text-base leading-6 tracking-normal'
          
        >
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>



        <div className='flex flex-row gap-7 mt-8'>
          <CTButton active={true} linkto={"/signup"}>
            Learn More
          </CTButton>
          <CTButton active={false} linkto={"/login"}>
            Book a Demo
          </CTButton>
        </div>

        <div className='mx-3 my-12 shadow-blue-200' style={{ boxShadow: '20px 20px 0px 0px rgba(245, 245, 245, 1)' }}>
          <video muted loop autoPlay playsInline className=" w-full max-w-[900px] mx-auto">
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        {/*sectioncode1*/}
        <div>
          <CodeBlock 
           position={"lg:flex-row"}
           heading={
           <div className="w-[486px] h-[88px] font-inter font-semibold text-[36px] leading-[44px] tracking-[-0.02em]" style={{ fontFamily: 'Inter' }}
>
     Unlock your <HighlightText text={"coding potential"} /> with our online courses.
</div>


           } 
         subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
          ctabtn1={
            {
              btnText:"Try it Yourself",
              linkto: "/singup",
              active:true
            }

            
          }
           ctabtn2={
            {
              btnText:"Try it Yourself",
              linkto: "/singup",
              active:false
            }}

               BlockCode={
                   `<!DOCTYPE html>\n</html>\n head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n /head>
                   body>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two<\n a><ahref="three/">Three</a>\n/nav>
                   `
               }

               codeColer={" text-yellow-25"}
          />
       

        
        </div>
        {/*sectioncode1-reverse*/}
         <div>
             <CodeBlock 
              position={"lg:flex-row-reverse"}
              heading={
              <div className="w-[486px] h-[88px] font-inter font-semibold text-[36px] leading-[44px] tracking-[-0.02em]" style={{ fontFamily: 'Inter' }}
              >
                Unlock your <HighlightText text={"coding potential"} /> with our online courses.
              </div>


              } 
            subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
             ctabtn1={
               {
              btnText:"Try it Yourself",
              linkto: "/singup",
              active:true
            }

            
          }
           ctabtn2={
            {
              btnText:"Try it Yourself",
              linkto: "/singup",
              active:false
            }}

               BlockCode={
                   `<!DOCTYPE html>\n</html>\n head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n /head>
                   body>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two<\n a><ahref="three/">Three</a>\n/nav>
                   `
               }

               codeColer={" text-yellow-25"}
          />
        </div>
          
          <div>
            <ExploreMore/>
          </div>

      </div>
      </div>
       

    {/* section 2 */}
       <div className='bg-[#F9F9F9] text-[#2C333F]'>
               <div className='h-[320px] flex items-center justify-center bg-image'>
                 <div className='flex flex-row gap-5'>
                   <CTButton active={true} linkto={"/signup"}>
                     <div className='flex items-center gap-3'>
                       Explore Full Catalog
                       <FaArrowRightLong />
                     </div>
                   </CTButton>
                   <CTButton active={false} linkto={"/signup"}>
                     <div>Learn More</div>
                   </CTButton>
                 </div>
               </div>

              <div className='mx-auto  max-w-10/12 flex flex-col items-center justify-between gap-7 mt-16'>
                   <div className='flex flex-row gap-10 justify-center'>
                     
               
                     <div className=' text-4xl font-semibold w-[40%] items-end '>
                       Get the skills you need for a  
                       <HighlightText text={" job that is in demand."} />
                     </div>
                     
                   
                     <div className='flex flex-col gap-10  w-[40%] items-start '>
                       <p className='text-[14px] text-richblack-300  text-left font-sans leading-5 text-[#2C333F]'>
                         The modern StudyNotion dictates its own terms. Today, to be a
                         competitive specialist requires more than professional skills.
                       </p>
                       <CTButton active={true} linkto={"/signup"}>
                         <div>Learn More</div>
                       </CTButton>
                     </div>
                     
                   </div>
    
                   <TimeLineSection/>
                   <LearningLanguageSection/>
              </div>
       </div>

  
       <div className=' bg-black mx-auto'>
          <div className=' mx-auto flex flex-col items-center justify-between text-white '>
          <InstructorSection />
           <ReviewSlider/>
         </div>
       </div>
       <Footer></Footer>

    </div>
  );
}
