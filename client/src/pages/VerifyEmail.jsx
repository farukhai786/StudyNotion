import React, { useState, useEffect } from "react"
import OTPInput from "react-otp-input"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signUp } from "../servises/operation/AuthApi/" 
import { sendOtp} from "../servises/operation/AuthApi"
export default function VerifyEmail() {
  const [otp, setOtp] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { signupData, loading } = useSelector((state) => state.auth)

 
  useEffect(() => {
    if (!signupData) {
      navigate("/signup")
    }
  }, [signupData, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (otp.length !== 6) {
      return alert("Please enter a 6-digit OTP")
    }

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    )
  }
 
const handleResend = () => {
  dispatch(sendOtp(signupData.email, navigate, signupData));
};


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0F1117] text-white px-4">
      <h2 className="text-2xl font-semibold mb-2">Verify email</h2>
      <p className="text-sm text-gray-400 mb-6 text-center">
        A verification code has been sent to your email. Enter the code below:
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              className="w-10 h-10 m-1 text-center rounded-md border border-gray-300 bg-[#1E1E2F] text-white focus:outline-none focus:border-yellow-400"
            />
          )}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 text-black px-6 py-2 rounded-md mt-6 hover:bg-yellow-300 font-semibold transition-all disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify and Register"}
        </button>
      </form>

      <div className="mt-4 flex justify-between w-full max-w-[300px] text-sm text-blue-400">
        <button onClick={() => navigate("/login")}>← Back to login</button>
      <button onClick={handleResend} disabled={loading}>
      Resend it
</button>
      </div>
    </div>
  )
}
