import { setLoading, setToken, } from "../../slices/authSlice";
import { setUser  } from "../../slices/ProfileSlice";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import {AuthEndpoints,} from '../apis';

import { resetCart } from "../../slices/cartSlice";
import { setSignupData } from "../../slices/authSlice"; 

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
   CHANGE_PASSWORD_API
} = AuthEndpoints;





export function sendOtp(email, navigate, signupData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      console.log("SENDOTP API RESPONSE..........", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // ✅ Store signup data in redux
      dispatch(setSignupData(signupData));
      localStorage.setItem("signupData", JSON.stringify(signupData)); // optional

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR..........", error);
      toast.error(error?.response?.data?.message || "OTP Send Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}






export function signUp(
  accountType,
  FirstName,
  LastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Creating Account...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        FirstName,
        LastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      console.log("SIGNUP API RESPONSE..........", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");


      // ✅ After signup, go to login page
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR..........", error);
      toast.error("Signup Failed");

      // ❌ Optional: keep user on signup page
      navigate("/signup");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, { email, password });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");

      const token = response.data.token;
      const user = response.data.user;

      const userImage = user?.image
        ? user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName}%20${user.lastName}`;

      const fullUser = { ...user, image: userImage };

      // ✅ Redux set
      dispatch(setToken(token));
      dispatch(setUser(fullUser));

      // ✅ LocalStorage set
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(fullUser));

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR..........", error);
      toast.error("Login Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


export function logout(navigate) {
    return (dispatch) =>{
       localStorage.removeItem("token")
        localStorage.removeItem("user")
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart(null))
       
         toast.success("Logged Out")
         navigate('/')
    }
}


export function resetPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending reset link...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST",RESETPASSTOKEN_API, { email });

      console.log("RESET PASSWORD TOKEN RESPONSE..........", response);

      if (!response.data.success) {
        throw new Error(response.data.message);

      }
      setEmailSent(true)
      toast.success("Reset link sent to your email");
    } catch (error) {
      console.log("RESET PASSWORD TOKEN ERROR..........", error);
      toast.error(error?.response?.data?.message || "Could not send reset link");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}








export async function resetPassword(token, password, confirmPassword, navigate) {
  const toastId = toast.loading("Resetting password...");
  try {
    const response = await apiConnector("POST", RESETPASSWORD_API, {
      token,
      password,
      confirmPassword,
    });

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    toast.success("Password reset successful");

    // 👇 Send user to success page with email
    navigate("/reset-complete", {
      state: {
        email: response.data.email,  // 👈 email from backend
      },
    });

  } catch (error) {
    console.log("RESET PASSWORD ERROR:", error);
    toast.error(error?.response?.data?.message || "Reset failed");
  } finally {
    toast.dismiss(toastId);
  }
}

 export function changePassword( token,passwords) {
  return async (dispatch, getState) => {
    const {
      auth: { token },
    } = getState();

    const toastId = toast.loading("Changing password...");
    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, passwords, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) throw new Error(response.data.message);

      toast.success("Password changed successfully");

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to change password");
    } finally {
      toast.dismiss(toastId);
    }
  };
}