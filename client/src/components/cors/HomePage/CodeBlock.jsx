import CTAButton from "../HomePage/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";

export default function CodeBlock({
  position,
  heading,
  subHeading,
  ctabtn1,
  ctabtn2,
  codeColor,
  BlockCode
}) {
  return (
   <div
  className={`flex flex-col-reverse lg:flex-row ${position} my-20 items-center justify-center gap-10 w-11/12 mx-auto`}
>

  <div className=" w-full lg:w-1/2 flex flex-col gap-5 text-center lg:text-left">
    {heading}

    <p className="font-medium text-sm sm:text-base leading-6 tracking-normal text-[#838894] lg:w-[486px] sm:w-[600px] mx-auto lg:mx-0">
      {subHeading}
    </p>


    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 justify-center lg:justify-start">
      <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
        <div className="flex gap-2 items-center justify-center ">
          {ctabtn1.btnText}
          <FaArrowRightLong />
        </div>
      </CTAButton>

      <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
        {ctabtn2.btnText}
      </CTAButton>
    </div>
  </div>


  <div className="w-full lg:w-[534px] h-auto max-w-full bg-[#131c2c] rounded-md border border-white/10 overflow-hidden text-sm">
    <div className="flex max-h-[270px] overflow-auto py-3">
    
      <div className="flex flex-col w-10 text-[#838894] font-sans items-end pr-3 pl-2 text-xs">
        {[...Array(11)].map((_, i) => (
          <p key={i}>{i + 1}</p>
        ))}
      </div>

   
      <div
        className={`flex-1 flex lg:flex-col gap-1 text-[10px] leading-[16px] font-mono tracking-normal ${codeColor} pr-2 text-left break-words text-sm`}
      >
        <TypeAnimation
          sequence={[BlockCode, 10000, ""]}
          repeat={Infinity}
          cursor={true}
          style={{
            whiteSpace: "pre-line",
            display: "block",
            height: "100%",
            
          }}
        />
      </div>
    </div>
  </div>
</div>

  );
}
