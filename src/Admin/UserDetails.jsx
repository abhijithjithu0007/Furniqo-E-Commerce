import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Admincontext } from '../Context/ContextAdmin';
import axios from 'axios';
import axiosInstance from '../axiosInstance';

const UserDetails = () => {
  const params = useParams();
  const { usersData } = useContext(Admincontext);
  const eachUser = usersData.find((val) => val._id === params.id);
  const [pendDetail, setPendDetail] = useState([]);
  const [compDetail, setCompDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axiosInstance.get(`/api/admin/getorderbyuser/${params.id}`, { withCredentials: true });
        const { pendingOrders, completedOrders } = resp.data;
        console.log(resp);

        setPendDetail(pendingOrders);
        setCompDetail(completedOrders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params.id]);


  return (
    <div className="max-w-5xl mx-auto mt-8">
      {eachUser ? (
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Name : {eachUser.name}</h1>
            <h3 className="text-lg text-gray-600">Email : {eachUser.email}</h3>
          </div>  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center">Pending Orders</h2>
              {pendDetail.length > 0 ? (
                pendDetail.map((order, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow mb-4 border border-gray-200">
                    <p className="text-gray-800 font-semibold"><span className="text-indigo-600">Order ID:</span> {order.orderId}</p>
                    {order.products.map((product, i) => (
                      <div key={i} className="flex items-center gap-4 mb-2">
                        <img src={product.product.image} alt="" className="w-20 h-20 object-cover rounded-md" />
                        <div>
                          <p><span className="font-semibold text-gray-800">Product:</span> {product.product.name}</p>
                          <p><span className="font-semibold text-gray-800">Quantity:</span> {product.quantity}</p>
                          <p><span className="font-semibold text-gray-800">Price:</span> ₹{(product.product.price * product.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    <p className="text-gray-800 border-t pt-2"><span className="font-semibold">Status:</span> {order.paymentStatus}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">No pending orders.</p>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center">Completed Orders</h2>
              {compDetail.length > 0 ? (
                compDetail.map((order, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow mb-4 border border-gray-200">
                    <p className="text-gray-800 font-semibold"><span className="text-indigo-600">Order ID:</span> {order.orderId}</p>
                    {order.products.map((product, i) => (
                      <div key={i} className="flex items-center gap-4 mb-2">
                        <img src={product.product.image} alt="" className="w-20 h-20 object-cover rounded-md" />
                        <div>
                          <p><span className="font-semibold text-gray-800">Product:</span> {product.product.name}</p>
                          <p><span className="font-semibold text-gray-800">Quantity:</span> {product.quantity}</p>
                          <p><span className="font-semibold text-gray-800">Price:</span> ₹{(product.product.price * product.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    <p className="text-gray-800 border-t pt-2"><span className="font-semibold">Status:</span> {order.paymentStatus}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">No completed orders.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">User not found.</p>
      )}
    </div>
  );
};

export default UserDetails;
