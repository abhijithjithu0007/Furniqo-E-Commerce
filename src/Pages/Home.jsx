import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import Testimonials from '../Components/Testimonials';
import AOS from 'aos';
import 'aos/dist/aos.css';
import homelogo from '../assets/homelogo.jpg';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  

  const products = [
    { image: 'https://i.pinimg.com/736x/92/0b/00/920b007e46b66701c93329b45add89b6.jpg', title: 'Sofa Set', price: 5499 },
    { image: 'https://i.pinimg.com/736x/96/1e/89/961e89091da0344fc7f4afed81b8c671.jpg', title: 'Dining Table', price: 2399 },
    { image: 'https://i.pinimg.com/564x/cd/81/3d/cd813d1be87b619b65d84c37e5d2eef8.jpg', title: 'Office Chair', price: 1500 },
    { image: 'https://i.pinimg.com/564x/e7/39/d1/e739d1d5ca2167475d1429fe77257428.jpg', title: 'Bookshelf', price: 1590 },
  ];

  return (
    <div className="bg-gray-50 bg-cover bg-center relative"> 
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center justify-between h-screen">
        <div className="md:w-1/2 w-full">
          <img src={homelogo} alt="" className="w-[650px]" data-aos="fade-right" />
        </div>
        <div className="scrollsample md:w-1/2 md:pr-8 mb-40 p-8 rounded-lg" data-aos="fade-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-richCharcoal md:mt-20">
            Elegant furniture for <span className="text-deepTeal">modern living.</span>
          </h1>
          <div className="mb-8">
            <div className="flex" data-aos="fade-up">
              <TiTick className="text-2xl text-terracotta" />
              <p className="text-lg mb-7 text-richCharcoal">Stylish & Durable</p>
            </div>
            <div className="flex" data-aos="fade-up" data-aos-delay="100">
              <TiTick className="text-2xl text-terracotta" />
              <p className="text-lg text-richCharcoal">Perfect for Every Home</p>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <Link to={'/category'}>
              <button className="bg-gray-200 text-black border border-black text-sm uppercase py-3 px-6 mr-2 transition-all duration-300 hover:bg-black hover:text-white">
                View More
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-mist py-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-richCharcoal" data-aos="zoom-in">Upcoming Arrivals</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="relative border p-4 text-center bg-white shadow-md" data-aos="flip-left" data-aos-delay={index * 100}>
              <img src={product.image} alt={product.title} className="w-full h-64 object-cover mb-4" />
             
              <h3 className="text-lg font-semibold mt-4 text-richCharcoal">{product.title}</h3>
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
