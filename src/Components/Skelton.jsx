import React from "react";

export default function Skelton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div className="animate-pulse bg-white shadow-lg rounded-lg p-6">
        <div className="h-48 bg-gray-300 rounded-md mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-1/2"></div>
      </div>

      <div className="animate-pulse bg-white shadow-lg rounded-lg p-6">
        <div className="h-48 bg-gray-300 rounded-md mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-1/2"></div>
      </div>

      <div className="animate-pulse bg-white shadow-lg rounded-lg p-6">
        <div className="h-48 bg-gray-300 rounded-md mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}
