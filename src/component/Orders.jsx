import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {

  const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
  const { name } = currentUserData;

  const [pendOrders, setPendOrders] = useState([]);
  const [compOrders, setCompOrders] = useState([]);
  const [sum, setSum] = useState(0);
  const [viewPending, setViewPending] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('http://localhost:5000/api/user/order/getorderdetails', { withCredentials: true });
        console.log(resp.data);
        
        const { pendingOrders,completedOrders } = resp.data;
        setPendOrders(pendingOrders);
        setCompOrders(completedOrders);

        const total = pendingOrders.reduce((acc, order) => {
          return acc + order.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        }, 0);
        setSum(total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);  
  

  return (
    <div className="min-h-screen bg-gray-200 flex items-center">
      <div className="card mx-auto max-w-6xl w-11/12 shadow-lg rounded-lg border-transparent">
        <div className="flex flex-col md:flex-row">
          <div className="orders-section bg-white p-8 rounded-l-lg md:rounded-r-none md:rounded-l-lg flex-grow md:w-2/3">
            <div className="title mb-10 flex justify-between items-center">
              <h4 className="font-bold text-xl">{viewPending ? 'Pending Orders' : 'Completed Orders'}</h4>
              <button
                onClick={() => setViewPending(!viewPending)}
                className="btn bg-black text-white py-1 px-4 rounded"
              >
                {viewPending ? 'View Completed Orders' : 'View Pending Orders'}
              </button>
            </div>
            <div className="border-t border-b">
              {(viewPending ? pendOrders : compOrders).map((order) => (
                <div key={order._id} className="space-y-4 my-4">
                  {order.products.map((item, index) => (
                    <div
                      key={index}
                      className="order-item flex items-center py-5 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <div className="w-16">
                        <img className="w-full rounded-lg" src={item.product.image} alt="product" />
                      </div>
                      <div className="flex-1 px-2">
                        <div className="text-gray-500">{item.product.category}</div>
                        <div className="text-lg font-medium">{item.product.name}</div>
                        <div className="text-gray-700">Quantity: {item.quantity}</div>
                      </div>
                      <div className="ml-auto">
                        <div className="text-lg font-medium text-green-600">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="my-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="bg-gray-50 p-4 rounded-lg shadow border border-gray-200 w-full md:w-1/2">
                      <div className="flex justify-between text-gray-800">
                        <p className="font-bold">Order Details</p>
                        <p className="font-bold text-green-600">₹{order.totalprice}</p>
                      </div>
                      <div className="flex justify-between text-gray-800">
                        <p className="font-bold">Delivery Charges</p>
                        <p>Free</p>
                      </div>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg shadow border border-red-200 w-full md:w-1/3 mt-4 md:mt-0">
                    <h2 className="text-2xl font-bold text-red-600">PAID TO BE - </h2>
                      <h1 className="text-4xl font-bold text-red-600">₹{order.totalprice}</h1>
                      <h2 className="text-lg font-bold text-red-600">Payment status : <span className='text-lg text-black'>{order.paymentStatus}</span></h2>
                    </div>
                  </div>

                  <div className="my-4 text-gray-600">
                    <p>Invoice Date: {order.purchaseDate}</p>
                    <p>Receipt Voucher: 18KU-62IIK</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Orders;
