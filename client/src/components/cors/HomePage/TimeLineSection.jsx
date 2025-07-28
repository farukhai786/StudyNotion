import Logo1 from "../../../assets/Logo1.png";
import Logo2 from "../../../assets/Logo2.png";
import Logo3 from "../../../assets/Logo3.png";
import TimeLineSectionVideo from "../../../assets/production ID_4498202.mp4";

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
    <div className="w-11/12 mx-auto my-10">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        
   
        <div className="flex flex-col gap-6 w-full lg:w-[410px]">
          {timeline.map((element, index) => (
            <div className="flex gap-4 items-start" key={index}>
              <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-md shrink-0">
                <img src={element.Logo} alt="logo" className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-semibold">{element.heading}</h2>
                <p className="text-sm text-gray-400">{element.Description}</p>
              </div>
            </div>
          ))}
        </div>

        
      <div className=" lg:w-6/12 relative ">
 
  <video
    muted
    loop
    autoPlay
    playsInline
    className=" h-auto object-cover rounded-md"
  >
    <source src={TimeLineSectionVideo} type="video/mp4" />
  </video>

 
  <div className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 
                bg-[#014A32] w-[90%] max-w-md flex justify-between items-center 
                px-6 py-3 rounded-md shadow-lg z-10">
 
  <div className="flex flex-col items-center text-white text-center">
    <p className="text-lg font-bold">10</p>
    <p className="text-xs text-[#538272] leading-tight">
      YEARS<br />EXPERIENCES
    </p>
  </div>

  <div className="h-8 w-px bg-[#538272] mx-4"></div>

  
  <div className="flex flex-col items-center text-white text-center">
    <p className="text-lg font-bold">250</p>
    <p className="text-xs text-[#538272] leading-tight">
      TYPES OF<br />COURSES
    </p>
  </div>
</div>

</div>

        
      </div>
    </div>
  );
}
