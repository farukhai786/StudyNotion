const BASE_URL = import.meta.env.VITE_BASE_URL;

// api/categories.js
  export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  };

 
// services/apis.js
// Auth-related endpoints
  export const AuthEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CHANGE_PASSWORD_API :BASE_URL + "/auth/changepassword",
};

// Course/category endpoints
export const CATEGORIES_API = BASE_URL + "/course/showAllCategories";

// Export grouped endpoints if needed elsewhere



//profile api 

 export const profileEndpoints = {
  UPDATE_PROFILE_API: BASE_URL + "/Profile/update",              // PUT request
  DELETE_PROFILE_API: BASE_URL + "/Profile/delete",              // DELETE request
  GET_USER_DETAILS_API: BASE_URL + "/Profile/details",           // GET request
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/Profile/display-picture", // PUT (formData)
  GET_ENROLLED_COURSES_API: BASE_URL + "/Profile/enrolled-courses", 
  GET_INSTRUCTOR_DATA_API:  BASE_URL + "/profile/instructorDashboard"
}






export const courseEndpoints = {
  // 🔹 Course Management
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",                // POST (formData: thumbnailImage)
  GET_ALL_COURSE_API: BASE_URL + "/getAllCourses",              // GET
  GET_COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",       // POST
   EDIT_COURSE_API: BASE_URL + "/course/editCourse",
   INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
   DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
   GET_FULL_COURSE_DETAILS:  BASE_URL + "/course/getFullCourseDetails",
  // 🔹 Section
  CREATE_SECTION_API: BASE_URL + "/course/addSection",                 // POST
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",              // POST
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",              // POST

  // 🔹 Sub-Section
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",           // POST (formData: videoFile)
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",        // POST
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",    
  
  CREATE_CATEGORY_API: BASE_URL + "/course/createCatagory",            // POST (admin only)
  SHOW_ALL_CATEGORIES_API: BASE_URL + "/course/showAllCategories",     // GET
  GET_CATEGORY_PAGE_DETAILS_API: BASE_URL + "/course/getCategoryPageDetails",

  
  //
}


export const categoriesEndpoints = {
 
  
  CREATE_CATEGORY_API: BASE_URL + "/course/createCatagory",            // POST (admin only)
  SHOW_ALL_CATEGORIES_API: BASE_URL + "/course/showAllCategories",     // GET
  GET_CATEGORY_PAGE_DETAILS_API: BASE_URL + "/course/getCategoryPageDetails",

  
  //
}

export const studentEndPiont = {
    COURSE_PAYMENT_API:  BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL +  "/payment/verifySignature",
    SEND_PAYMENT_SUCCESS_EMAIL_API:  BASE_URL + "/payment/sendPaymentSuccessEmail"
}

export const ratingEndpoints = {
  CREATE_RATING_API: BASE_URL + "/course/createRating",
  GET_ALL_REVIEWS_API: BASE_URL + "/course/getReviews",             // needs courseId param
  GET_AVERAGE_RATING_API: BASE_URL + "/course/getAverageRating",   // needs courseId param
};



export const viewCourseEndpoints = {
  LECTURE_COMPLETION_API: BASE_URL + "/course/update-progress",

};
