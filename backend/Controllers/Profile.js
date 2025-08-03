


const User = require('../Models/User');
const Profile = require('../Models/Profile');
const Course = require("../Models/Course");
const CourseProgress = require("../Models/courseProgres");
const {convertSecondsToDuration} = require("../Utils/time");
const ExpressError = require("../Utils/ExpressError");

const { uploadToCloudinary } = require("../Utils/imageUploader");


exports.updateProfile = (async (req, res) => {
  const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
  const { id } = req.user;

  if (!contactNumber || !gender) {
    throw new ExpressError(400, "All fields are required");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  const profile = await Profile.findById(user.additionalDetails);

  profile.dateOfBirth = dateOfBirth;
  profile.about = about;
  profile.gender = gender;
  profile.contactNumber = contactNumber;

  await profile.save();

  const updatedUser = await User.findById(id).populate("additionalDetails").exec();

  return res.status(200).json({
    success: true,
    message: "Profile updated",
    user: updatedUser,
  });
});


exports.deleteAccount = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  await Profile.findByIdAndDelete(user.additionalDetails);
  await User.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: "User account deleted successfully",
  });
};


exports.getAllUserDetails = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).populate("additionalDetails").exec();
  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    message: "User details fetched successfully",
    user,
  });
};

exports.updateDisplayPicture = async (req, res) => {
  const userId = req.user.id;

  if (!req.file) {
    throw new ExpressError(400, "No file uploaded");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  const uploadedImage = await uploadToCloudinary(req.file.buffer, "profileImages");

  user.image = uploadedImage.secure_url;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Display picture updated successfully",
    user,
  });
};


exports.getEnrolledCourses = async (req, res) => {
  const userId = req.user.id;

  const userDetails = await User.findById(userId)
    .populate({
      path: "courses",
      model: "Course",
      populate: [
        {
          path: "courseContent",
          model: "Section",
          populate: {
            path: "subSection",
            model: "SubSection",
          },
        },
      ],
    })
    .lean();

  if (!userDetails) {
    throw new ExpressError(404, "User not found");
  }

  for (let i = 0; i < userDetails.courses.length; i++) {
    const course = userDetails.courses[i];
    let totalDurationInSeconds = 0;
    let totalSubSections = 0;

    for (const section of course.courseContent || []) {
      const subsections = section?.subSection || [];

      for (const sub of subsections) {
        totalDurationInSeconds += parseInt(sub.timeDuration || 0);
        totalSubSections += 1;
      }
    }

    course.totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    const courseProgress = await CourseProgress.findOne({
      courseId: course._id,
      userId: userId,
    });

    const completedCount = courseProgress?.completedVideos?.length || 0;
    course.progressPercentage =
      totalSubSections === 0
        ? 100
        : Math.round((completedCount / totalSubSections) * 10000) / 100;
  }

  return res.status(200).json({
    success: true,
    message: "Enrolled courses fetched successfully",
    courses: userDetails.courses,
  });
};


exports.instructorDashboard = async (req, res) => {
  const courseDetails = await Course.find({ instructor: req.user.id });

  const courseData = courseDetails.map((course) => {
    const totalStudentsEnrolled = course.studentsEnrolled.length;
    const totalAmountGenerated = totalStudentsEnrolled * course.price;

    return {
      _id: course._id,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      totalStudentsEnrolled,
      totalAmountGenerated,
    };
  });

  res.status(200).json({ courses: courseData });
};
