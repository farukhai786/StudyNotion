// routes/Profile.js
const { Router } = require("express");
const router = Router();
const wrapAsync = require("../Utils/wrapAsync")
// Multer for handling file uploads
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Auth middleware to get req.user
const { auth, isInstructor } = require("../Middlewers/auth"); 

// Controller functions
const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard
} = require("../Controllers/Profile");

// 👉 Update Profile
router.put("/update", auth, wrapAsync(updateProfile));

// 👉 Delete Account
router.delete("/delete", auth, wrapAsync(deleteAccount));

// 👉 Get User Details
router.get("/details", auth, wrapAsync(getAllUserDetails));

// 👉 Update Display Picture with multer for file upload
router.put("/display-picture", auth, upload.single("file"), wrapAsync(updateDisplayPicture));

// 👉 Get Enrolled Courses
router.get("/enrolled-courses", auth, getEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructor, wrapAsync(instructorDashboard))

module.exports = router;
