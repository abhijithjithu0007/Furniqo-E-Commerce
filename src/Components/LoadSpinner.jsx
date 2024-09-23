import React from 'react';
import { RingLoader } from 'react-spinners';
import { useLoad } from '../Context/LoadingContext';

const LoadSpinner = () => {
  const { load } = useLoad();
  if (!load) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 transition-opacity duration-300">
      <RingLoader color="#FF6347" size={80} speedMultiplier={1.5} />
    </div>
  );
};

export default LoadSpinner;
