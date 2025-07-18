// controllers/courseProgress.js
const CourseProgress = require("../Models/courseProgres"); // ✅ correct folder & spelling
const SubSection = require("../Models/SubSection");
const ExpressError = require("../Utils/ExpressError");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;


  const subSection = await SubSection.findById(subSectionId);
  if (!subSection) {
    throw new ExpressError(404, "Invalid SubSection");
  }


  const courseProgress = await CourseProgress.findOne({ courseId, userId });
  if (!courseProgress) {
    throw new ExpressError(404, "Course Progress does not exist");
  }


  const alreadyDone = courseProgress.completedVideos.some(
    (id) => id.toString() === subSectionId
  );
  if (alreadyDone) {
    throw new ExpressError(400, "Sub-section already marked as completed");
  }

 
  courseProgress.completedVideos.push(subSectionId);
  await courseProgress.save();
  console.log("✅ Sub-section marked complete");

  return res.status(200).json({
    success: true,
    message: "Sub-section marked as completed",
    data: courseProgress,
  });
};

