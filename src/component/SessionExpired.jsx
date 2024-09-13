import React from 'react';
import { useNavigate } from 'react-router-dom';

const SessionExpired = () => {
  const navigate = useNavigate();

  const handleToLogin = () => {
    navigate('/login')
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Session Expired</h2>
        <p className="mb-4">Your session has expired. Please log in again to continue.</p>
        <button
          onClick={handleToLogin}
          className="px-4 py-2 bg-btnColor text-white rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SessionExpired;



  
