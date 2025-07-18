const Section = require("../Models/Section")

const Course = require("../Models/Course");
const ExpressError = require("../Utils/ExpressError");

exports.createSection = async (req, res, next) => {
  const { sectionName, courseId } = req.body;

  if (!sectionName || !courseId) {
    throw new ExpressError(400, "sectionName and courseId are required");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ExpressError(404, "Course not found");
  }

  const newSection = await Section.create({
    sectionName,
    subSection: [],
  });

  course.courseContent.push(newSection._id);
  await course.save();

  const populatedCourse = await Course.findById(courseId).populate({
    path: "courseContent",
    populate: { path: "subSection" },
  });

  return res.status(201).json({
    success: true,
    message: "Section created",
    course: populatedCourse,
  });
};


exports.updateSection = async (req, res, next) => {
  const { sectionName, sectionId, courseId } = req.body;

  if (!sectionName || !sectionId || !courseId) {
    throw new ExpressError(400, "All fields are required");
  }

  await Section.findByIdAndUpdate(
    sectionId,
    { sectionName },
    { new: true }
  );

  const updatedCourse = await Course.findById(courseId)
    .populate({
      path: "courseContent",
      populate: { path: "subSection" },
    });

  return res.status(200).json({
    success: true,
    message: "Section updated successfully",
    course: updatedCourse,
  });
};




exports.deleteSection = async (req, res, next) => {
  const { sectionId, courseId } = req.body;

  if (!sectionId || !courseId) {
    throw new ExpressError(400, "sectionId and courseId are required");
  }

  await Section.findByIdAndDelete(sectionId);

  await Course.findByIdAndUpdate(
    courseId,
    { $pull: { courseContent: sectionId } },
    { new: true }
  );

  const course = await Course.findById(courseId)
    .populate({ path: "courseContent", populate: { path: "subSection" } });

  return res.status(200).json({
    success: true,
    message: "Section deleted successfully",
    course,
  });
};




