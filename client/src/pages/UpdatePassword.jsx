import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../servises/operation/AuthApi";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const isValid = {
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    minLength: password.length >= 8,
  };

  const allValid = Object.values(isValid).every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").pop();
    dispatch(resetPassword(token, password, confirmPassword, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0B10] text-white px-4">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-2xl font-semibold">Choose new password</h2>
        <p className="text-gray-400 text-sm">
          Almost done. Enter your new password and you're all set.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">New password *</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 rounded-md bg-[#1C1D24] text-white focus:outline-none"
              value={password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm new password *</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-4 py-2 rounded-md bg-[#1C1D24] text-white focus:outline-none"
              value={confirmPassword}
              onChange={handleOnChange}
              required
            />
          </div>

          <ul className="text-sm space-y-1">
            <li className={isValid.lowercase ? "text-green-400" : "text-gray-500"}>
              ● one lowercase character
            </li>
            <li className={isValid.uppercase ? "text-green-400" : "text-gray-500"}>
              ● one uppercase character
            </li>
            <li className={isValid.number ? "text-green-400" : "text-gray-500"}>
              ● one number
            </li>
            <li className={isValid.special ? "text-green-400" : "text-gray-500"}>
              ● one special character
            </li>
            <li className={isValid.minLength ? "text-green-400" : "text-gray-500"}>
              ● 8 character minimum
            </li>
          </ul>

          <button
            type="submit"
            disabled={!allValid || password !== confirmPassword}
            className="w-full bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-300 transition disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="text-sm text-gray-400 hover:text-white mt-4"
        >
          ← Back to login
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
