import React from 'react';
import { useNavigate } from 'react-router-dom';

const OfflinePage = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (navigator.onLine) {
      navigate(-1)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">You Are Offline</h1>
      <p className="text-lg mt-4 text-gray-700">
        It seems your internet connection is lost. Please check your connection and try again.
      </p>
      <button
        onClick={handleRetry}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Retry
      </button>
    </div>
  );
};

export default OfflinePage;
