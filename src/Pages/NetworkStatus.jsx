import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NetworkStatus = ({ children }) => {
  const [online, setOnline] = useState(navigator.onLine);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOnline = () => {
        setOnline(true)
    };

    const handleOffline = () => {
        setOnline(false)
      navigate('/offline')
    };

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    };
  }, [navigate]);

  return online ? children : null;
};

export default NetworkStatus;
