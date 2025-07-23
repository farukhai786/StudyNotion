const Course = require("../Models/Course");
const Category  = require("../Models/Category");
const Section = require("../Models/Section")
const User = require("../Models/User");
const SubSection = require("../Models/SubSection")
const { uploadToCloudinary } = require("../Utils/imageUploader");
const CourseProgress = require ("../Models/courseProgres")
const ExpressError = require("../Utils/ExpressError");
const { convertSecondsToDuration } = require("../Utils/time");





exports.createCourse = async (req, res) => {
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
    } = req.body;

    const thumbnail = req.file;

  
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !tag ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message:
          "required name, description, learn, price, category, tag, thumbnail.",
      });
    }

   
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Instructor not found" });
    }

   
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Category नहीं मिली।" });
    }

  
    const uploadedThumbnail = await uploadToCloudinary(
      thumbnail.buffer, 
      "CourseThumbnails"
    );

   
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: uploadedThumbnail.secure_url,
      courseContent: [],
      ratingAndReviews: [],
      status,
    });

  
    await User.findByIdAndUpdate(
      instructorDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

  
    await Category.findByIdAndUpdate(
      categoryDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

   
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  
};

exports.editCourse = async (req, res) => {
 
    const { courseId, ...updates } = req.body;

    const course = await Course.findById(courseId);
   if (!course) {
  throw new ExpressError(404, "Course not found");
}

    
    if (req.files && req.files.thumbnailImage) {
      console.log("Thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

  
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
 
};


exports.getAllCourses = async (req, res) => {

    const allCourses = await Course.find(
      { status: "Published" },
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      data: allCourses,
    });

};



exports.deleteCourse = async (req, res) => {
 
    const { courseId } = req.body;

  
    const course = await Course.findById(courseId);
   if (!course) {
  throw new ExpressError(404, "Course not found");
}

    const studentsEnrolled = course.studentsEnrolled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

   
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection;
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId);
        }

      
        await Section.findByIdAndDelete(sectionId);
      }
    }

 
    await Course.findByIdAndDelete(courseId);

  
    await Category.findByIdAndUpdate(course.category, {
      $pull: { courses: courseId },
    });

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });


};





;

exports.getCourseDetails = async (req, res) => {

    const { courseId } = req.body;

   if (!courseId) {
  throw new ExpressError(400, "Course not found");
}

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl", 
        },
      });

   if (!courseDetails) {
  throw new ExpressError(404, "Course not found");
}

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration) || 0;
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    
    const courseData = {
      ...courseDetails._doc,
      totalDuration,
    };

    return res.status(200).json({
      success: true,
      message: "Course details मिल गईं।",
      data: courseData,
    });

  }





exports.getFullCourseDetails = async (req, res) => {
  
    const { courseId } = req.body;
    const userId = req.user.id;

    
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    const courseProgress = await CourseProgress.findOne({
      courseId: courseId, 
      userId,
    });

   
  if (!courseDetails) {
  throw new ExpressError(400, `Could not find course with ID: ${courseId}`);
}
  
   
    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((sub) => {
        totalDurationInSeconds += parseInt(sub.timeDuration);
      });
    });
    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

   
    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedLectures: courseProgress?.completedVideos || [],
      },
    });

};





exports.getInstructorCourses = async (req, res) => {
 

    const instructorId = req.user.id;

   
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

   
    return res.status(200).json({
      success: true,
      data: instructorCourses,
    });

  } 
  

