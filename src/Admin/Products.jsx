import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { LuPlusCircle } from "react-icons/lu";

import useFetchProducts from '../component/CoustumeHook';

const Products = () => {
  const { products, setProducts, loading, error, fetchProducts } = useFetchProducts();
  const [productData, setProductData] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [validate, setValidate] = useState({ name: "", description: "", price: "", image: "", category: "" });

  useEffect(() => {
    setProductData(products || []);
  }, [products]);

  const handleCategory = (category) => {
    const filtering = products.filter((item) => item.category === category);
    setProductData(filtering);
    setActiveCategory(category);
  };

  const handleAll = () => {
    setProductData(products || []);
    setActiveCategory('All');
  };

  const handleDelete = async (myId) => {
    try {
      const response = await fetch(`https://6b6lwvt1-3000.inc1.devtunnels.ms/products/${myId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedProducts = productData.map((product) =>
          product.id === myId ? { ...product, deleted: true } : product
        );
        setProductData(updatedProducts);
        setProducts(updatedProducts.filter(product => !product.deleted))
        alert("Product temporarily deleted");
      } else {
        console.error('Failed to delete the product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddNew = () => {
    setShowPopup(true);
  };

  const handleEdit = (productId) => {
    setEditMode(true);
    setEditProductId(productId);

    const productToEdit = productData.find(product => product.id === productId);
    setValidate({
      name: productToEdit.name,
      description: productToEdit.description,
      price: productToEdit.price,
      image: productToEdit.image,
      category: productToEdit.category,
    });

    setShowPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValidate({ ...validate, [name]: value });
  };

  const handleSave = async () => {
    try {
      let url = 'https://6b6lwvt1-3000.inc1.devtunnels.ms/products';
      let method = 'POST';

      if (editMode && editProductId) {
        url = `https://6b6lwvt1-3000.inc1.devtunnels.ms/products/${editProductId}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...validate,
        }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();

        if (editMode && editProductId) {
          const updatedProducts = productData.map(product =>
            product.id === editProductId ? updatedProduct : product
          );
          setProductData(updatedProducts);
          setProducts(updatedProducts);
          alert("Product updated successfully");
        } else {
          setProductData(prevState => [...prevState, updatedProduct]);
          setProducts(prevState => [...prevState, updatedProduct]);
          alert("Product added successfully");
        }

        setShowPopup(false);
        setEditMode(false);
        setEditProductId(null);
      } else {
        console.error('Failed to save product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 pr-4 mb-8 md:mb-0">
          <div className="mb-8 space-y-4">
            <div className='flex items-center mb-4'>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                <button onClick={handleAddNew} className="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition duration-300 ease-in-out">
                  <span className="mr-2">Add</span>
                  <LuPlusCircle />
                </button>

              </div>
            </div>
            <div className="flex flex-col space-y-2 p-4 bg-white rounded-xl shadow-md">
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
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productData.map((item, id) => (
              <div key={id}>
                {!item.deleted && (
                  <div className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-4 rounded" />
                    <h2 className="text-lg font-semibold mb-2 text-center">{item.name}</h2>
                    <p className="text-green-600 font-semibold mb-2 text-center">{item.price}</p>
                    <div className="flex justify-center mt-2 space-x-4">
                      <button onClick={() => handleEdit(item.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <input
                  type="text"
                  name="name"
                  className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                  value={validate.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="price"
                  className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Price"
                  value={validate.price}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="image"
                  className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Image URL"
                  value={validate.image}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="category"
                  className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Category"
                  value={validate.category}
                  onChange={handleChange}
                />
                <textarea
                  name="description"
                  className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description"
                  value={validate.description}
                  onChange={handleChange}
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowPopup(false);
                      setEditMode(false);
                      setEditProductId(null);
                    }}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600"
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
