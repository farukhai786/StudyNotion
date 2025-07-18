import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "video-react/dist/video-react.css";
import { Player, LoadingSpinner, ControlBar } from "video-react";

import IconBtn from "../../commen/iconButton";
import { markLectureAsComplete } from "../../../servises/operation/viewCourseApi";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef(null);

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  );

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!courseSectionData.length || !sectionId || !subSectionId) return;

    const section = courseSectionData.find((sec) => sec._id === sectionId);
    const video = section?.subSection.find((sub) => sub._id === subSectionId);

    if (!section || !video) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    if (video._id !== videoData?._id) {
      setVideoData(video);
      setVideoEnded(false);
    }
  }, [courseSectionData, sectionId, subSectionId, navigate]);

  const isFirstVideo = () => {
    const secIdx = courseSectionData.findIndex((sec) => sec._id === sectionId);
    if (secIdx !== 0) return false;
    const subIdx = courseSectionData[0].subSection.findIndex(
      (sub) => sub._id === subSectionId
    );
    return subIdx === 0;
  };

  const isLastVideo = () => {
    const secIdx = courseSectionData.findIndex((sec) => sec._id === sectionId);
    if (secIdx === -1) return false;
    const arr = courseSectionData[secIdx].subSection;
    const subIdx = arr.findIndex((sub) => sub._id === subSectionId);
    return (
      secIdx === courseSectionData.length - 1 && subIdx === arr.length - 1
    );
  };

  const goToNextVideo = () => {
    const secIdx = courseSectionData.findIndex((sec) => sec._id === sectionId);
    const arr = courseSectionData[secIdx].subSection;
    const subIdx = arr.findIndex((sub) => sub._id === subSectionId);

    if (subIdx < arr.length - 1) {
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${
          arr[subIdx + 1]._id
        }`
      );
    } else if (secIdx < courseSectionData.length - 1) {
      const nextSec = courseSectionData[secIdx + 1];
      navigate(
        `/view-course/${courseId}/section/${nextSec._id}/sub-section/${nextSec.subSection[0]._id}`
      );
    }
  };

  const goToPrevVideo = () => {
    const secIdx = courseSectionData.findIndex((sec) => sec._id === sectionId);
    const arr = courseSectionData[secIdx].subSection;
    const subIdx = arr.findIndex((sub) => sub._id === subSectionId);

    if (subIdx > 0) {
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${
          arr[subIdx - 1]._id
        }`
      );
    } else if (secIdx > 0) {
      const prevSec = courseSectionData[secIdx - 1];
      const lastSub = prevSec.subSection[prevSec.subSection.length - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSec._id}/sub-section/${lastSub}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    try {
      const res = await markLectureAsComplete({ courseId, subSectionId }, token);
      if (res) dispatch(updateCompletedLectures(subSectionId));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const isCompleted =
    Array.isArray(completedLectures) &&
    completedLectures.map(String).includes(String(subSectionId));

  const handleEnded = () => {
    setVideoEnded(true);
    setTimeout(() => {
      document.getElementById("after-video-ui")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 300);
  };

  const handleRewatch = () => {
    const player = playerRef.current;
    if (!player) return;
    player.seek(0);
    player.play();
    setVideoEnded(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {!videoData ? (
        <p className="text-center text-white">No Data Found</p>
      ) : (
        <div className="relative w-full h-[500px] ">
         <div className="relative w-full h-[500px] flex items-center justify-center">
  <Player
    ref={playerRef}
    src={videoData.videoUrl}
    playsInline
    onEnded={handleEnded}
    fluid={false}
    width="100%"
    height="100%"
  >
    <LoadingSpinner />
    <ControlBar autoHide hideOnMouseLeave />
  </Player>

  {videoEnded && (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6  backdrop-blur-sm">
      {/* Buttons */}
    </div>
  )}
</div>


          {videoEnded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6  backdrop-blur-sm">
              <div className="flex gap-4">
                {!isCompleted && (
                  <IconBtn
                    disabled={loading}
                    onClick={handleLectureCompletion}
                    customClasses="blackButton"
                  >
                    {loading ? "Loading…" : "Mark As Completed"}
                  </IconBtn>
                )}
                <IconBtn
                  disabled={loading}
                  onClick={handleRewatch}
                  customClasses="yellowButton"
                >
                  Rewatch
                </IconBtn>
              </div>

              <div className="flex gap-4">
                {!isFirstVideo() && (
                  <IconBtn
                    disabled={loading}
                    onClick={goToPrevVideo}
                    customClasses="blackButton"
                  >
                    Prev
                  </IconBtn>
                )}
                {!isLastVideo() && (
                  <IconBtn
                    disabled={loading}
                    onClick={goToNextVideo}
                    customClasses="blackButton"
                  >
                    Next
                  </IconBtn>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <h1 className="text-xl font-semibold text-[#F1F2FF]">
        {videoData?.title}
      </h1>
      <p className="text-[#AFB2BF]">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
