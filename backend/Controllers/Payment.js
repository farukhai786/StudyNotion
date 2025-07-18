const instance = require("../Config/razorpay");
const User = require("../Models/User");
const { default: mongoose } = require("mongoose");
const { mailSender } = require("../Utils/mailSendar");
const crypto = require("crypto");
const { courseEnrollmentTemplate } = require("../Mail/Templete/courseEnrollmentEmai");
const CourseProgres = require("../Models/courseProgres");
const Course = require("../Models/Course");
const ExpressError = require("../Utils/ExpressError");


exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  if (!courses?.length) {
    throw new ExpressError(400, "Please provide Course IDs");
  }

  let totalAmount = 0;

  for (const id of courses) {
    const course = await Course.findById(id);
    if (!course) throw new ExpressError(404, `Course not found: ${id}`);

    if (course.studentsEnrolled.includes(userId)) {
      throw new ExpressError(400, `You already purchased ${course.courseName}`);
    }

    totalAmount += course.price;
  }

  const options = {
    amount: totalAmount * 100, 
    currency: "INR",
    receipt: Date.now().toString(),
  };

  try {
    const order = await instance.orders.create(options);
    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    console.error("Razorpay order error:", err);
    throw new ExpressError(500, "Could not initiate Razorpay order");
  }
};


exports.verifySignature = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courses,
  } = req.body;

  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses?.length ||
    !userId
  ) {
    throw new ExpressError(400, "Missing payment data");
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new ExpressError(400, "Payment signature verification failed");
  }


  await enrollStudents(courses, userId);

  return res.status(200).json({
    success: true,
    message: "Payment verified and enrollment successful",
  });
};


const enrollStudents = async (courses, userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ExpressError("User not found");

  for (const courseId of courses) {
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $push: { studentsEnrolled: userId } },
      { new: true }
    );
    if (!course) throw new ExpressError(`Course not found: ${courseId}`);

    const courseProgress = await CourseProgress.create({
      courseId,
      userId,
      completedVideos: [],
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: courseId,
          courseProgress: courseProgress._id,
        },
      },
      { new: true }
    );

    const emailContent = courseEnrollmentTemplate(
      user.FirstName,
      course.courseName,
      "http://your-platform.com/dashboard"
    );

    await mailSender(
      user.email,
      "Course Enrollment Confirmation",
      emailContent
    );
  }
};


exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    throw new ExpressError(400, "Please provide all the fields");
  }

  const user = await User.findById(userId);
  if (!user) throw new ExpressError(404, "User not found");

  await mailSender(
    user.email,
    "Payment Received",
    paymentSuccessEmail(
      user.FirstName,
      amount / 100,
      orderId,
      paymentId
    )
  );

  return res.status(200).json({
    success: true,
    message: "Payment confirmation email sent successfully",
  });
};





