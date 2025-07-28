import React from 'react'
import { categoriesEndpoints } from "../apis"
import {toast} from 'react-hot-toast'
import { apiConnector } from '../apiconnector'


const {          
  SHOW_ALL_CATEGORIES_API ,  
  GET_CATEGORY_PAGE_DETAILS_API, 
  
  
} = categoriesEndpoints

export const getCategoryPageDetails = async (categoryId) => {
  const toastId = toast.loading("Loading");

  try {
 
    const { data } = await apiConnector(
      "POST",
      GET_CATEGORY_PAGE_DETAILS_API,
      { categoryId }
    );

    if (!data?.success) {
      
      throw new Error(data?.message || "Category पेज डेटा नहीं मिला");
    }

    return data;           
  } catch (err) {
    console.error("Category page API error ➜", err);

   
    const msg =
      err?.response?.data?.message ||
      err.message ||
      "कोई अज्ञात त्रुटि हुई";
    toast.error(msg);

    return err?.response?.data || { success: false, message: msg };
  } finally {
   
    toast.dismiss(toastId);
  }
};
