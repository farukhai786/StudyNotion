import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconButton from '../../commen/iconButton'

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div className="text-richblack-5 space-y-6">
      <h1 className="text-3xl font-semibold">My Profile</h1>


      <div className="flex items-center justify-between rounded-md bg-[#161D29] p-6 border border-richblack-700">
        <div className="flex items-center gap-4">
          <img
            src={
              user?.image ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${user.FirstName} ${user.LastName}`
            }
            alt="profile"
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-medium text-[#F1F2FF]">
              {user?.FirstName} {user?.LastName}
            </p>
            <p className="text-sm text-[#838894]">{user?.email}</p>
          </div>
        </div>

        <IconButton
          text="Edit"
          customClasses="bg-yellow-300 text-black hover:bg-yellow-400 px-5 py-1 rounded-md"
          onClick={() => navigate('/dashboard/settings')}
        />
      </div>

      {/* About Section */}
      <div className="rounded-md bg-[#161D29] p-6 border border-[#2C333F] flex justify-between items-start">
        <div>
          <p className="text-lg  text-[#F1F2FF] font-medium">About</p>
          <p className="text-sm text-[#838894] mt-1">
            {user?.additionalDetails?.about || "Write something about yourself"}
          </p>
        </div>

        <IconButton
          text="Edit"
          customClasses="bg-yellow-300 text-black hover:bg-yellow-400 px-5 py-1 rounded-md"
          onClick={() => navigate('/dashboard/settings')}
        />
      </div>


      <div className="rounded-md bg-[#161D29] p-6 border border-[#2C333F] space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-lg text-white font-medium">Personal Details</p>
          <IconButton
            text="Edit"
            customClasses="bg-yellow-300 text-black hover:bg-yellow-400 px-5 py-1 rounded-md"
            onClick={() => navigate('/dashboard/settings')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm text-[#838894] mt-4">
          <div>
            <p className="text-[#424854]">First Name</p>
            <p  className=' text-[#F1F2FF]'>{user?.FirstName}</p>
          </div>
          <div>
            <p className="text-[#424854]">Last Name</p>
            <p className=' text-[#F1F2FF]'>{user?.LastName}</p>
          </div>
          <div>
            <p className="text-[#424854]">Email</p>
            <p  className=' text-[#F1F2FF]'>{user?.email}</p>
          </div>
          <div>
            <p className="text-[#424854]">Phone Number</p>
            <p  className=' text-[#F1F2FF]'>{user?.additionalDetails?.contactNumber || "Add Contact Number"}</p>
          </div>
          <div>
            <p className="text-[#424854]">Gender</p>
            <p  className=' text-[#F1F2FF]'>{user?.additionalDetails?.gender || "Add Gender"}</p>
          </div>
          <div>
            <p className="text-[#424854]">Date of Birth</p>
            <p  className=' text-[#F1F2FF]'>
              {user?.additionalDetails?.dateOfBirth
                ? new Date(user.additionalDetails.dateOfBirth).toLocaleDateString()
                : "Add Date of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
