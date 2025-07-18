const Course = require("../Models/Course");
const RatingAndReview = require("../Models/RatingAndReview");
const ExpressError = require("../Utils/ExpressError");
const mongoose = require("mongoose");


exports.createRatingAndReview = async (req, res) => {
  const userId = req.user.id;
  const { courseId, rating, review } = req.body;

  if (!courseId || !rating || !review) {
    throw new ExpressError(400, "सभी fields ज़रूरी हैं।");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ExpressError(404, "Course नहीं मिला।");
  }

  const isEnrolled = course.studentsEnrolled.includes(
    new mongoose.Types.ObjectId(userId)
  );
  if (!isEnrolled) {
    throw new ExpressError(403, "आप इस course में enrolled नहीं हो।");
  }

  const alreadyReviewed = await RatingAndReview.findOne({
    user: userId,
    course: courseId,
  });
  if (alreadyReviewed) {
    throw new ExpressError(400, "आप पहले ही review दे चुके हो।");
  }

  const newReview = await RatingAndReview.create({
    user: userId,
    course: courseId,
    rating,
    review,
  });

  course.ratingAndReviews.push(newReview._id);
  await course.save();

  res.status(200).json({
    success: true,
    message: "Review add कर दिया गया।",
    data: newReview,
  });
};

// ✅ Get All Ratings and Reviews
exports.getAllReatingAndReview = async (req, res) => {
  const allReviews = await RatingAndReview.find({})
    .populate({
      path: "user",
      select: "FirstName LastName email image",
    })
    .populate({
      path: "course",
      select: "courseName",
    })
    .sort({ rating: "desc" });

  res.status(200).json({
    success: true,
    message: "सभी ratings और reviews लोड हो गए।",
    data: allReviews,
  });
};

// ✅ Get Average Rating
exports.getAverageRating = async (req, res) => {
  const { courseId } = req.body;

  if (!courseId) {
    throw new ExpressError(400, "Course ID ज़रूरी है।");
  }

  const result = await RatingAndReview.aggregate([
    {
      $match: {
        course: new mongoose.Types.ObjectId(courseId),
      },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  const averageRating = result.length === 0 ? 0 : result[0].averageRating.toFixed(2);

  res.status(200).json({
    success: true,
    message: "Average rating निकाल लिया गया।",
    averageRating,
  });
};
