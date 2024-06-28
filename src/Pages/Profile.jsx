import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mycontext } from './SignUp';

const Profile = () => {
  const { userData, setIsLoggedIn } = useContext(Mycontext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('isLogin', JSON.stringify(false));
    setIsLoggedIn(false);
    navigate('/login');
  };

  const name = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-8 px-6 shadow-md rounded-lg sm:px-10">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
            Profile
          </h2>
          <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8">
            <div className="mb-6 lg:mb-0">
              <img
                src="https://cdn-icons-png.flaticon.com/512/8847/8847419.png"
                alt="Profile Icon"
                className="h-32 w-40 mt-5 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col space-y-6 w-full">
              <div className="flex flex-col items-center lg:items-start">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="bg-gray-100 w-full max-w-md py-2 px-3 rounded-md shadow-sm text-center lg:text-left">
                  <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="bg-gray-100 w-full max-w-md py-2 px-3 rounded-md shadow-sm text-center lg:text-left">
                  <h2 className="text-lg font-semibold text-gray-800">{email}</h2>
                </div>
              </div>
              <div className="flex justify-center mt-8 lg:justify-start">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
