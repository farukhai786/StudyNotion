import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { FiChevronDown } from "react-icons/fi"
import { MdDashboard, MdLogout } from "react-icons/md"
import { logout } from '../../../servises/operation/AuthApi'

export default function ProfileDropDown() {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout(navigate))
    setShowDropdown(false) 
  }

  const handleNavigateToProfile = () => {
    setShowDropdown(false) 
    navigate("/dashboard/my-profile")
  }

  return (
    <div className="relative" ref={dropdownRef}>
   
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 text-white focus:outline-none"
      >
        <img
          src={
            user?.image ||
            `https://ui-avatars.com/api/?name=${user?.firstName?.charAt(0)}+${user?.lastName?.charAt(0)}&background=0D8ABC&color=fff`
          }
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <FiChevronDown size={20} />
      </button>

   
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1f2937] text-white rounded-md shadow-lg py-2 z-50">
          <button
            onClick={handleNavigateToProfile} 
            className="flex items-center w-full px-4 py-2 hover:bg-gray-700 text-sm gap-2"
          >
            <MdDashboard size={18} />
            Dashboard
          </button>
          <button
            onClick={handleLogout} 
            className="flex items-center w-full px-4 py-2 hover:bg-gray-700 text-sm gap-2"
          >
            <MdLogout size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
