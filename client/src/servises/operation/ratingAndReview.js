import { apiConnector } from "../apiconnector";
import { ratingEndpoints} from '../apis';

 const   {
  CREATE_RATING_API,
  GET_ALL_REVIEWS_API  ,        
  GET_AVERAGE_RATING_API  , 
} = ratingEndpoints






export const createRating = async (data, token) => {
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });

   
    if (!response?.data?.success) {
      return {
        success: false,
        message: response?.data?.message || "Something went wrong while submitting review",
      };
    }

    return response.data;
  } catch (err) {
    console.error(" createRating error:", err);

    return {
      success: false,
      message:
        err?.response?.data?.message ||
        err?.message ||
        "Unable to submit rating. Please try again later.",
    };
  }
};
