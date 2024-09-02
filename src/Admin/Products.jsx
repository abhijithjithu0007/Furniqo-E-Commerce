import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { LuPlusCircle } from "react-icons/lu";

const Products = () => {
  const [productData, setProductData] = useState([]);
  const [all, setAll] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ecommerce-backend-r65b.onrender.com/api/admin/allproducts', { withCredentials: true });
        setProductData(response.data);
        setAll(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
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
      const response = await axios.post('https://ecommerce-backend-r65b.onrender.com/api/admin/addproduct', productDetails, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
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
      const response = await axios.put(`https://ecommerce-backend-r65b.onrender.com/api/admin/updateproduct/${editProductId}`, productDetails, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
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
    setProductDetails({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
    });
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
      category: productToEdit.category,
    });
    setShowPopup(true);
  };

  const handleDelete = async (proID) => {
    try {
      const resp = await axios.delete(`https://ecommerce-backend-r65b.onrender.com/api/admin/deleteproduct/${proID}`, {
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

  const handleAll = async () => {
    setProductData(all);
  };

  const handleCategory = async (cate) => {
    try {
      const resp = await axios.get(`https://ecommerce-backend-r65b.onrender.com/api/admin/category/${cate}`, { withCredentials: true });
      setProductData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <h2 className="text-3xl font-bold mb-6 text-white">Categories</h2>
          <div className="space-y-4">
            <button
              onClick={() => setShowPopup(true)}
              className="flex items-center justify-center w-full py-3 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition-all"
            >
              <LuPlusCircle className="mr-2" />
              Add Product
            </button>
            <button onClick={() => handleCategory('Baby boy')} className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
              Baby Boys
            </button>
            <button onClick={() => handleCategory('Baby girl')} className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
              Baby Girls
            </button>
            <button onClick={handleAll} className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
              All Products
            </button>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productData.map((item) => (
              <div key={item._id} className="bg-gray-800 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                {!item.deleted && (
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover mb-4 rounded-md"
                    />
                    <h3 className="text-xl font-semibold text-center text-white">{item.name}</h3>
                    <p className="text-green-400 text-lg font-bold text-center my-2">Rs: {item.price}</p>
                    <div className="flex justify-center gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="bg-white text-black px-4 py-2 rounded-md hover:bg-teal-600 flex items-center"
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
                      >
                        <MdDeleteForever className="mr-1 text-lg" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {showPopup && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h3 className="text-2xl font-semibold mb-4 text-white">{editMode ? 'Edit Product' : 'Add Product'}</h3>
                <input
                  type="text"
                  name="name"
                  className="border border-gray-600 p-2 mb-4 w-full rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Product Name"
                  value={productDetails.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="price"
                  className="border border-gray-600 p-2 mb-4 w-full rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Price"
                  value={productDetails.price}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="image"
                  className="border border-gray-600 p-2 mb-4 w-full rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Image URL"
                  value={productDetails.image}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="category"
                  className="border border-gray-600 p-2 mb-4 w-full rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Category"
                  value={productDetails.category}
                  onChange={handleChange}
                />
                <textarea
                  name="description"
                  className="border border-gray-600 p-2 mb-4 w-full rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Description"
                  value={productDetails.description}
                  onChange={handleChange}
                />
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleSave}
                    className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-all"
                  >
                    {editMode ? 'Save Changes' : 'Add Product'}
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
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
