const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
  courseName: String,
  courseDescription: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  whatYouWillLearn: String,
  courseContent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  ratingAndReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "RatingAndReview" }],
  price: Number,
  thumbnail: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  tag: [String],
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  status: { type: String, enum: ["Draft", "Published"] },
  instructions: [String],
  
},{ timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);

