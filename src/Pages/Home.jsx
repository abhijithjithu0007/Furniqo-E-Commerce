import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer';
import { TiTick } from "react-icons/ti";

const ProductCard = ({ image, title, price }) => (
  <div className="relative border p-4 text-center bg-white shadow-md">
    <img src={image} alt={title} className="w-full h-64 object-cover mb-4" />
    <div className="absolute top-4 left-4 flex flex-col space-y-2">
      <button className="p-2 bg-white rounded-full shadow-md">👁️</button>
      <button className="p-2 bg-white rounded-full shadow-md">❤️</button>
      <button className="p-2 bg-white rounded-full shadow-md">🛒</button>
    </div>
    <h3 className="text-lg font-semibold mt-4">{title}</h3>
    <p className="text-gray-700">${price}</p>
  </div>
);

const Home = () => {
  const products = [
    { image: 'https://i.pinimg.com/564x/cd/0d/03/cd0d037d458637f4164df24443f66a8d.jpg', title: 'Fitness Watch', price: 400 },
    { image: 'https://i.pinimg.com/564x/f8/3a/54/f83a544726e3ea1d89b30f4a7521bdff.jpg', title: 'Smart Watch', price: 500 },
    { image: 'https://i.pinimg.com/564x/ab/8d/e2/ab8de2786ccb53094ff473a34b2f5b4a.jpg', title: 'Formal Shoes', price: 800 },
    { image: 'https://i.pinimg.com/564x/b2/df/26/b2df264160087eaf26fc43f1e81b6d2b.jpg', title: 'Leather Watch', price: 600 },
  ];

  return (
    <div className="bg-cover bg-center relative">
      <img src="https://images.unsplash.com/photo-1471938537155-7de0bd123d0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='absolute -z-10 h-[800px] w-full' />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-start h-screen">
          <div className="md:w-1/2 md:pr-8 mb-40 p-8 rounded-lg">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 font-serif text-black mt-20">
              Because every baby deserves the <span className="text-btnColor">Best.</span>
            </h1>
            <div className="mb-8">
              <div className='flex'>
                <TiTick className='text-2xl text-green-700' />
                <p className="text-lg mb-7 text-black">Premium Products</p>
              </div>
              <div className='flex'>
                <TiTick className='text-2xl text-green-700' />
                <p className="text-lg text-black">Trusted By Everyone</p>
              </div>
            </div>
            <div>
              <Link to={'/collections'}>
                <button className="bg-btnColor text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 mt-6">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">New Arrivals</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
      <Footer />
      
    </div>
  );
};

export default Home;
