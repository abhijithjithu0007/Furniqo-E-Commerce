import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiShoppingBag } from "react-icons/hi2";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { PiUsersFourFill } from "react-icons/pi";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  

  return (
    <div className="min-h-screen flex flex-row bg-gray-50 text-gray-800">
      <div className={`fixed top-0 left-0 h-full bg-white border-r z-10 overflow-y-auto transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-64`}>
        <div className="flex items-center justify-center h-14 border-b">
          <div className='text-2xl'>Admin</div>
        </div>
        <div className="flex-grow overflow-y-auto">
          <ul className="flex flex-col py-4 space-y-1">
            <li>
              <Link to='/admin/dashboard' className="relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <TbLayoutDashboardFilled />
                </span>
                <span className="ml-2 text-sm truncate">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to='/admin/products' className="relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-btnColor pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <HiShoppingBag />
                </span>
                <span className="ml-2 text-sm truncate">Products</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <PiUsersFourFill />
                </span>
                <span className="ml-2 text-sm truncate">Users</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <button
        className="absolute top-2 left-2 md:hidden bg-gray-200 p-2 rounded-full focus:outline-none z-20"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default SideBar;
