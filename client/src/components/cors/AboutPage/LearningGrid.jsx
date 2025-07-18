import React from "react";
import CTAButton from "../HomePage/Button";
import HighlightText from "../HomePage/HighlightText";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highliteText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description: "The learning process uses the namely online and offline.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "You will get a certificate that can be used as a certification during job hunting.",
  },
  {
    order: 4,
    heading: 'Rating "Auto-grading"',
    description:
      "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
  },
];

export default function LearningGrid() {
  return (
    <div className=" max-w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  mt-20 text-white">
      {LearningGridArray.map((card, index) => {
        return (
          <div
            key={index}
            className={`

              ${index === 0 ? "lg:col-span-2 bg-transparent" : ""}
              ${card.order % 2 === 1 ? "bg-[#2C333F]" : "bg-[#161D29]"}
              ${card.order === 3 ? "lg:col-start-2" : ""}
            `}
          >
            {index === 0 ? (
              <div className="flex flex-col gap-8 text-left pr-13">
                <h1 className="text-3xl font-semibold">{card.heading}</h1>
                <HighlightText text={card.highliteText} />
                <p className="text-[16px] font-normal text-gray-300">{card.description}</p>
                <div className=" w-fit">
                  <CTAButton active={true} linkto={card.BtnLink} >
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-8 p-8 h-74 text-left leading-5.5 ">
                <h2 className=" text-[16px] font-normal pb-10">{card.heading}</h2>
                <p className="text-[16px] font-normal text-gray-400">{card.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
