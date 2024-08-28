// Products.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to configure axios base URL if needed
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { LuPlusCircle } from "react-icons/lu";

const Products = () => {
  const [productData, setProductData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [productDetails, setProductDetails] = useState({name: '',description: '',price: '',image: '',category: ''});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/allproducts',{withCredentials:true}); // Adjust endpoint as needed
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const addProduct = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/addproduct', productDetails, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials:true
      });

      if (response.status === 200) {
        setProductData((prevState) => [...prevState, response.data]);
        alert('Product added successfully!');
        resetForm();
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const editProduct = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/updateproduct/${editProductId}`, productDetails, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials:true
      });

      if (response.status === 200) {
        const updatedProducts = productData.map((product) =>
          product._id === editProductId ? response.data : product
        );
        setProductData(updatedProducts);
        alert('Product updated successfully!');
        resetForm();
      }
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleSave = () => {
    if (editMode) {
      editProduct();
    } else {
      addProduct();
    }
  };

  const resetForm = () => {
    setShowPopup(false);
    setEditMode(false);
    setEditProductId(null);
    setProductDetails({name: '',description: '',price: '',image: '',category: ''});
  };

  const handleEdit = (productId) => {
    setEditMode(true);
    setEditProductId(productId);
    const productToEdit = productData.find((product) => product._id === productId);
    setProductDetails({
      name: productToEdit.name,
      description: productToEdit.description,
      price: productToEdit.price,
      image: productToEdit.image,
      category: productToEdit.category
    })
    setShowPopup(true);
  };

  const handleDelete = async (proID) => {
    try {
      const resp = await axios.delete(`http://localhost:5000/api/admin/deleteproduct/${proID}`, {
        withCredentials: true,
      });
      if (resp.status === 200) {
        const updatedProducts = productData.map((product) =>
          product._id === proID ? { ...product, deleted: true } : product
        );
        setProductData(updatedProducts);
        alert('Product temporarily deleted');
      }
    } catch (error) {
      console.log(error);
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
                <button onClick={() => setShowPopup(true)} className="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition duration-300 ease-in-out">
                  <span className="mr-2">Add</span>
                  <LuPlusCircle />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productData.map((item) => (
              <div key={item._id}>
                {!item.deleted && (
                  <div className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-4 rounded" />
                    <h2 className="text-lg font-semibold mb-2 text-center">{item.name}</h2>
                    <p className="text-green-600 font-semibold mb-2 text-center">Rs : {item.price}</p>
                    <div className="flex justify-center mt-2 space-x-4">
                      <button onClick={() => handleEdit(item._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
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
                  value={productDetails.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="price"
                  className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Price"
                  value={productDetails.price}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="image"
                  className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Image URL"
                  value={productDetails.image}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="category"
                  className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Category"
                  value={productDetails.category}
                  onChange={handleChange}
                />
                <textarea
                  name="description"
                  className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description"
                  value={productDetails.description}
                  onChange={handleChange}
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2"
                  >
                    {editMode ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    onClick={resetForm}
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
  )}

  export default Products