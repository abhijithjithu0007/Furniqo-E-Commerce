import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';

const Cart = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const navigate = useNavigate();
  const [myPro, setMyPro] = useState([])
  const userdetails = localStorage.getItem('currentUser')
  const currentUser = JSON.parse(userdetails);


  useEffect(() => {
    const fetData = async () => {
      const resp = await axios.get(`http://localhost:5000/api/user/viewcartproducts/${currentUser.id}`,
        { withCredentials: true }
      )
      const data = resp.data.products
      setMyPro(data)
      console.log(resp.data.products[0].product);
    }

    fetData()
  }, [])


  const increment = async (productId, action) => {
    console.log(productId);

    try {
      const resp = await axios.put('http://localhost:5000/api/user/updateproquantity', {
        productId: productId,
        action: action
      }, { withCredentials: true })
      const data = resp.data.products

      setMyPro(data)
    } catch (error) {
      console.log(error);
    }
  }
  const decrement = async (productId, action) => {

    try {
      const resp = await axios.put('http://localhost:5000/api/user/updateproquantity', {
        productId: productId,
        action: action
      }, { withCredentials: true })
      const data = resp.data.products

      setMyPro(data)
    } catch (error) {
      console.log(error);
    }
  }



  const handleRemove = async (productId) => {
    try {
      const resp = await axios.delete('http://localhost:5000/api/user/removefromcart', {
        data: { productId: productId },
        withCredentials: true

      });
      const data = resp.data.products

      setMyPro(data)
    } catch (error) {
      console.log(error);
    }
  };


  const openCheckoutPopup = () => {
    setShowPopup(true);
  };

  const closeCheckoutPopup = () => {
    setShowPopup(false);
  };

  const handlePay = () => {
    alert("Payment Successful");
    navigate('/category');
    setMyPro([]);
  };


  return (
    <div className="container mx-auto p-4">
      {myPro.length === 0 ? (
        <div>
          <p className="text-center text-2xl text-gray-500">Your cart is empty!</p>
          <Link to={'/category'}>
            <p className='text-center text-red-400 mt-10 underline'>Add some products! Click here</p>
          </Link>
        </div>
      ) : (
        <div className="container mx-auto ">
          <div className="flex justify-between items-center mb-4">
            <Link to={'/category'}>
              <div className='flex text-btnColor'>
                <FaArrowLeft className='mt-1 mr-2' />
                <p>Continue shopping</p>
              </div>
            </Link>
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </div>
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="flex-1">
              <div className="border-b border-gray-300 pb-4 mb-4">
                {myPro.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-4">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1 ml-4">
                      <h2 className="font-bold">{item.product.name}</h2>
                      <p className="text-gray-500">₹{item.product.price}</p>
                      <p className="text-yellow-500 text-sm">{'★'.repeat(item.stars)}{'☆'.repeat(5 - item.stars)}</p>
                    </div>
                    <div className="flex-row items-center space-x-2 sm:space-x-0 sm:space-y-2 mr-7 sm:mr-0 sm:flex-col">
                      <button onClick={() => decrement(item.product._id, "decrement")} className="text-black w-[30px] h-[30px] rounded-3xl bg-btnColor text-xl text-center sm:flex-col ">-</button>
                      <span className="px-1">{item.quantity}</span>
                      <button onClick={() => increment(item.product._id, "increment")} className="text-black w-[30px] h-[30px] rounded-3xl bg-btnColor text-xl text-center sm:flex-col">+</button>
                    </div>
                    <p className="font-bold mr-7">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => handleRemove(item.product._id)} className="text-gray-500">
                      <img className='h-6 w-6' src="https://cdn-icons-png.flaticon.com/512/106/106830.png" alt="close" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/3 bg-gray-100 p-6 rounded h-1/2">
              <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
              <div className="flex justify-between mb-2">
                <p>Items</p>
                <p>{myPro.reduce((acc, item) => acc + item.quantity, 0)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Subtotal</p>
                <p>₹{myPro.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>GST</p>
                <p>₹5.25</p>
              </div>
              <div className="flex justify-between font-bold mb-4">
                <p>Total</p>
                <p className='text-xl'>₹{(myPro.reduce((acc, item) => acc + item.price * item.quantity, 0) + 5.25).toFixed(2)}</p>
              </div>
              <button onClick={openCheckoutPopup} className="bg-black text-white w-full py-2 rounded">Proceed to Checkout</button>
              <Link to={'/category'} className="block text-center text-gray-600 mt-4">Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-600" onClick={closeCheckoutPopup}>
              <img className='h-6 w-6' src="https://cdn-icons-png.flaticon.com/512/106/106830.png" alt="close" />
            </button>
            <div className='h-[200px] overflow-y-scroll'>
              {myPro.map((item, id) => (
                <div key={id} className="flex items-center gap-4 border-b pb-4 mb-4">
                  <img className="w-16 h-16 object-cover rounded" src={item.image} alt={item.name} />
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="flex items-center mt-2">
                      <h2 className="text-xl font-semibold mr-2">₹{(item.price * item.quantity).toFixed(2)}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
              <div className="flex justify-around">
                <label className="flex flex-col items-center">
                  <img
                    src="https://www.yesbank.in/content/published/api/v1.1/assets/CONT5B67344201F14EB887CF99754FB0F6F8/native/BYOC-CARD.png?channelToken=580bc0ffbe3a47d690505e5f6d06e1c8"
                    alt="Card"
                    className={`w-16 h-16 cursor-pointer ${paymentMethod === 'card' ? 'border-2 border-btnColor rounded-full' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  />
                  <span className="mt-2">Card</span>
                </label>
                <label className="flex flex-col items-center">
                  <img
                    src="https://m.economictimes.com/thumb/msid-74960608,width-1200,height-900,resizemode-4,imgsize-49172/upi-twitter.jpg"
                    alt="UPI"
                    className={`w-16 h-16 cursor-pointer ${paymentMethod === 'upi' ? 'border-2 border-btnColor rounded-full' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  />
                  <span className="mt-2">UPI</span>
                </label>
                <label className="flex flex-col items-center">
                  <img
                    src="https://okcredit-blog-images-prod.storage.googleapis.com/2021/05/cashondelivery1.jpg"
                    alt="Cash on Delivery"
                    className={`w-16 h-16 cursor-pointer ${paymentMethod === 'cod' ? 'border-2 border-btnColor rounded-full' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                  />
                  <span className="mt-2">COD</span>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="block w-full border rounded-md p-2"
                  />

                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="block w-full border rounded-md p-2"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-1/2 border rounded-md p-2"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-1/2 border rounded-md p-2"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="UPI ID"
                    className="block w-full border rounded-md p-2"
                  />
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Delivery Address"
                    className="block w-full border rounded-md p-2"
                  />
                  <div className='flex'>
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="block w-full border rounded-md p-2 mt-2"
                    />
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="block w-full border rounded-md p-2 mt-2"
                    />
                  </div>
                </div>
              )}

              <button onClick={handlePay} className="w-full bg-btnColor text-white rounded-md py-2">
                Pay ₹{(myPro.reduce((acc, item) => acc + item.price * item.quantity, 0) + 5.25).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;