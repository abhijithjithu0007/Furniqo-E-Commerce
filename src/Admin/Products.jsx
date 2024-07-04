import React, { useContext, useState } from 'react';
import { Mycontext } from '../component/SignUp';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Admincontext } from './ContextAdmin';
import useFetchProducts from '../component/CoustumeHook';

const Products = () => {
  const { products, loading, error } = useFetchProducts();
  const [productData, setProductData] = useState(products || []);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [validate, setValidate] = useState()

  const handleCategory = (category) => {
    const filtering = products.filter((item) => item.category === category);
    setProductData(filtering);
    setActiveCategory(category);
  };

  const handleAll = () => {
    setProductData(products || []);
    setActiveCategory('All');
  };

  const handleDelete = (myId) => {
    const deleted = productData.filter((val) => val.id !== myId);
    setProductData(deleted);
  };

  const handleAddNew = () => {
    setShowPopup(true);
  };




  const handleChange = (e) => {
    const { name, value } = e.target;
    setValidate({ ...validate, [name]: value });
    console.log(validate);
  };

  

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 pr-4 mb-8 md:mb-0">
          <div className="mb-8 space-y-4">
            <div className='flex items-center mb-4'>
              <h2 className="text-2xl font-semibold mb-4">Categories</h2>
              <button onClick={handleAddNew} className='bg-gray-400 px-4 py-2 rounded-lg text-white hover:bg-gray-500'>
                Add New
              </button>
            </div>

            <div className="flex flex-col space-y-2 p-4 bg-white rounded-lg shadow-md">
              <button
                className={`flex items-center gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md duration-300 ${activeCategory === 'All' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black hover:bg-green-500 hover:text-white'}`}
                onClick={handleAll}
              >
                All
              </button>
              <button
                onClick={() => handleCategory('Boy fashion')}
                className={`flex items-center gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md duration-300 ${activeCategory === 'Boy fashion' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black hover:bg-green-500 hover:text-white'}`}
              >
                Boys Fashion
              </button>
              <button
                onClick={() => handleCategory('Girl fashion')}
                className={`flex items-center gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md duration-300 ${activeCategory === 'Girl fashion' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black hover:bg-green-500 hover:text-white'}`}
              >
                Girls Fashion
              </button>
              <button
                onClick={() => handleCategory('Feeding')}
                className={`flex items-center gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md duration-300 ${activeCategory === 'Feeding' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black hover:bg-green-500 hover:text-white'}`}
              >
                Feeding
              </button>
              <button
                onClick={() => handleCategory('Accessories')}
                className={`flex items-center gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md duration-300 ${activeCategory === 'Accessories' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black hover:bg-green-500 hover:text-white'}`}
              >
                Accessories
              </button>
              <button
                onClick={() => handleCategory('Toys')}
                className={`flex items-center gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md duration-300 ${activeCategory === 'Toys' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black hover:bg-green-500 hover:text-white'}`}
              >
                Toys
              </button>
              <button
                onClick={() => handleCategory('Books')}
                className={`flex items-center gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md duration-300 ${activeCategory === 'Books' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black hover:bg-green-500 hover:text-white'}`}
              >
                Books
              </button>
              <button
                onClick={() => handleCategory('Footwear')}
                className={`flex items-center gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md duration-300 ${activeCategory === 'Footwear' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black hover:bg-green-500 hover:text-white'}`}
              >
                Footwear
              </button>
              <button
                onClick={() => handleCategory('Bed')}
                className={`flex items-center gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md duration-300 ${activeCategory === 'Bed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black hover:bg-green-500 hover:text-white'}`}
              >
                Beds
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4 h-screen overflow-y-scroll">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productData.map((item, id) => (
              <div key={id}>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-4 rounded" />
                  <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                  <p className="text-green-600 font-semibold mb-2">{item.price}</p>
                  <div className="flex justify-between mt-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <input
                  type="text"
                  className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Price"
                  onChange={handleChange}
                />
                <textarea
                  className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Description"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Category"
                  onChange={handleChange}
                />
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
