import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import IconBtn from "../../commen/iconButton";
import CourseReviewModal from "../../cors/ViewCourse/CourseReviewModal";
import { FaPlay, FaCheck } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";
import { FaLongArrowAltLeft } from "react-icons/fa";
const VideoDetailsSidebar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [activeSub, setActiveSub] = useState("");
  const [reviewModal, setReviewModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const scrollRef = useRef(null);

  const {
    courseSectionData = [],
    courseEntireData,
    totalNoOfLectures,
    completedLectures = [],
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData.length) return;

    const sec = courseSectionData.find((s) => s._id === sectionId) || courseSectionData[0];
    const sub = sec.subSection.find((s) => s._id === subSectionId) || sec.subSection[0];

    setActiveSection(sec._id);
    setActiveSub(sub._id);

    setTimeout(() => {
      scrollRef.current?.querySelector(".is-active")?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }, 0);
  }, [courseSectionData, location.pathname, sectionId, subSectionId]);
const secMinutes = (sec) =>
  Array.isArray(sec.subSection)
    ? sec.subSection.reduce((m, s) => m + Number(s.timeDuration || 0), 0)
    : 0;
 
    
  const classCompleted = (id) =>
    completedLectures.map(String).includes(String(id));

  return (
    <>
      <aside
        ref={scrollRef}
        className="w-72 h-screen overflow-y-auto bg-[#161D29] text-[#F1F2FF]  "
      >
        {/* Top Controls */}
        <div className="flex items-center justify-between m-3">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="text-lg p-1 rounded-full hover:bg-slate-700/50"
          >
             <FaLongArrowAltLeft />
          </button>

          <IconBtn
            text="Add Review"
            onClick={() => setReviewModal(true)}
            customClasses="bg-yellow-400 text-black hover:bg-yellow-300 px-4 py-1  text-sm"
          />
        </div>

        {/* Course Info */}
        <div className="mb-7 m-3 py-3">
          <p className="font-semibold truncate">{courseEntireData?.courseName}</p>
          <p className="text-xs text-slate-400">
            {completedLectures.length} / {totalNoOfLectures} completed
          </p>
        </div>

    
        {courseSectionData.map((sec) => (
          <div key={sec._id} className="mb-2">
       
            <button
              onClick={() =>
                setActiveSection((prev) => (prev === sec._id ? "" : sec._id))
              }
              className={`w-full flex items-center justify-between px-3 py-2 
                ${activeSection === sec._id ? "bg-[#424854]" : "bg-[#374151]"}
                hover:bg-[##424854] transition-colors `}
            >
              <span className="text-sm font-medium truncate">{sec.sectionName}</span>
              <div className="flex items-center gap-2">
              
                <IoIosArrowDown
                  size={18}
                  className={`transition-transform ${
                    activeSection === sec._id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

        
            {activeSection === sec._id && (
              <div className="mt-1 space-y-1">
                {sec.subSection.map((sub) => {
                  const isCompleted = classCompleted(sub._id);
                  const isActive = activeSub === sub._id;

                  return (
                    <button
                      key={sub._id}
                      onClick={() => {
                        setActiveSub(sub._id);
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${sec._id}/sub-section/${sub._id}`
                        );
                      }}
                      className={`w-full flex items-center gap-5 px-4 py-2 text-left  text-[#6E727F]
                        ${isActive ? "bg-[#2C333F]  font-semibold is-active" : ""}
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          readOnly
                          checked={isCompleted}
                          className="accent-sky-400"
                        />
                        <span
                          className="text-sm truncate "
                          
                          
                        >
                          {sub.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                    
                        <span className="text-slate-400"><FiMonitor className=" size-3.5 bg-blac"/></span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </aside>

      {reviewModal && (
        <CourseReviewModal
          setReviewModal={setReviewModal}
          courseId={courseEntireData._id}
        />
      )}
    </>
  );
};

export default VideoDetailsSidebar;
