import React, { useState } from 'react';

const SessionExpired = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 min-w-screen z-50">
      <div className="relative bg-white max-w-sm mx-auto rounded-lg shadow-lg">
        <div className="flex items-center justify-center p-4 border-b border-gray-200">
         
          <svg className="w-6 h-6 text-btnColor fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
          </svg>
          <span className="ml-2 text-lg font-bold text-gray-700">Session Expired</span>
        </div>

        <div className="px-6 py-4 text-gray-600 text-center">
          <p>Your session has expired. Please log in again.</p>
        </div>

        <div className="flex justify-end p-4 border-t border-gray-300">
          <button className="px-3 py-2 text-sm bg-btnColor text-white rounded-xl transition duration-150 hover:text-gray-700" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpired;
