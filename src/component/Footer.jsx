import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import img from '../assets/navlogo.png';

const Footer = () => {
    return (
        <footer className="px-4 divide-y  dark:text-gray-800">
            <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                <div className="lg:w-[200px]">
                    <img src={img} alt="Furniture Shop Logo" />
                </div>
                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase dark:text-btnColor">Furniture Categories</h3>
                        <ul className="space-y-1">
                            <li>
                                <a rel="noopener noreferrer" href="#">Living Room</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Bedroom</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Office</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Outdoor</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase dark:text-btnColor">Company</h3>
                        <ul className="space-y-1">
                            <li>
                                <a rel="noopener noreferrer" href="#">About Us</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Sustainability</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Careers</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="uppercase dark:text-btnColor">Customer Service</h3>
                        <ul className="space-y-1">
                            <li>
                                <a rel="noopener noreferrer" href="#">Contact Us</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Shipping & Delivery</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Returns & Exchanges</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <div className="uppercase dark:text-btnColor">Follow Us</div>
                        <div className="flex justify-start space-x-3">
                            <a rel="noopener noreferrer" href="#" title="Facebook" className="flex items-center p-1">
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a rel="noopener noreferrer" href="#" title="Twitter" className="flex items-center p-1">
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a rel="noopener noreferrer" href="#" title="Instagram" className="flex items-center p-1">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 text-sm text-center dark:text-gray-600">© 2024 Furniture Co. All rights reserved.</div>
        </footer>
    );
};

export default Footer;
