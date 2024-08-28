import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Orders = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, []);

    const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    const { name } = currentUserData;

    return (
        <div className="container mx-auto my-10 px-4">
            <div className="bg-white shadow-lg rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between p-4 border-b bg-blue-50"
                     data-aos="fade-down">
                    <div className="flex items-center">
                        <h4 className="text-xl font-semibold text-teal-700">Thanks for your Order, <span className="text-indigo-600">{name}</span>!</h4>
                    </div>
                </div>
                <div className="p-4 bg-gray-50">
                    <div className="flex justify-between mb-3" data-aos="fade-up">
                        <h6 className="text-purple-700 font-medium">Receipt</h6>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                             data-aos="fade-right">
                            <div className="flex items-center">
                                <img
                                    className="w-32 h-32 object-cover rounded-lg"
                                    src="https://i.imgur.com/RJOW4BL.jpg"
                                    alt="Jack Jacs"
                                />
                                <div className="ml-4 flex-1">
                                    <div className="flex flex-col sm:flex-row justify-between text-gray-800">
                                        <h6 className="text-lg font-medium">Jack Jacs</h6>
                                        <small>Golden Rim</small>
                                        <small>Size: M</small>
                                        <small>Qty: 1</small>
                                        <h6 className="text-lg font-medium text-green-600">&#8377;3,600.00</h6>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <small>Track Order <i className="ml-2 fa fa-refresh" aria-hidden="true"></i></small>
                                    <div className="flex-1 ml-4">
                                        <div className="relative pt-1">
                                            <div className="flex items-center justify-between">
                                                <small>Out for delivery</small>
                                                <small>Delivered</small>
                                            </div>
                                            <div className="w-full bg-gray-200 h-2 rounded">
                                                <div className="bg-teal-500 h-2 rounded" style={{ width: '62%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                             data-aos="fade-left">
                            <div className="flex items-center">
                                <img
                                    className="w-32 h-32 object-cover rounded-lg"
                                    src="https://i.imgur.com/fUWWpRS.jpg"
                                    alt="Michel Mark"
                                />
                                <div className="ml-4 flex-1">
                                    <div className="flex flex-col sm:flex-row justify-between text-gray-800">
                                        <h6 className="text-lg font-medium">Michel Mark</h6>
                                        <small>Black Rim</small>
                                        <small>Size: L</small>
                                        <small>Qty: 1</small>
                                        <h6 className="text-lg font-medium text-green-600">&#8377;1,235.00</h6>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <small>Track Order <i className="ml-2 fa fa-refresh" aria-hidden="true"></i></small>
                                    <div className="flex-1 ml-4">
                                        <div className="relative pt-1">
                                            <div className="flex items-center justify-between">
                                                <small>Out for delivery</small>
                                                <small>Delivered</small>
                                            </div>
                                            <div className="w-full bg-gray-200 h-2 rounded">
                                                <div className="bg-teal-500 h-2 rounded" style={{ width: '18%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-4" data-aos="fade-up">
                        <div className="flex justify-between text-gray-800">
                            <p className="font-bold">Order Details</p>
                            <p className="font-bold">Total</p>
                            <p className="font-bold text-green-600">&#8377;4,835</p>
                        </div>
                        <div className="flex justify-between text-gray-800">
                            <p className="font-bold">Discount</p>
                            <p>&#8377;150</p>
                        </div>
                        <div className="flex justify-between text-gray-800">
                            <p className="font-bold">GST 18%</p>
                            <p>&#8377;843</p>
                        </div>
                        <div className="flex justify-between text-gray-800">
                            <p className="font-bold">Delivery Charges</p>
                            <p>Free</p>
                        </div>
                    </div>
                    <div className="my-4" data-aos="fade-up">
                        <p>Invoice Number: 788152</p>
                        <p>Invoice Date: 22 Dec, 2019</p>
                        <p>Receipts Voucher: 18KU-62IIK</p>
                    </div>
                </div>
                <div className="bg-red-100 p-8 border-t" data-aos="fade-up">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-btnColor">TOTAL PAID</h2>
                        <h1 className="text-4xl font-bold text-btnColor">&#8377; 5,528</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
