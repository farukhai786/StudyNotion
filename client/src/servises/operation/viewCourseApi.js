import { toast } from "react-hot-toast";
import {apiConnector} from "../apiconnector";          
import { viewCourseEndpoints } from "../apis";   

const {
 LECTURE_COMPLETION_API
} = viewCourseEndpoints;
 
export const markLectureAsComplete = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading…");
  console.log("mark complete ", data);

  try {
    const response = await apiConnector(
      "POST",
      LECTURE_COMPLETION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("MARK_LECTURE_AS_COMPLETE API RESPONSE →", response);

    if (response.data?.success) {
      toast.success("Lecture Completed");
      result = true;
    } else {
      const msg = response.data?.message || "Unknown error";

     
      if (msg.includes("already marked as completed")) {
        toast("Already completed", { icon: "✔️" });
        result = false;
      } else {
        toast.error(msg);
        result = false;
      }
    }
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE API ERROR →", error);
    toast.error(error.message || "Could not mark lecture complete");
    result = false;
  }

  toast.dismiss(toastId);
  return result;
};






