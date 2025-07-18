const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const courseProgressSchema = new Schema(
  {
    courseId: {
      type: Types.ObjectId,
      ref: "Course",
      required: true,
    },

    userId: {
      type: Types.ObjectId,
      ref: "User",          // ✅ string model‑name
      required: true,
    },

    // keep track of all completed sub‑sections (videos / quizzes)
    completedVideos: [
      {
        type: Types.ObjectId,
        ref: "SubSection",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("CourseProgress", courseProgressSchema);
