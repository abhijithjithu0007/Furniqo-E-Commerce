import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="w-1/5 bg-btnColor text-white p-5">
      <h1 className="text-2xl font-bold mb-6">Admin</h1>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/admin/dashboard" className="flex items-center ml-3 text-white hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/users" className="flex items-center ml-3 text-white hover:text-gray-300">
              Users
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/products" className="flex items-center ml-3 text-white hover:text-gray-300">
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
