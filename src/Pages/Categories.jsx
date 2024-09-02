import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import axios from 'axios';

const Categories = () => {

  useEffect(() => {
    const sr = ScrollReveal();

    sr.reveal('.scroll-reveal', {
      delay: 100,
      distance: '50px',
      origin: 'bottom',
      interval: 100,
      reset: true
    });

    return () => {
      sr.destroy();
    };
  }, []);

  const [cate, setCate] = useState([]);
  const [fullFilter, setFullFilter] = useState(false);
  const [sort, setSort] = useState('');
  const [products, setProducts] = useState([])

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
    const fetData = async () => {
      try {
        const resp = await axios.get('https://ecommerce-backend-r65b.onrender.com/api/user/allproducts')
        setProducts(resp.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetData()
  }, [])



  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row ">
      <div className="w-full md:w-1/4 pr-4 mb-8 md:mb-0">
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-btnColor">Categories</h2>
          <div className="flex flex-col space-y-2 p-10">
            <button
              onClick={handleAll}
              className="flex items-center bg-gray-200 text-black gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-greenColor duration-300 hover:gap-2 hover:translate-x-3 scroll-reveal"
            >
              All
            </button>
            <button
              onClick={() => handleCategory("Baby boy")}
              className="flex items-center bg-gray-200 text-black gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-greenColor duration-300 hover:gap-2 hover:translate-x-3 scroll-reveal"
            >
              Boys Fashion
            </button>
            <button
              onClick={() => handleCategory("Baby girl")}
              className="flex items-center bg-gray-200 text-black gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-greenColor duration-300 hover:gap-2 hover:translate-x-3 scroll-reveal"
            >
              Girls Fashion
            </button>

          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4">
        <div className="flex justify-between items-center mb-4 border-b-2 pb-2">
          <h2 className="text-2xl font-semibold">Products</h2>
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
              <div class="container flex justify-center">
                <div class="max-w-sm ">
                  <div class="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
                    <img class="rounded-t-lg md:h-[250px] w-72" src={item.image} alt="" />
                    <div class="py-6 px-8 rounded-lg bg-white">
                      <h1 class="text-gray-700 font-bold text-2xl mb-3 hover:text-gray-900 hover:cursor-pointer">{item.name}</h1>
                      <p class="text-gray-700 tracking-wide">{item.description}</p>
                      <p className="text-yellow-500 text-2xl">{'★'.repeat(item.stars)}{'☆'.repeat(5 - item.stars)}</p>
                    </div>
                    <div class="absolute top-2 right-2 py-2 px-4 bg-homeBg rounded-lg">
                      <span class="text-md">₹{item.price}</span>
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
//