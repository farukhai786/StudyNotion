import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

const maskEmail = (email) => {
  const [name, domain] = email.split("@")
  const maskedName = name[0] + "*".repeat(name.length - 1)
  return `${maskedName}@${domain}`
}

const ResetComplete = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || "your@email.com"

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0B10] text-white px-4">
      <div className="text-center space-y-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold">Reset complete!</h2>
        <p className="text-gray-400 text-sm">
          All done! We have sent an email to{" "}
          <span className="text-white font-medium">{maskEmail(email)}</span> to confirm.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
        >
          Return to login
        </button>

        <button
          onClick={() => navigate("/login")}
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Back to login
        </button>
      </div>
    </div>
  )
}

export default ResetComplete
