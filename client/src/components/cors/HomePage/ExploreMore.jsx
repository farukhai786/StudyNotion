import { useState } from 'react';
import HighlightText from '../HomePage/HighlightText';
import { HomePageExplore } from "../../../data/data.js"; 


const tabsName = [
  "Free",
  "New to Coding",
  "Most Popular",
  "Skill Path",
  "Career Path"
];

export default function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses); 
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0]?.heading || '');
 console.log("course",courses )
  const setMyCards = (tab) => {
    setCurrentTab(tab);
    const selectedTab = HomePageExplore.find((item) => item.tag === tab);
    setCourses(selectedTab?.courses || []);
    setCurrentCard(selectedTab?.courses[0]?.heading || '');
  };

  return (
   <div className="text-white w-11/12 max-w-maxContent mx-auto my-10">
  {/* Title */}
  <div className="text-3xl md:text-4xl font-semibold text-center">
    Unlock the <HighlightText text="Power of Code" />
  </div>
  <p className="text-center text-[#838894] text-sm md:text-base mt-3">
    Learn to build anything you can imagine
  </p>

  {/* Tabs */}
  <div className="flex flex-wrap justify-center mt-6 gap-3">
    {tabsName.map((tab, index) => (
      <button
        key={index}
        onClick={() => setMyCards(tab)}
        className={`px-4 py-2 text-sm rounded-full transition-all duration-200
          ${
            currentTab === tab
              ? "bg-white text-black font-semibold"
              : "bg-richblack-700 text-[#999DAA] border border-[#00000026] hover:bg-richblack-800"
          }`}
      >
        {tab}
      </button>
    ))}
  </div>


  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
    {courses.map((course, index) => (
      <div
        key={index}
        onClick={() => setCurrentCard(course.heading)}
        className={`cursor-pointer rounded-xl border px-6 py-6 relative transition-all duration-300
          ${
            currentCard === course.heading
              ? "bg-white text-[#585D69] border-yellow-50 shadow-[20px_20px_0px_0px_#FFD60A]"
              : "bg-[#161D29] text-[#6E727F] border-transparent"
          }`}
      >
        <h3 className="text-lg md:text-xl font-semibold">{course.heading}</h3>
        <p className="text-sm md:text-base mt-4 leading-6">{course.description}</p>

        <div className="flex flex-row items-center justify-between text-sm mt-6">
          <span className="text-[#585D69] font-sans font-semibold">
            {course.level}
          </span>
          <span className="text-[#0A5A72] font-semibold">
            {course.lessonNumber} Lessons
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
 