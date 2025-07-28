import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../../servises/operation/AuthApi"; 

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCreatePass, setShowCreatePass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [accountType, setAccountType] = useState("Student");

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

const submitHandler = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  const dataToStore = {
    ...formData,
    accountType,
  };

  
  dispatch(sendOtp(formData.email, navigate, dataToStore));
};




  return (
    <div>
      
      <div className="flex bg-[#161D29] p-1 gap-x-1 rounded-full max-w-max">
        <button
          onClick={() => setAccountType("Student")}
          className={`${
            accountType === "Student"
              ? "bg-[#000814] text-[#F1F2FF]"
              : "bg-transparent text-[#999DAA]"
          } py-2 px-5 rounded-full transition-all`}
        >
          Student
        </button>
        <button
          onClick={() => setAccountType("Instructor")}
          className={`${
            accountType === "Instructor"
              ? "bg-[#000814] text-[#F1F2FF]"
              : "bg-transparent text-[#999DAA]"
          } py-2 px-5 rounded-full transition-all`}
        >
          Instructor
        </button>
      </div>

      
      <form onSubmit={submitHandler} className="mt-6 space-y-4">
        <div className="flex lg:flex-row  flex-col gap-x-4 gap-y-4">
         
          <label className="w-full">
            <p className="text-[0.875rem] text-[#F1F2FF] mb-1 leading-[1.375rem]">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              placeholder="Enter First Name"
              name="firstName"
              value={formData.firstName}
              onChange={changeHandler}
              className="bg-[#161D29] rounded-[0.75rem] w-full p-[12px] text-[#F1F2FF]"
            />
          </label>

         
          <label className="w-full">
            <p className="text-[0.875rem] text-[#F1F2FF] mb-1 leading-[1.375rem]">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              placeholder="Enter Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={changeHandler}
              className="bg-[#161D29] rounded-[0.75rem] w-full p-[12px] text-[#F1F2FF]"
            />
          </label>
        </div>

      
        <label className="w-full">
          <p className="text-[0.875rem] text-[#F1F2FF] mb-3 leading-[1.375rem]">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="email"
            required
            placeholder="Enter your email address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="bg-[#161D29] rounded-[0.75rem] w-full p-[12px] text-[#F1F2FF]"
          />
        </label>

       
        <div className="flex lg:flex-row  flex-col gap-x-4 gap-y-4">
       
          <label className="w-full relative">
            <p className="text-[0.875rem] text-[#F1F2FF] mb-1 leading-[1.375rem]">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showCreatePass ? "text" : "password"}
              required
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              className="bg-[#161D29] rounded-[0.75rem] w-full p-[12px] text-[#F1F2FF]"
            />
            <span
              onClick={() => setShowCreatePass((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer z-10"
            >
              {showCreatePass ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

       
          <label className="w-full relative">
            <p className="text-[0.875rem] text-[#F1F2FF] mb-1 leading-[1.375rem]">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showConfirmPass ? "text" : "password"}
              required
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
              className="bg-[#161D29] rounded-[0.75rem] w-full p-[12px] text-[#F1F2FF]"
            />
            <span
              onClick={() => setShowConfirmPass((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer z-10"
            >
              {showConfirmPass ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-[#000814] w-full cursor-pointer">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
