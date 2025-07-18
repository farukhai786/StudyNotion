import Logo1 from "../../../assets/Logo1.png";
import Logo2 from "../../../assets/Logo2.png";
import Logo3 from "../../../assets/Logo3.png";
import TimeLineSectionVideo from "../../../assets/production ID_4498202.mp4"
const timeline = [
  {
    Logo: Logo1, 
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority.",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skill.",
  },
  {
    Logo: Logo1,
    heading: "Solve the problem",
    Description: "Code your way to a solution.",
  },
];


export default function TimeLineSection() {
  return (
    <div>
          <div className="w-10/12 flex flex-row justify-between  mx-auto mt-10">

              <div className="flex flex-col w-[410px] h-[432px] gap-8 ">
                     {
                      timeline.map((element, index)=>{
                           return(
                              <div className='flex  flex-row gap-6' key={index}>
                                  <div className='w-[50px] h-[50px] bg-white flex  items-center justify-center'>
                                     <img src={element.Logo}/> 
                                  </div>
                                  <div className='flex flex-col  gap-1 '>
                                      <h2 className=' font-sans font-medium leading-6'>{element.heading}</h2>
                                       <h2 className='leading-6 text-sm'>{element.Description}</h2>
                                  </div>
                              </div>
                           )
                      })
                     }
                  </div>
                 
                  <div className=' w-6/12 relative'>
                     
                        <video muted loop autoPlay playsInline>
                          <source src={TimeLineSectionVideo} type="video/mp4" />
                        </video>

                        <div className="bg-[#014A32] w-9/12 h-30 gap-14  absolute  translate-y-[-50%] translate-x-[25%]">
                            <div  className=" flex fles-row gap-7  justify-center">
                                <div className=" w-40 h-11 gap-6 flex flex-row ju">
                                  <p className="h-11 w-10 text-white font-sans font-bold text-4xl">20</p>
                                   <p className=" text-[#538272] text-[14px] font-medium">YEARS EXPERIENCES</p>
                                </div>
                                  <div className="w-11 border-t-2 border-emerald-100 -rotate-90 bottom-X (0, 1, 2, 4, 8,">

                          
                                  </div>
                                <div className=" w-40 h-11 gap-6 flex flex-row" >
                                  <p className="h-11 w-10 text-white font-sans font-bold text-4xl mr-2">250</p>
                                   <p className=" text-[#538272] text-[14px] font-medium">TYPES OFCOURSES</p>
                                </div>
                                
                            </div>
                        </div>
                   </div> 
          </div>    
    </div>
  );
}



