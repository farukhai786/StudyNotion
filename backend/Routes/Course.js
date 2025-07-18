const express = require("express");
const router = express.Router();
const upload = require("../Middlewers/multer");
const wrapAsync = require("../Utils/wrapAsync")
// Controllers
const {
  createCourse, 
  getAllCourses,
  getCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  getFullCourseDetails
} = require("../Controllers/Course");

const {
  createSubSection,
  UpdateSubSection,
  deleteSubSection,
} = require("../Controllers/subSection");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../Controllers/Section");

const {
  createCatagory,
  showAllCategories,
  categoryPageDetails,
} = require("../Controllers/Catagory");

const {
  createRatingAndReview,
  getAverageRating,
  getAllReatingAndReview,
} = require("../Controllers/RatingAndReview");
const { updateCourseProgress } = require("../Controllers/courseProgresh");
// Middleware
const { auth, isInstructor, isStudent, isAdmin } = require("../Middlewers/auth");

// -------- ROUTES ---------- //
router.post("/update-progress", auth, updateCourseProgress);
// Course
router.post("/createCourse", auth, isInstructor, upload.single("thumbnail"), wrapAsync(createCourse));
router.post("/editCourse", auth, upload.single("thumbnail"), wrapAsync(editCourse));
router.get("/getAllCourses", wrapAsync(getAllCourses));
router.post("/getCourseDetails", wrapAsync(getCourseDetails));
router.get("/getInstructorCourses", auth, isInstructor, wrapAsync(getInstructorCourses));
router.post("/deleteCourse", auth, isInstructor, wrapAsync(deleteCourse));
router.post("/getFullCourseDetails", auth, wrapAsync(getFullCourseDetails));


// Section
router.post("/addSection", auth, isInstructor, wrapAsync(createSection));
router.put("/updateSection", auth, isInstructor, wrapAsync(updateSection));
router.post("/deleteSection", auth, isInstructor, wrapAsync(deleteSection));


// SubSection
router.post("/addSubSection", auth, isInstructor, upload.single("lectureVideo"), wrapAsync(createSubSection));
router.post("/updateSubSection", auth, isInstructor, upload.single("lectureVideo"), wrapAsync(UpdateSubSection));
router.post("/deleteSubSection", auth, isInstructor, wrapAsync(deleteSubSection));

// Category
router.post("/createCatagory", auth, isAdmin, wrapAsync(createCatagory));
router.get("/showAllCategories", wrapAsync(showAllCategories));
router.post("/getCategoryPageDetails", wrapAsync(categoryPageDetails));

// Rating & Review
router.post("/createRating", auth, isStudent, wrapAsync(createRatingAndReview));
router.get("/getAverageRating", wrapAsync(getAverageRating));
router.get("/getReviews", wrapAsync(getAllReatingAndReview));




module.exports = router;
