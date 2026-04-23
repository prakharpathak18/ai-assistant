import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64 pt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
