import React, { useState, useEffect,  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconButton from '../components/commen/iconButton'
import {
  updateProfile,
  deleteAccount,
  updateDisplayPicture,
 
} from '../servises/operation/ProfileApi'
import { changePassword} from '../servises/operation/AuthApi'
 
export default function EditProfile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)
  const {token } = useSelector((state)=> state.auth)
  const [image, setImage] = useState(null)
  const [imageChanged, setImageChanged] = useState(false)
  const [formData, setFormData] = useState({
    displayName: '',
    profession: 'Developer',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    About: '',
  })
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  // Sync Redux user to local form state
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user?.name || '',
        profession: user?.additionalDetails?.profession || 'Developer',
        dateOfBirth: user?.additionalDetails?.dateOfBirth || '',
        gender: user?.additionalDetails?.gender || '',
        contactNumber: user?.additionalDetails?.contactNumber || '',
        about: user?.additionalDetails?.about || '',

      })
      setImage(user?.image || '')
    }
  }, [user])

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value })

const handleImageUpdate = () => {
  if (imageChanged && image instanceof File) {
    dispatch(updateDisplayPicture(image)) // ✅ pass file directly
    setImageChanged(false)
  }
}


  const handleProfileUpdate = () => dispatch(updateProfile(formData))
  const handleChangePassword = () => dispatch(changePassword( token,passwords))
  const handleDeleteAccount = () => dispatch(deleteAccount(navigate))

  return (
    <div className="text-[#F1F2FF] space-y-6 w-6/12 mx-auto">
      <h1 className="text-3xl font-semibold">Edit Profile</h1>


      <div className="rounded-lg bg-[#1E293B] p-6 border border-[#334155] flex items-center gap-6">

  <img
    src={
      image
        ? image instanceof File
          ? URL.createObjectURL(image)
          : image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName || 'U'}%20${user?.lastName || 'N'}`
    }
    alt="profile"
    className="h-16 w-16 rounded-full object-cover border-2 border-red-600 bg-red-600"
  />


  <div className="flex flex-col gap-2">
    <p className="text-white font-semibold text-sm">Change Profile Picture</p>

    <div className="flex gap-3">
   
      <label className="px-4 py-1 rounded bg-[#475569] text-white text-sm font-medium cursor-pointer hover:bg-[#64748b]">
        Select
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImage(file);
              setImageChanged(true);
            }
          }}
        />
      </label>

   
      {imageChanged && (
        <button
          onClick={handleImageUpdate}
          className="px-4 py-1 rounded bg-[#FFD60A] text-black text-sm font-semibold hover:bg-[#ffe25c] flex items-center gap-2 cursor-pointer"
        >
          Upload
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0 0l-3-3m3 3l3-3M12 3v9" />
          </svg>
        </button>
      )}
    </div>
  </div>
</div>


  
    <div className="rounded-lg bg-[#2C333F] p-6 border border-[#3E4C63] space-y-4">
  <p className="text-lg font-semibold">Profile Information</p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   
    <div>
      <label className="text-sm">Date of Birth</label>
      <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        className="w-full rounded bg-[#3E4C63] px-4 py-2 text-white"
      />
    </div>
    <div>
      <label className="text-sm">Gender</label>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full rounded bg-[#3E4C63] px-4 py-2 text-white"
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div>
      <label className="text-sm">Contact Number</label>
      <div className="flex gap-2">
        <select
          disabled
          className="rounded bg-[#3E4C63] px-2 py-2 text-sm text-white"
        >
          <option value="+91">+91</option>
        </select>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full rounded bg-[#3E4C63] px-4 py-2 text-white"
        />
      </div>
    </div>
    <div>
      <label className="text-sm">About</label>
      <input
        type="text"
        name="about"
        value={formData.About}
        onChange={handleChange}
        className="w-full rounded bg-[#3E4C63] px-4 py-2 text-white"
      />
    </div>
  </div>

  {/* Footer Buttons */}
  <div className="flex justify-end gap-4 pt-4">
    <button className="px-4 py-2 bg-[#3E4C63] text-white rounded cursor-pointer">Cancel</button>
    <button className="px-4 py-2 bg-[#FFD60A] text-black rounded font-semibold cursor-pointer" onClick={handleProfileUpdate}>
      Save
    </button>
  </div>
</div>


      {/* 3. Password Section */}
      <div className="rounded-lg bg-[#2C333F] p-6 border border-[#3E4C63] space-y-4">
        <p className="text-lg font-semibold">Password</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm">Current Password</label>
            <input
              type="password"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handlePasswordChange}
              className="w-full rounded bg-[#3E4C63] px-4 py-2"
            />
          </div>
          <div>
            <label className="text-sm">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="w-full rounded bg-[#3E4C63] px-4 py-2"
            />
          </div>
          <div>
           
          </div>
        </div>
        <div className="flex justify-end">
          <IconButton
            text="Change Password"
            onClick={handleChangePassword}
            customClasses="bg-[#FFD60A] text-black px-6 py-2 rounded hover:bg-[#ffe25c] cursor-pointer"
          />
        </div>
      </div>

      {/* 4. Delete Account */}
      <div className="rounded-lg bg-[#6B021D] border border-[#A10E2A] p-6 text-[#FECACA] space-y-3">
        <p className="text-lg font-semibold">Delete Account</p>
        <p className="text-sm">
          This account contains Paid Courses. Deleting your account will remove all
          the content associated with it.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="underline text-sm text-[#FECDD3] cursor-pointer"
        >
          I want to delete my account.
        </button>
      </div>

      {/* 5. Bottom Action Buttons */}
    
    </div>
  )
}
