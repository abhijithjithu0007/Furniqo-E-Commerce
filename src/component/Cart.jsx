import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Cart = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [myPro, setMyPro] = useState([]);
  const navigate = useNavigate();
  const userdetails = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(userdetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`http://localhost:5000/api/user/viewcartproducts/${currentUser.id}`, {
          withCredentials: true
        });
        const data = resp.data.products;
        setMyPro(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentUser.id]);

  const increment = async (productId, action) => {
    try {
      const resp = await axios.put('http://localhost:5000/api/user/updateproquantity', {
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
      const resp = await axios.put('http://localhost:5000/api/user/updateproquantity', {
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
      const resp = await axios.delete('http://localhost:5000/api/user/removefromcart', {
        data: { productId: productId },
        withCredentials: true
      });
      const data = resp.data.products;
      setMyPro(data);
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
    const result = await Swal.fire({
      title: 'Confirm Payment',
      text: "Are you sure you want to proceed with the payment?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Pay Now!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    });

    if (result.isConfirmed) {
      try {
        // Assuming payment logic here
        await Swal.fire(
          'Payment Successful!',
          'Your payment was successful.',
          'success'
        );
        navigate('/category');
        setMyPro([]);
      } catch (error) {
        Swal.fire(
          'Payment Failed!',
          'There was an error processing your payment.',
          'error'
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center">
      <div className="card mx-auto max-w-6xl w-11/12 shadow-lg rounded-lg border-transparent">
        {myPro.length === 0 ? (
          <div>
            <p className="text-center text-2xl text-gray-500">Your cart is empty!</p>
            <Link to={'/category'}>
              <p className='text-center text-red-400 mt-10 underline'>Add some products! Click here</p>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row">
              <div className="cart bg-white p-10 rounded-l-lg md:rounded-r-none md:rounded-l-lg flex-grow md:w-3/4">
                <div className="title mb-20">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xl">My Cart</h4>
                    <div className="text-right text-gray-500">{myPro.length} items</div>
                  </div>
                </div>
                <div className="border-t border-b">
                  {myPro.map((item, index) => (
                    <div key={index} className="main flex items-center py-5">
                      <div className="w-16">
                        <img className="w-full" src={item.product.image} alt="product" />
                      </div>
                      <div className="flex-1 px-2">
                        <div className="text-gray-500">{item.product.category}</div>
                        <div className="">{item.product.name}</div>
                      </div>
                      <div className="flex items-center justify-center md:px-52">
                        <button onClick={() => decrement(item.product._id, "decrement")} className="px-2">-</button>
                        <span className="border px-2">{item.quantity}</span>
                        <button onClick={() => increment(item.product._id, "increment")} className="px-2">+</button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="ml-auto">₹{(item.product.price * item.quantity).toFixed(2)}
                          <span onClick={() => handleRemove(item.product._id)} className="ml-4 cursor-pointer">&#10005;</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="back-to-shop mt-20">
                  <Link to={'/category'} className="text-black">&larr;
                  <span className="text-gray-500">Back to shop</span></Link>
                </div>
              </div>
              <div className="summary bg-gray-200 p-10 rounded-r-lg md:rounded-l-none md:rounded-r-lg md:w-1/4">
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
                <button onClick={openCheckoutPopup} className="btn bg-black border-black text-white w-full text-sm mt-10 py-2">CHECKOUT</button>
              </div>
            </div>

            {showPopup && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg relative">
                  <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-600" onClick={closeCheckoutPopup}>
                    <img className='h-6 w-6' src="https://cdn-icons-png.flaticon.com/512/106/106830.png" alt="close" />
                  </button>
                  <div className='h-[200px] overflow-y-scroll'>
                    {myPro.map((item, id) => (
                      <div key={id} className="flex items-center gap-4 border-b pb-4 mb-4">
                        <img className="w-16 h-16 object-cover rounded" src={item.product.image} alt={item.product.name} />
                        <div>
                          <h2 className="text-xl font-semibold">{item.product.name}</h2>
                          <div className="flex items-center mt-2">
                            <h2 className="text-xl font-semibold mr-2">₹{(item.product.price * item.quantity).toFixed(2)}</h2>
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
                          className={`cursor-pointer w-16 h-16 border-4 rounded-xl ${paymentMethod === 'card' ? 'border-blue-500' : 'border-transparent'}`}
                          onClick={() => setPaymentMethod('card')}
                        />
                        <span className="mt-2 text-sm font-semibold">Card</span>
                      </label>
                      <label className="flex flex-col items-center">
                        <img
                          src="https://www.axisbank.com/images/default-source/progress-with-us/pay-directly-from-your-bank.png"
                          alt="Net Banking"
                          className={`cursor-pointer w-16 h-16 border-4 rounded-xl ${paymentMethod === 'netBanking' ? 'border-blue-500' : 'border-transparent'}`}
                          onClick={() => setPaymentMethod('netBanking')}
                        />
                        <span className="mt-2 text-sm font-semibold">Net Banking</span>
                      </label>
                      <label className="flex flex-col items-center">
                        <img
                          src="https://www.godrejcapital.com/content/dam/godrej-capital/web/images/homepage/upi-logo.png"
                          alt="UPI"
                          className={`cursor-pointer w-16 h-16 border-4 rounded-xl ${paymentMethod === 'upi' ? 'border-blue-500' : 'border-transparent'}`}
                          onClick={() => setPaymentMethod('upi')}
                        />
                        <span className="mt-2 text-sm font-semibold">UPI</span>
                      </label>
                    </div>
                    <button onClick={handlePay} className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">Pay Now</button>
                  </div>
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
