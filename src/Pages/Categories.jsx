import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import axios from 'axios';
import { useLoad } from '../Context/LoadingContext';
import axiosInstance from '../axiosInstance';

const Categories = () => {
  const { startLoad, stopLoad } = useLoad(useContext)
  const [cate, setCate] = useState([]);
  const [fullFilter, setFullFilter] = useState(false);
  const [sort, setSort] = useState('');
  const [products, setProducts] = useState([]);

  const handleCategory = (category) => {
    const filtering = products.filter((item) => item.category === category);
    setCate(filtering);
    setFullFilter(true);
  };

  const handleAll = () => {
    setCate(products);
    setFullFilter(false);
  };

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  const sortedProducts = () => {
    let sorted = fullFilter ? [...cate] : [...products];

    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return sorted;
  };

  useEffect(() => {
    const fetchData = async () => {
      startLoad()
      try {
        const resp = await axiosInstance.get(`/api/user/allproducts`);
        setProducts(resp.data);
      } catch (error) {
        console.log(error);
      } finally {
        stopLoad()
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 pr-4 mb-8 md:mb-0">
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-btnColor">Categories</h2>
          <div className="flex flex-col space-y-2 p-4 md:p-10">
            <button
              onClick={handleAll}
              className="flex items-center bg-gray-200 text-black gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-greenColor duration-300 hover:gap-2 hover:translate-x-3 scroll-reveal"
            >
              All
            </button>
            <button
              onClick={() => handleCategory("Dining Room")}
              className="flex items-center bg-gray-200 text-black gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-greenColor duration-300 hover:gap-2 hover:translate-x-3 scroll-reveal"
            >
             Dining Room
            </button>
            <button
              onClick={() => handleCategory("Living Room")}
              className="flex items-center bg-gray-200 text-black gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-greenColor duration-300 hover:gap-2 hover:translate-x-3 scroll-reveal"
            >
              Living Room
            </button>
            <button
              onClick={() => handleCategory("Office")}
              className="flex items-center bg-gray-200 text-black gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-greenColor duration-300 hover:gap-2 hover:translate-x-3 scroll-reveal"
            >
             Office
            </button>
            <button
              onClick={() => handleCategory("Bedroom")}
              className="flex items-center bg-gray-200 text-black gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-greenColor duration-300 hover:gap-2 hover:translate-x-3 scroll-reveal"
            >
             Bedroom
            </button>
            <button
              onClick={() => handleCategory("Outdoor")}
              className="flex items-center bg-gray-200 text-black gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-greenColor duration-300 hover:gap-2 hover:translate-x-3 scroll-reveal"
            >
             Outdoor
            </button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 border-b-2 pb-2">
          <h2 className="text-2xl font-semibold mb-4 md:mb-0">Products</h2>
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="font-semibold text-gray-700">Sort By:</label>
            <select
              id="sort"
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts().map((item, id) => (
            <Link to={`/category/${item._id}`} key={id} className="w-full">
              <div className="flex justify-center">
                <div className="max-w-xs md:max-w-sm">
                  <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
                    <img className="rounded-t-lg md:h-[250px] w-full object-cover" src={item.image} alt={item.name} />
                    <div className="py-6 px-4 md:px-8 rounded-lg bg-white">
                      <h1 className="text-gray-700 font-bold text-lg md:text-2xl mb-3 hover:text-gray-900 hover:cursor-pointer">{item.name}</h1>
                      <p className="text-gray-700 text-sm md:text-base tracking-wide">{item.description}</p>
                      <p className="text-yellow-500 text-xl md:text-2xl">{'★'.repeat(item.stars)}{'☆'.repeat(5 - item.stars)}</p>
                    </div>
                    <div className="absolute top-2 right-2 py-2 px-4 bg-homeBg rounded-lg">
                      <span className="text-md md:text-lg">₹{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
