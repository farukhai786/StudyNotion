import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

// ─── Components ─────────────────────────────────────────────
import Footer from "../components/commen/Footer";
import CourseDetailsCard from "../components/cors/Course/CourseDetailsCard";
import ConfirmationModal from "../components/commen/ConfirmationModal";
import RatingStars from "../components/commen/RatingStars";

// ─── Icons ─────────────────────────────────────────────────
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { FaRegClock, FaGlobe } from "react-icons/fa";

// ─── Redux actions ─────────────────────────────────────────
import { buyCourse } from "../servises/operation/studentFeatureAp";
import { addToCart } from "../slices/cartSlice";
import { setPaymentLoading } from "../slices/courseSlice";

// ─── Utilities ─────────────────────────────────────────────
import { apiConnector } from "../servises/apiconnector";
import { courseEndpoints } from "../servises/apis";
import getAvgRating from "../utils/avgRating";
import { formatDate } from "../servises/formatDate";
import { ACCOUNT_TYPE } from "../utils/constants";

const { GET_COURSE_DETAILS_API } = courseEndpoints;

export default function CourseDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.course);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [activeSections, setActiveSections] = useState([]);

  // ─── 1. Fetch course details ──────────────────────────────
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const { data } = await apiConnector("POST", GET_COURSE_DETAILS_API, {
          courseId,
        });
        setCourse(data?.data);
      } catch (error) {
        console.error("Failed to load course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  // ─── 2. Average Rating ────────────────────────────────────
  useEffect(() => {
    if (course?.ratingAndReviews?.length) {
      setAvgReviewCount(getAvgRating(course.ratingAndReviews));
    }
  }, [course]);

  // ─── 3. Total Lectures Count ──────────────────────────────
  useEffect(() => {
    if (course?.courseContent?.length) {
      const total = course.courseContent.reduce(
        (acc, section) => acc + (section?.subSection?.length || 0),
        0
      );
      setTotalNoOfLectures(total);
    }
  }, [course]);

  // ─── 4. Initialize Accordion ──────────────────────────────
  useEffect(() => {
    if (course?.courseContent?.length) {
      setActiveSections(course.courseContent.map(() => false));
    }
  }, [course]);

  // ─── Toggle Section Expand/Collapse ───────────────────────
  const toggleSection = (idx) => {
    setActiveSections((prev) =>
      prev.map((open, i) => (i === idx ? !open : open))
    );
  };

  const expandAll = () =>
    setActiveSections(course?.courseContent?.map(() => true) || []);
  const collapseAll = () =>
    setActiveSections(course?.courseContent?.map(() => false) || []);

  const promptLogin = (text2 = "Please login to continue") => {
    setConfirmationModal({
      text1: "You are not logged in",
      text2,
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  // ─── Buy Course ───────────────────────────────────────────
  const handleBuyCourse = async () => {
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      return toast.error("Instructors cannot buy courses");
    }
    if (!token) return promptLogin("Please login to purchase the course");

    dispatch(setPaymentLoading(true));
    await buyCourse(token, [courseId], user, navigate, dispatch);
    dispatch(setPaymentLoading(false));
  };

  // ─── Add to Cart ──────────────────────────────────────────
  const handleAddToCart = () => {
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      return toast.error("Instructors cannot buy courses");
    }
    if (!token) return promptLogin("Please login to add to cart");

    dispatch(addToCart(course));
  };

  // ─── Early UI Return ──────────────────────────────────────
  if (loading) return <p className="text-white text-center">Loading…</p>;
  if (!course) return <p className="text-white text-center">Course not found</p>;

  // ─── Destructure Course Data ──────────────────────────────
  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent = [],
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
    language,
    videoHours,
    totalDuration = "0s",
    category,
  } = course;

  return (
   <div className="text-white">
  {/* ─── Course Header ─────────────────────────────── */}
  <div className="bg-[#161D29]">
    <div className="w-11/12 max-w-[1280px] mx-auto py-6 flex flex-col gap-5 relative">
      <div className="text-xs sm:text-sm text-gray-400">
        Home / Learning / <span className="text-yellow-400">{category?.name}</span>
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{courseName}</h1>
      <p className="text-gray-400 text-xs sm:text-sm md:text-base">{courseDescription}</p>

      <div className="flex flex-wrap items-center gap-2 text-yellow-400 text-sm sm:text-base">
        <span>{avgReviewCount.toFixed(1)}</span>
        <RatingStars Review_count={avgReviewCount} Star_size={20} />
        <span className="text-gray-400 text-xs sm:text-sm">
          ({ratingAndReviews?.length || 0} ratings) {studentsEnrolled?.length || 0} students enrolled
        </span>
      </div>

      <p className="text-xs sm:text-sm text-gray-400">
        Created by {instructor?.FirstName} {instructor?.LastName}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-gray-400 text-xs sm:text-sm">
        <span className="flex items-center gap-1">
          <FaRegClock /> {formatDate(createdAt)}
        </span>
        <span className="flex items-center gap-1">
          <FaGlobe /> {language || "English"}
        </span>
      </div>


      <div className="w-full md:w-fit">
        <CourseDetailsCard
          thumbnail={thumbnail}
          price={price}
          handleAddToCart={handleAddToCart}
          handleBuyCourse={handleBuyCourse}
          paymentLoading={paymentLoading}
          videoHours={videoHours}
          confirmationModal={confirmationModal}
          course={course}
          navigate={navigate}
        />
      </div>
    </div>
  </div>


  <div className="w-11/12 max-w-[1280px] mx-auto mt-6">
    <p className="text-lg sm:text-xl font-bold mb-2">What You Will Learn</p>
    <p className="text-gray-300 whitespace-pre-line text-xs sm:text-sm md:text-base">{whatYouWillLearn}</p>
  </div>

  <div className="w-11/12 max-w-[1280px] mx-auto mt-10">
    <p className="text-lg sm:text-xl font-bold mb-4">Course Content</p>

    <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs sm:text-sm mb-4 gap-2">
      <div className="flex flex-wrap gap-x-4 text-gray-400">
        <span>{courseContent.length} sections</span>
        <span>{totalNoOfLectures} lectures</span>
        <span>{totalDuration}</span>
      </div>

      <div className="flex gap-2 flex-1/2">
        <button onClick={expandAll} className="text-yellow-50 font-medium hover:underline text-xs sm:text-sm">Expand all</button>
        <button onClick={collapseAll} className="text-yellow-50 font-medium hover:underline text-xs sm:text-sm">Collapse all</button>
      </div>
    </div>

    <div className="lg:max-w-[640px] rounded border border-[#424854] overflow-hidden">
      {courseContent.map((section, idx) => {
        const isOpen = activeSections[idx];

        return (
          <div key={section._id} className="divide-y divide-[#424854] border-b border-[#424854]">
            <div
              className="flex justify-between items-center bg-[#2C333F] px-4 py-3 cursor-pointer"
              onClick={() => toggleSection(idx)}
            >
              <div className="flex items-center gap-2">
                <IoIosArrowDown
                  size={18}
                  className={`text-[#F1F2FF] transform transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
                <span className="text-sm sm:text-base font-semibold text-[#F1F2FF]">
                  {section.sectionName}
                </span>
              </div>

              <span className="text-yellow-50 text-xs sm:text-sm whitespace-nowrap">
                {section.subSection.length} lectures • {section.sectionDuration || "0m"}
              </span>
            </div>

            {isOpen && (
              <ul>
                {section.subSection.map((sub) => (
                  <li key={sub._id} className="flex items-start py-3 px-6 text-xs sm:text-sm">
                    <HiOutlineDesktopComputer className="mt-0.5 text-[#C5C7D4]" />
                    <span className="ml-3 text-[#C5C7D4]">{sub.title}</span>
                    {sub.duration && (
                      <span className="ml-auto text-[10px] sm:text-xs text-gray-400">{sub.duration}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  </div>


  <div className="mt-20">
    <Footer />
  </div>


  {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
</div>


  );
}
