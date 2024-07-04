import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="text-white p-4 md:hidden"
      >
        {isOpen ? <FontAwesomeIcon icon={faTimes} size="lg" /> : <FontAwesomeIcon icon={faBars} size="lg" />}
      </button>
      <div className={`fixed inset-0 z-50 bg-btnColor text-white p-5 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-1/5 md:flex md:flex-col transition-transform duration-300 ease-in-out`}>
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
    </>
  );
};

export default SideBar;
