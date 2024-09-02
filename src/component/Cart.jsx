import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { cartContext } from './CartContext';

const Cart = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { myPro, setMyPro } = useContext(cartContext);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  const increment = async (productId, action) => {
    try {
      const resp = await axios.put('https://ecommerce-backend-r65b.onrender.com/api/user/updateproquantity', {
        productId: productId,
        action: action
      }, { withCredentials: true });
      const data = resp.data.products;
      setMyPro(data);
    } catch (error) {
      console.log(error);
    }
  };

  const decrement = async (productId, action) => {
    try {
      const resp = await axios.put('https://ecommerce-backend-r65b.onrender.com/api/user/updateproquantity', {
        productId: productId,
        action: action
      }, { withCredentials: true });
      const data = resp.data.products;
      setMyPro(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const resp = await axios.delete('https://ecommerce-backend-r65b.onrender.com/api/user/removefromcart', {
        data: { productId: productId },
        withCredentials: true
      });
      const data = resp.data.products;
      setMyPro(data);
      if (resp.status === 200) {
        toast.success('Removed From Cart', { position: 'top-right' });
      }
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

  const handlePay = async () => {
    try {
      const { data } = await axios.post('https://ecommerce-backend-r65b.onrender.com/api/user/create-order', {}, { withCredentials: true });
      const { razorpayOrderId } = data;

      const options = {
        key: data.razorpayKeyId,
        amount: data.order.totalprice * 100,
        currency: 'INR',
        name: 'Giggles',
        description: 'Test Transaction',
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              'https://ecommerce-backend-r65b.onrender.com/api/user/verify-payment',
              {
                razorpayOrderId: razorpayOrderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            if (verifyResponse.status === 200) {
              Swal.fire('Payment Successful!', 'Your payment was successful.', 'success');
              setMyPro([]);
            } else {
              Swal.fire('Verification Failed!', 'Unable to verify the payment.', 'error');
            }
          } catch (verifyError) {
            console.error('Verification Error:', verifyError);
            Swal.fire('Verification Failed!', 'There was an error verifying your payment.', 'error');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#3399cc'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment Error:', error);
      Swal.fire('Payment Failed!', 'There was an error processing your payment.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center px-4 md:px-8">
      <div className="card mx-auto max-w-6xl w-full shadow-lg rounded-lg border-transparent" data-aos="fade-up">
        {myPro.length === 0 ? (
          <div>
            <p className="text-center text-2xl text-gray-500">Your cart is empty!</p>
            <Link to={'/category'}>
              <p className="text-center text-red-400 mt-10 underline">Add some products! Click here</p>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row">
              <div className="cart bg-white p-5 md:p-10 rounded-t-lg md:rounded-l-lg md:rounded-r-none flex-grow md:w-3/4">
                <div className="title mb-6 md:mb-20">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xl">My Cart</h4>
                    <div className="text-right text-gray-500">{myPro.length} items</div>
                  </div>
                </div>
                <div className="border-t border-b">
                  {myPro.map((item, index) => (
                    <div key={index} className="main flex items-center py-5" data-aos="fade-up" data-aos-delay={index * 100}>
                      <div className="w-20 h-20 md:w-16 md:h-16 flex-shrink-0">
                        <img className="w-full h-full object-cover rounded-lg" src={item.product.image} alt="product" />
                      </div>
                      <div className="flex-1 px-2">
                        <div className="font-semibold text-gray-700">{item.product.name}</div>
                      </div>
                      <div className="flex items-center justify-center md:px-10">
                        <button onClick={() => decrement(item.product._id, "decrement")} className="px-2">-</button>
                        <span className="border px-2">{item.quantity}</span>
                        <button onClick={() => increment(item.product._id, "increment")} className="px-2">+</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="ml-auto text-gray-800">₹{(item.product.price * item.quantity).toFixed(2)}
                          <span onClick={() => handleRemove(item.product._id)} className="ml-4 cursor-pointer text-red-500">&#10005;</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="back-to-shop mt-10 md:mt-20">
                  <Link to={'/category'} className="text-black">&larr; <span className="text-gray-500">Back to shop</span></Link>
                </div>
              </div>
              <div className="summary bg-gray-200 p-5 md:p-10 rounded-b-lg md:rounded-r-lg md:rounded-l-none md:w-1/4" data-aos="fade-left">
                <div>
                  <h5 className="font-bold">Summary</h5>
                </div>
                <hr className="my-5" />
                <div className="flex justify-between">
                  <div className="text-left">ITEMS {myPro.length}</div>
                  <div className="text-right">₹{myPro.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}</div>
                </div>
                <div className="flex justify-between border-t py-5">
                  <div>TOTAL PRICE</div>
                  <div className="text-right">₹{(myPro.reduce((acc, item) => acc + item.product.price * item.quantity, 0)).toFixed(2)}</div>
                </div>
                <button onClick={openCheckoutPopup} className="btn bg-black border-black text-white w-full text-sm mt-5 md:mt-10 py-2">CHECKOUT</button>
              </div>
            </div>

            {showPopup && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg relative" data-aos="fade-in">
                  <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-600" onClick={closeCheckoutPopup}>
                    &#10005;
                  </button>
                  <h2 className="text-lg font-bold mb-4">Select Payment Method</h2>
                  <div className="mb-4">
                    <label className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      Card Payment
                    </label>
                    <label className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      UPI Payment
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      Cash on Delivery
                    </label>
                  </div>
                  <button onClick={handlePay} className="btn bg-black border-black text-white w-full py-2">Pay</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
