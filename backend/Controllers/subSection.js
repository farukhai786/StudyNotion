const Section = require("../Models/Section");
const SubSection = require("../Models/SubSection");
const { uploadToCloudinary } = require("../Utils/imageUploader");
const ExpressError = require("../Utils/ExpressError");



exports.createSubSection = async (req, res, next) => {
  const { title, description, timeDuration, sectionId } = req.body;
  const file = req.file;

  if (!title || !description || !timeDuration || !sectionId || !file) {
    throw new ExpressError(400, "All fields are required");
  }

  const uploadResult = await uploadToCloudinary(file.buffer, "subsection-videos", "video");

  const subSection = await SubSection.create({
    title,
    description,
    timeDuration: Number(timeDuration),
    videoUrl: uploadResult.secure_url,
  });

  const updatedSection = await Section.findByIdAndUpdate(
    sectionId,
    { $push: { subSection: subSection._id } },
    { new: true }
  ).populate("subSection");

  return res.status(200).json({
    success: true,
    message: "SubSection created successfully",
    data: updatedSection,
  });
};


exports.deleteSubSection = async (req, res) => {
  const { subSectionId, sectionId } = req.body;

  if (!subSectionId || !sectionId) {
    throw new ExpressError(400, "subSectionId और sectionId दोनों ज़रूरी हैं");
  }

  const subSection = await SubSection.findById(subSectionId);
  if (!subSection) {
    throw new ExpressError(404, "SubSection नहीं मिला");
  }

  await SubSection.findByIdAndDelete(subSectionId);

  const updatedSection = await Section.findByIdAndUpdate(
    sectionId,
    { $pull: { subSection: subSectionId } },
    { new: true }
  ).populate("subSection");

  return res.status(200).json({
    success: true,
    message: "SubSection सफलतापूर्वक डिलीट हो गया",
    data: updatedSection,
  });
};

exports.UpdateSubSection = async (req, res) => {
  const { subSectionId, sectionId, title, description, timeDuration } = req.body;
  const videoFile = req.files?.videoFile;

  if (!subSectionId || !sectionId) {
    throw new ExpressError(400, "subSectionId और sectionId दोनों ज़रूरी हैं");
  }

  const subSection = await SubSection.findById(subSectionId);
  if (!subSection) {
    throw new ExpressError(404, "SubSection नहीं मिला");
  }

  if (title !== undefined) subSection.title = title;
  if (description !== undefined) subSection.description = description;
  if (timeDuration !== undefined) subSection.timeDuration = timeDuration;

  if (videoFile !== undefined) {
    const uploadedVideo = await uploadToCloudinary(
      videoFile,
      "subsection-videos",
      "video"
    );
    subSection.videoUrl = uploadedVideo.secure_url;
  }

  await subSection.save();

  const updatedSection = await Section.findById(sectionId).populate("subSection");

  return res.status(200).json({
    success: true,
    message: "SubSection सफलतापूर्वक अपडेट हो गया",
    updatedSection,
  });
};
