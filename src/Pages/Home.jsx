import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import Testimonials from '../component/Testimonials';
import AOS from 'aos';
import 'aos/dist/aos.css';
import homelogo from '../assets/homelogo.jpg';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000,once:false });
  }, []);

  const products = [
    { image: 'https://i.pinimg.com/564x/cd/0d/03/cd0d037d458637f4164df24443f66a8d.jpg', title: 'Baby Outfit Combo', price: 549 },
    { image: 'https://i.pinimg.com/564x/f8/3a/54/f83a544726e3ea1d89b30f4a7521bdff.jpg', title: 'Baby Outfit', price: 239 },
    { image: 'https://i.pinimg.com/564x/85/c8/97/85c897924575c0d4218252813c83ed20.jpg', title: 'Formal Chappal', price: 150 },
    { image: 'https://i.pinimg.com/564x/ae/a6/16/aea6164a443d94c289e533a481120a5f.jpg', title: 'Product Kit', price: 590 },
  ];

  return (
    <div className="bg-cover bg-homeBg bg-center relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center justify-between h-screen">
        <div className="md:w-1/2 w-full">
          <img src={homelogo} alt="" className="w-[500px]" data-aos="fade-right" />
        </div>
        <div className="scrollsample md:w-1/2 md:pr-8 mb-40 p-8 rounded-lg" data-aos="fade-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-black md:mt-20">
            Because every baby deserves the <span className="text-btnColor">Best.</span>
          </h1>
          <div className="mb-8">
            <div className="flex" data-aos="fade-up">
              <TiTick className="text-2xl text-green-700" />
              <p className="text-lg mb-7 text-black">Premium Products</p>
            </div>
            <div className="flex" data-aos="fade-up" data-aos-delay="100">
              <TiTick className="text-2xl text-green-700" />
              <p className="text-lg text-black">Trusted By Everyone</p>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <Link to={'/category'}>
              <button className="bg-btnColor text-white py-3 px-6 rounded-lg shadow-lg hover:bg-black transition duration-300">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white py-12">
        <h2 className="text-2xl font-bold mb-6 text-center" data-aos="zoom-in">Upcoming Arrivals</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="relative border p-4 text-center bg-white shadow-md" data-aos="flip-left" data-aos-delay={index * 100}>
              <img src={product.image} alt={product.title} className="w-full h-64 object-cover mb-4" />
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                <button className="p-2 bg-white rounded-full shadow-md">👁️</button>
                <button className="p-2 bg-white rounded-full shadow-md">❤️</button>
                <button className="p-2 bg-white rounded-full shadow-md">🛒</button>
              </div>
              <h3 className="text-lg font-semibold mt-4">{product.title}</h3>
              <p className="text-gray-700">₹{product.price}</p>
            </div>
          ))}
        </div>
      </div>
      <Testimonials />
    </div>
  );
};

export default Home;
