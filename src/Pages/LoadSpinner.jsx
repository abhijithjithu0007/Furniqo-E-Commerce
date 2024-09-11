import React from 'react';
import { PuffLoader } from 'react-spinners'
import { useLoad } from '../Context/LoadingContext';

const LoadSpinner = () => {

    const {load} = useLoad()
    if(!load) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <PuffLoader color="#3498db" size={60} />
    </div>
  );
};

export default LoadSpinner;
