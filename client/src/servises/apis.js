const BASE_URL = import.meta.env.VITE_BASE_URL;


  export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  };

 

  export const AuthEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CHANGE_PASSWORD_API :BASE_URL + "/auth/changepassword",
};


export const CATEGORIES_API = BASE_URL + "/course/showAllCategories";







 export const profileEndpoints = {
  UPDATE_PROFILE_API: BASE_URL + "/Profile/update",
  DELETE_PROFILE_API: BASE_URL + "/Profile/delete",            
  GET_USER_DETAILS_API: BASE_URL + "/Profile/details",          
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/Profile/display-picture", 
  GET_ENROLLED_COURSES_API: BASE_URL + "/Profile/enrolled-courses", 
  GET_INSTRUCTOR_DATA_API:  BASE_URL + "/profile/instructorDashboard"
}






export const courseEndpoints = {

  CREATE_COURSE_API: BASE_URL + "/course/createCourse",              
  GET_ALL_COURSE_API: BASE_URL + "/getAllCourses",         
  GET_COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",     
   EDIT_COURSE_API: BASE_URL + "/course/editCourse",
   INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
   DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
   GET_FULL_COURSE_DETAILS:  BASE_URL + "/course/getFullCourseDetails",

  CREATE_SECTION_API: BASE_URL + "/course/addSection",             
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",            
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",         


  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",       
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",       
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",    
  
  CREATE_CATEGORY_API: BASE_URL + "/course/createCatagory",          
  SHOW_ALL_CATEGORIES_API: BASE_URL + "/course/showAllCategories",    
  GET_CATEGORY_PAGE_DETAILS_API: BASE_URL + "/course/getCategoryPageDetails",

  
 
}


export const categoriesEndpoints = {
 
  
  CREATE_CATEGORY_API: BASE_URL + "/course/createCatagory",           
  SHOW_ALL_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  GET_CATEGORY_PAGE_DETAILS_API: BASE_URL + "/course/getCategoryPageDetails",

  
  
}

export const studentEndPiont = {
    COURSE_PAYMENT_API:  BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL +  "/payment/verifySignature",
    SEND_PAYMENT_SUCCESS_EMAIL_API:  BASE_URL + "/payment/sendPaymentSuccessEmail"
}

export const ratingEndpoints = {
  CREATE_RATING_API: BASE_URL + "/course/createRating",
  GET_ALL_REVIEWS_API: BASE_URL + "/course/getReviews",             
  GET_AVERAGE_RATING_API: BASE_URL + "/course/getAverageRating",   
};



export const viewCourseEndpoints = {
  LECTURE_COMPLETION_API: BASE_URL + "/course/update-progress",

};
