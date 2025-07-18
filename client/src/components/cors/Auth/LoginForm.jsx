import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../servises/operation/AuthApi"; // ✅ सही path लगाओ

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    dispatch(login(formData.email, formData.password, navigate));
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full gap-y-4 mt-6"
    >
      {/* Email */}
      <label className="w-full">
        <p className="text-[0.875rem] text-[#F1F2FF] mb-1 leading-[1.375rem]">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          type="email"
          required
          value={formData.email}
          placeholder="Enter your email address"
          onChange={changeHandler}
          name="email"
          className="bg-[#161D29] rounded-[0.75rem] w-full p-[12px] text-[#F1F2FF]"
        />
      </label>

      {/* Password */}
      <label className="w-full relative">
        <p className="text-[0.875rem] text-[#F1F2FF] mb-1 leading-[1.375rem]">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          type={showPassword ? "text" : "password"}
          required
          value={formData.password}
          placeholder="Enter Password"
          onChange={changeHandler}
          name="password"
          className="bg-[#161D29] rounded-[0.75rem] w-full p-[12px] text-[#F1F2FF]"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>

        {/* Forgot Password */}
        <Link to="/forget-password" className="block mt-1">
          <p className="text-xs text-blue-100 text-right">Forget Password?</p>
        </Link>
      </label>

      {/* Submit Button */}
      <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-[#000814] cursor-pointer">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
