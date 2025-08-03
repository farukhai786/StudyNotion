import { apiConnector } from "../apiconnector";
import { profileEndpoints} from '../apis';
import { toast } from "react-hot-toast";
import {  setToken, } from "../../slices/authSlice";
import {  resetCart  } from "../../slices/cartSlice";
import {  setUser  } from "../../slices/ProfileSlice";





const {
  UPDATE_PROFILE_API,
  DELETE_PROFILE_API,
  GET_USER_DETAILS_API,
  UPDATE_DISPLAY_PICTURE_API,
  GET_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API
} = profileEndpoints;
export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading your enrolled courses...");
  let result = [];

  try {
    if (!token) {
      throw new Error("No token provided.");
    }

    console.log("🔁 Calling API to fetch enrolled courses...");

    const response = await apiConnector(
      "GET",
      GET_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log(" API Response:", response);

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to fetch courses");
    }

    result = response.data.courses; 
    toast.success("Courses loaded");
  } catch (error) {
    console.error("❌ GET_USER_ENROLLED_COURSES_API ERROR:", error);
    toast.error(error.message || "Failed to load enrolled courses");
  } finally {
    toast.dismiss(toastId);
  }

  return result;
}


 export function updateProfile(data) {
  return async (dispatch, getState) => {
    /* 1. token Redux से लें */
    const {
      auth: { token },
    } = getState();

    const toastId = toast.loading("Updating profile…");

    try {
      /* 2. API कॉल */
      const res = await apiConnector(
        "PUT",  UPDATE_PROFILE_API,
       
        data,
        { Authorization: `Bearer ${token}` }
      );

      if (!res.data.success) throw new Error(res.data.message);


      const u = res.data.user;
      const img =
        u?.image ||
        `https://api.dicebear.com/5.x/initials/svg?seed=${u.firstName}%20${u.lastName}`;
      const fullUser = { ...u, image: img };

      dispatch(setUser(fullUser));
      localStorage.setItem("user", JSON.stringify(fullUser));

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("UPDATE PROFILE ERROR:", err);
      toast.error(
        err?.response?.data?.message || err.message || "Could not update profile"
      );
    } finally {
      toast.dismiss(toastId);
    }
  };
}








export function deleteAccount(navigate) {
  return async (dispatch, getState) => {
    const toastId = toast.loading("Deleting account...");

    try {
      const token = getState().auth.token;

      const res = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!res.data.success) throw new Error(res.data.message);

      toast.success("Account deleted successfully");

\
      localStorage.clear();
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(resetCart());

      navigate("/");
    } catch (err) {
      console.log("DELETE ACCOUNT ERROR:", err);
      toast.error(err?.response?.data?.message || "Could not delete account");
    } finally {
      toast.dismiss(toastId);
    }
  };
}






export function updateDisplayPicture(file) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating picture...");
    try {
      const formData = new FormData();
      formData.append("file", file); 

      const token = JSON.parse(localStorage.getItem("token"));

      const res = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
        Authorization: `Bearer ${token}`,
        
      });

      if (!res.data.success) throw new Error(res.data.message);

      dispatch(setUser(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Profile picture updated");
    } catch (err) {
      console.error("UPDATE DISPLAY ERROR:", err);
      toast.error(err?.response?.data?.message || "Could not update picture");
    } finally {
      toast.dismiss(toastId);
    }
  };
}



 

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");

  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_INSTRUCTOR_DATA_API,
      null, 
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (response?.data?.courses) {
      result = response.data.courses;
    }
  } catch (error) {
    console.log("API Error:", error);
    toast.error("Could not get instructor data");
  }

  toast.dismiss(toastId);
  return result;
}
