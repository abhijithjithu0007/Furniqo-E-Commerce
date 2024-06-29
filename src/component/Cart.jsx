import React, { useContext, useState, useEffect } from 'react';
import { Mycontext } from './SignUp';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";


const Cart = () => {
  const { myCart, setMyCart } = useContext(Mycontext);
  const [showPopup, setShowPopup] = useState(false);

  const handleRemove = (key) => {
    const remove = myCart.filter((val) => val.id !== key);
    setMyCart(remove);
  };


  const handleRemoveAll = () => {
    setMyCart([]);
  };

  const increment = (key) => {
    const updatedCart = myCart.map((item) => {
      if (item.id === key) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setMyCart(updatedCart);
  };

  const decrement = (key) => {
    const updatedCart = myCart.map((item) => {
      if (item.id === key && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setMyCart(updatedCart);
  };

  const openCheckoutPopup = () => {
    setShowPopup(true);
  };

  const closeCheckoutPopup = () => {
    setShowPopup(false);
  };
  const value = localStorage.getItem('isLogin');
  const isLogin = JSON.parse(value);




  return (
    <div className="container mx-auto p-4">
      {myCart.length === 0 ? (
        <p className="text-center text-2xl text-gray-500">Your cart is empty!</p>
      ) : (
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <Link to={'/collections'}>
              <div className='flex text-btnColor'>
                <FaArrowLeft className='mt-1 mr-2' />
                <p >Continue shopping</p>
              </div>
            </Link>
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </div>
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="flex-1">
              <div className="border-b border-gray-300 pb-4 mb-4">
                {myCart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1 ml-4">
                      <h2 className="font-bold">{item.name}</h2>
                      <p className="text-gray-500">${item.price.toFixed(2)}</p>
                      <p className="text-gray-500">{item.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 mr-7">
                      <button onClick={() => decrement(item.id)} className="text-black w-[30px] h-[30px] rounded-3xl bg-btnColor text-xl text-center">-</button>
                      <span className="px-4">{item.quantity}</span>
                      <button onClick={() => increment(item.id)} className="text-black w-[30px] h-[30px] rounded-3xl bg-btnColor text-xl text-center">+</button>
                    </div>
                    <p className="font-bold mr-7">${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => handleRemove(item.id)} className="text-gray-500">
                      <img className='h-6 w-6 ' src="https://cdn-icons-png.flaticon.com/512/106/106830.png" alt="close" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/3 bg-gray-100 p-6 rounded">
              <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
              <div className="flex justify-between mb-2">
                <p>Items</p>
                <p>{myCart.reduce((acc, item) => acc + item.quantity, 0)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Subtotal</p>
                <p >${myCart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Tax</p>
                <p>$5.25</p>
              </div>
              <div className="flex justify-between font-bold mb-4">
                <p>Total</p>
                <p className='text-xl'>${(myCart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 5.25).toFixed(2)}</p>

              </div>
              <button onClick={openCheckoutPopup} className="bg-black text-white w-full py-2 rounded">Proceed to Checkout</button>
              <Link to={'/collections'}> <a href="#" className="block text-center text-gray-600 mt-4">Continue Shopping</a></Link>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-600" onClick={closeCheckoutPopup}>
              <img className='h-6 w-6 ' src="https://cdn-icons-png.flaticon.com/512/106/106830.png" alt="close" />
            </button>
            <div className='h-[200px] overflow-y-scroll'>
              {myCart.map((item, key) => (
                <div key={key} className="flex items-center gap-4 border-b pb-4 mb-4">
                  <img className="w-16 h-16 object-cover rounded" src={item.image} alt={item.name} />
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="flex items-center mt-2">
                      <h2 className="text-xl font-semibold mr-2">${(item.price * item.quantity).toFixed(2)}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 relative">
              <h1 className="text-3xl font-semibold mb-4">Payment</h1>
              <div className="flex items-center mb-4">
                <label htmlFor="card" className="mr-4">Pay with:</label>
                <input type="radio" id="card" name="payment" className="mr-2" />
                <label htmlFor="card" className="mr-4">Card</label>
                <input type="radio" id="upi" name="payment" className="mr-2" />
                <label htmlFor="upi" className="mr-4">UPI</label>
                <input type="radio" id="bank" name="payment" className="mr-2" />
                <label htmlFor="bank">Bank Transfer</label>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Card Number</h3>
                <input type="text" className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4 flex justify-between">
                <div className="mr-4">
                  <h2 className="text-xl font-semibold">Expiration Date</h2>
                  <input type="date" className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">CVV</h2>
                  <input type="number" className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="text-center">
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600">Proceed</button>
              </div>
            </div>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default Cart;
