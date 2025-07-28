import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/cors/DeshBord/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return <div className="mt-10">Loading...</div>;
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="lg:block w-full lg:w-1/4 bg-gray-800 text-white p-4 transition-all">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-auto">
        <div className="mx-auto w-full sm:w-10/12 lg:w-10/12 max-w-[1000px] my-10 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
