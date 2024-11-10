import React from "react";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import Testimonials from "../Components/Testimonials";
import homelogo from "../assets/homeBg.png";

const Home = () => {
  return (
    <div className="bg-[#fdfdfd] bg-cover bg-center relative">
      <style>
        {`
          @keyframes floatImage {
            0% {
              transform: translate(0);
            }
            50% {
              transform: translateY(-2.4rem);
            }
            100% {
              transform: translateY(0);
            }
          }

          .float-image {
            animation: floatImage 4s ease-in-out infinite;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center justify-between h-screen">
        <div className="md:w-1/2 w-full">
          <img src={homelogo} alt="" className="w-[650px] float-image" />
        </div>
        <div className="scrollsample md:w-1/2 md:pr-8 mb-40 p-8 rounded-lg">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight mb-5 text-richCharcoal md:mt-20">
            Elegant furniture for{" "}
            <span className="text-deepTeal">
              modern living.
            </span>
          </h1>
          <p className="text-lg font-sans text-gray-600 mb-6">
            Discover stylish, high-quality furniture that transforms any space
            into a cozy and modern home. Our collection combines comfort,
            durability, and design for every room.
          </p>
          <div className="mb-8">
            <div className="flex">
              <TiTick className="text-2xl text-terracotta" />
              <p className="text-lg mb-3 text-richCharcoal">
                Stylish & Durable
              </p>
            </div>
            <div className="flex">
              <TiTick className="text-2xl text-terracotta" />
              <p className="text-lg text-richCharcoal">
                Perfect for Every Home
              </p>
            </div>
          </div>
          <Link to={"/category"}>
            <button className="bg-gray-200 text-black border border-black text-sm uppercase py-3 px-6 mr-2 transition-all duration-300 hover:bg-black hover:text-white">
              View More
            </button>
          </Link>
        </div>
      </div>

      <Testimonials />
    </div>
  );
};

export default Home;
