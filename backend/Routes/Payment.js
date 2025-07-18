
const express = require("express");
const router = express.Router();
const wrapAsync = require("../Utils/wrapAsync")
// Middleware to verify token
const { auth, isStudent} = require("../Middlewers/auth");

// Controllers
const {
  capturePayment,
  verifySignature,
  sendPaymentSuccessEmail,
} = require("../Controllers/Payment");

// 👉 Create Razorpay order
router.post("/capturePayment", auth, isStudent, wrapAsync(capturePayment));

// 👉 Webhook to verify Razorpay signature
router.post("/verifySignature",auth, isStudent, wrapAsync(verifySignature));
router.post("/sendPaymentSuccessEmail" ,auth, isStudent, wrapAsync(sendPaymentSuccessEmail))

router.post("/enrollStudents",auth, isStudent, wrapAsync(verifySignature));

module.exports = router;
