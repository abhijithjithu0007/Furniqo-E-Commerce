
import React, { useContext, useState } from 'react';
import { Mycontext } from '../Pages/SignUp';

const Cart = () => {
  const { myCart } = useContext(Mycontext);
  console.log(myCart);
  const [removeAll, setRemoveAll] = useState(true)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">This is the cart</h1>
      {myCart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 md:pr-4">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">My cart</h2>
              <a href="#" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Remove all</a>
            </div>
            <div>
              {myCart.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-4 border-b pb-4 hover:bg-gray-100 transition duration-300">
                  <div className="flex items-center">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                    </div>
                    <div className="ml-4">
                      <h1 className="text-lg font-semibold">{item.name}</h1>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded">-</button>
                    <h4 className="px-4">{item.quantity}</h4>
                    <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded">+</button>
                  </div>
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold">${item.price}</h2>
                    <a href="#" className="text-red-500 ml-4 hover:text-red-600">remove</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/3 mt-8 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <h4 className="text-gray-700">Total Items</h4>
              <h4 className="font-semibold">{myCart.length}</h4>
            </div>
            <div className="flex justify-between mb-4">
              <h4 className="text-gray-700">Price</h4>
              <h4 className="font-semibold">${(myCart.reduce((total, item) => total + item.price * item.quantity, 0))}</h4>

            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Promo Code</h2>
              <div className="flex">
                <input type="text" placeholder="Enter your code" className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600">Apply</button>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Total Cost</h2>
              <h1 className="text-2xl font-bold"><h4 className="font-semibold">${Math.floor(myCart.reduce((total, item) => total + item.price * item.quantity, 0))}</h4>
              </h1>
            </div>
            <div className="text-center">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
