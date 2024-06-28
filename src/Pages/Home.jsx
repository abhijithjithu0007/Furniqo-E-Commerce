import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center">

          <div className="md:w-1/2 md:pr-8 mb-40">
            <div className="">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                Because every baby deserves the <span className="text-blue-700">Best.</span>
              </h1>
            </div>
            <div className="mb-8">
              <p className="text-lg mb-7">Premium Products</p>
              <p className="text-lg">Trusted By Everyone</p>
            </div>
            <div>
              <Link to={'/collections'}> <button className="bg-blue-700 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 mt-6">
                Shop Now
              </button>
              </Link>
            </div>
          </div>


          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://i.pinimg.com/564x/48/67/a1/4867a1c1a715913cbb7aabf187f4efa5.jpg"
              alt="Baby Products"
              className="rounded-lg shadow-lg h-500 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
