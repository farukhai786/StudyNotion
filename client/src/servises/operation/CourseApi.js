import { toast } from 'react-hot-toast'; // make sure this is installed
import { apiConnector } from '../apiconnector'; // your custom Axios instance
import {courseEndpoints } from '../apis'; // API endpoint

const {
  // 🔹 Course Management
  CREATE_COURSE_API,
  GET_ALL_COURSE_API,           
  GET_COURSE_DETAILS_API,
  EDIT_COURSE_API,
  DELETE_COURSE_API,
  INSTRUCTOR_COURSES_API,
  GET_FULL_COURSE_DETAILS,
  // 🔹 Section
  CREATE_SECTION_API,               
  UPDATE_SECTION_API,              
  DELETE_SECTION_API ,            

  // 🔹 Sub-Section
  CREATE_SUBSECTION_API,         
  UPDATE_SUBSECTION_API ,      
  DELETE_SUBSECTION_API ,   
  
  CREATE_CATEGORY_API,           
  SHOW_ALL_CATEGORIES_API ,  
  GET_CATEGORY_PAGE_DETAILS_API, 
  
  
} = courseEndpoints

export const fetchCourseCategories = async () => {
  let result = [];

  try {
    const response = await apiConnector("GET", SHOW_ALL_CATEGORIES_API);
    console.log("COURSE_CATEGORIES_API API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories");
    }

    // ✅ fix here
    result = response.data.allCatagory;
  } catch (error) {
    console.log("COURSE_CATEGORIES_API API ERROR............", error);
    toast.error(error.message);
  }

  return result;
};




// navigate  add krna hAI
export const addCourseDetails = async (data, token, ) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE COURSE API RESPONSE 👉", response);

    if (!response?.data?.success) {
      throw new Error("Could not create course details");
    }

    toast.success("Course Created Successfully!");
    result = response.data.course;

    // 🔁 Redirect to Add Section page or course list
    // navigate("/dashboard/my-courses");
  } catch (error) {
    console.log("CREATE COURSE API ERROR ❌", error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  }

  toast.dismiss(toastId);
  return result;
};



export const deleteCourse = async (data, token) => {
  try {
    const response = await apiConnector("POST", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });

    return response.data;
  } catch (error) {
    console.error("DELETE COURSE API ERROR:", error);
    return null;
  }
};





export const editCourseDetails = async (formData, token) => {
  const toastId = toast.loading("Updating course...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      EDIT_COURSE_API,
      formData,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Failed to update course");
    }

    toast.success("Course updated successfully");
    result = response.data.data; // this is updated course
  } catch (error) {
    console.error("EDIT COURSE ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not update course");
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};






export const getFullCourseDetails = async (courseId, token) => {
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS, // ✅ correct constant
      { courseId },
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could not fetch course details");
    }
    result = response.data.data;
  } catch (error) {
    console.error("GET_FULL_COURSE_DETAILS ERROR:", error);
    toast.error(
      error?.response?.data?.message || "Failed to load course details"
    );
  }

  return result;
};






export const updateSection = async ({ sectionId, sectionName, courseId }, token) => {
  const toastId = toast.loading("Updating section...");

  try {
    // 👉 backend expects all तीन fields body में
    const payload = { sectionId, sectionName, courseId };

    const response = await apiConnector(
      "PUT",
      UPDATE_SECTION_API,
      payload,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error("Update failed");
    }

    toast.success("Section updated successfully");

    // controller भेजता है { success, message, course }
    return response.data.course;
  } catch (error) {
    console.error("UPDATE SECTION ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to update section");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};



// src/services/operations/courseAPI.js


export const createSection = async ({ courseId, sectionName }, token) => {
  const toastId = toast.loading("Creating section…");
  try {
    const { data } = await apiConnector(
      "POST",
      CREATE_SECTION_API,                // '/api/v1/course/addSection'
      { courseId, sectionName },
      { Authorization: `Bearer ${token}` }
    );

    if (!data?.success) throw new Error(data?.message || "Failed");

    toast.success("Section added");
    return data.course;                  // populated course
  } catch (err) {
    console.error("CREATE SECTION ERROR:", err);
    toast.error(err?.response?.data?.message || "Failed to create section");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};




export const deleteSection = async ({ sectionId, courseId }, token) => {
  try {
    const response = await apiConnector(
      "POST",
      DELETE_SECTION_API,
      { sectionId, courseId },
      { Authorization: `Bearer ${token}` }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Section deletion failed");
    }

    return response.data.course; // Return updated course content
  } catch (error) {
    console.error("❌ DELETE SECTION ERROR:", error);
    throw error;
  }
};



export const deleteSubSection = async ({ subSectionId, sectionId }, token) => {
  try {
    const response = await apiConnector(
      "POST",  // ✅ POST method
      DELETE_SUBSECTION_API,
      { subSectionId, sectionId },
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error("Failed to delete sub-section");
    }

    toast.success("SubSection deleted successfully");
    return response?.data?.data;
  } catch (error) {
    console.log("DELETE SUBSECTION ERROR:", error);
    toast.error("Failed to delete SubSection");
    return null;
  }
};





export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", 
    });

    console.log("CREATE SUB-SECTION API RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error("Could not create subsection");
    }

    toast.success("Lecture added");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR:", error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  }

  toast.dismiss(toastId);
  return result;
};




export const updateSubSection = async (data, token) => {
  const toastId = toast.loading("Updating...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",  // ✅ or PUT based on your route
      UPDATE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );

    console.log("✅ UPDATE SUBSECTION RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error("Update failed");
    }

    toast.success("Lecture updated successfully");
    result = response?.data?.updatedSection; // ✅ use correct key here

  } catch (error) {
    console.log("❌ UPDATE SUBSECTION ERROR:", error);
    toast.error(error?.response?.data?.message || "Update failed");
  }

  toast.dismiss(toastId);
  return result;
};






export const getInstructorCourses = async (token) => {
  let result = [];

  try {
    const response = await apiConnector("GET", INSTRUCTOR_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch instructor courses");
    }

    result = response.data.data;
  } catch (error) {
    console.error("GET_INSTRUCTOR_COURSES ERROR:", error);
    toast.error(error?.response?.data?.message || "Failed to load courses");
  }

  return result;
};


