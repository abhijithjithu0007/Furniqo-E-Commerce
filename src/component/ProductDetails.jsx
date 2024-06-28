import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Mycontext } from '../Pages/SignUp';

const ProductDetails = () => {
  const params = useParams();
  const { myCart, setMyCart, api } = useContext(Mycontext);
  const [carts] = api.filter((val) => params.id == val.id);
  
  const addToCart = () => {
    const newCartItem = {
      id: carts.id,
      name: carts.name,
      price: carts.price,
      description: carts.description,
      image: carts.image,
      category: carts.category,
      quantity: 1 
    };
  
      setMyCart([...myCart, newCartItem]);
    
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const related = api.filter((rel) => rel.category === carts.category);

  return (
    <div>
      <div className="flex justify-center items-center h-[500px] w-800">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-8 bg-gray-100">
              <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{carts.name}</h1>
              <p className="mt-2 text-gray-500">{carts.description}</p>
              <p>Category : {carts.category}</p>
              <p className="text-red-600 p-2">Price : ${carts.price}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                </div>
                <button onClick={addToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 ml-6 px-4 rounded">
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="md:flex-shrink-0">
              <img className="h-60 w-full object-cover md:w-60" src={carts.image} alt={carts.name} />
            </div>
          </div>
        </div>
      </div>
      <div className="related-products text-center my-8">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="related-items flex flex-wrap justify-center">
          {related.map((item, key) => (
            <Link to={`/collections/${item.id}`} key={key}>
              <div onClick={scrollToTop} className="related-item border rounded-lg m-4 p-4 w-64 shadow-lg transform transition-transform hover:scale-105">
                <img src={item.image} alt={item.name} className="related-item-image w-full h-48 object-cover rounded-md" />
                <h2 className="related-item-name text-lg font-semibold mt-4">{item.name}</h2>
                <h3 className="related-item-price text-green-500 text-xl mt-2">${item.price}</h3>
                <p className="related-item-description text-gray-600 mt-2">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
