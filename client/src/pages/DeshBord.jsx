import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/cors/DeshBord/Sidebar";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa"; 
const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile toggle

  if (profileLoading || authLoading) {
    return <div className="mt-10">Loading...</div>;
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col lg:flex-row">
      
    
      <button
        className="lg:hidden absolute top-4 left-4 z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars className="text-white text-3xl" />
      </button>

   
      <div
        className={`lg:block ${sidebarOpen ? "block" : "hidden"} lg:w-1/4 w-full bg-gray-800 text-white p-4 transition-all`}
      >
        <Sidebar />
      </div>

  
      <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-auto">
        <div className="mx-auto w-full sm:w-10/12 lg:w-10/12 max-w-[1000px] my-10 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





