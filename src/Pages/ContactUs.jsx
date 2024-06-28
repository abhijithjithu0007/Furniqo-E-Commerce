import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ContactUs = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-16">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 flex flex-wrap">
                <div className="w-full md:w-1/2 mb-8 md:mb-0 mt-10">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                            <FontAwesomeIcon icon={faPhone} className="text-blue-700 mr-2" />
                            Call Us
                        </h1>
                        <h2 className="text-lg text-gray-600 mt-2">10100101001010</h2>
                    </div>
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-700 mr-2" />
                            Location
                        </h1>
                        <h2 className="text-lg text-gray-600 mt-2">Thurakkal , Manjeri</h2>
                    </div>
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                            <FontAwesomeIcon icon={faEnvelope} className="text-blue-700 mr-2" />
                            Email
                        </h1>
                        <h2 className="text-lg text-gray-600 mt-2">www.littlenest@gmail.com</h2>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
                    <form>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                placeholder="Enter Valid Email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>
                        <div className="mb-4">
                            <textarea
                                placeholder="Your Message"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent h-32"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
