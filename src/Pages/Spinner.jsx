import React, { useContext, useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { useLoad } from '../Context/LoadingContext';

const Spinner = () => {
    const [timeleft, setTimeleft] = useState(50);
    

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeleft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000)

        return () => clearInterval(timer);
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <PuffLoader color="red" size={60} />
            <p className="mt-4 text-lg text-gray-700">This may take a few moments</p>
            <p className="mt-2 text-sm text-gray-500">Expected time : {timeleft} seconds</p>
        </div>
    );
};

export default Spinner;
