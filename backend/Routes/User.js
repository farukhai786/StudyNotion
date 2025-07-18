const { Router } = require("express");
const wrapAsync = require("../Utils/wrapAsync")
const {
  login,
  signUp,
  sendOtp,
  changePassword,
} = require("../Controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../Controllers/ResetPassword");

const { auth } = require("../Middlewers/auth");

const router = Router();

// Auth routes
router.post("/signup", wrapAsync(signUp));             // User registration with OTP
router.post("/sendotp", wrapAsync(sendOtp));           // Send OTP to user
router.post("/login", wrapAsync(login));               // Login user
router.post("/changepassword", auth, wrapAsync(changePassword));  // Change password (requires auth token)

// Forgot password routes
router.post("/reset-password-token", wrapAsync(resetPasswordToken)); // Send reset link/token to email
router.post("/reset-password", wrapAsync(resetPassword));              // Reset password with token

module.exports = router;
