import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import img from '../assets/logo.png'


const Footer = () => {
    return (
        <div className="bg-greenColor text-black py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-semibold">
                <div>
                 <img className='h-12 md:h-13' src={img} alt="" />
                    <p className='mt-5'>Thurakkal, Manjeri</p>
                    <p>+91 87876879686</p>
                    <p>littlenest@gmail.com</p>
                    <div className="flex space-x-4 mt-4">
                        <FaInstagram className='text-2xl'/>
                        <FaFacebook className='text-2xl'/>
                        <FaTwitter className='text-2xl'/>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-semibold mb-4">Customer Service</h1>
                    <p>Contact Us</p>
                    <p>Help & FAQ</p>
                    <p>Payment Method</p>
                    <p>Delivery Information</p>
                    <p>Track Your Order</p>
                    <p>Return and Exchange</p>
                </div>
                <div>
                    <h1 className="text-xl font-semibold mb-4">Categories</h1>
                    <p>Clothing Fashion</p>
                    <p>Toys</p>
                    <p>School Supplies</p>
                    <p>Birthday Party Supplies</p>
                    <p>Baby Diapering</p>
                </div>
                <div>
                    <h1 className="text-xl font-semibold mb-4">Our Company</h1>
                    <p>Corporate Information</p>
                    <p>Privacy & Cookies Policy</p>
                    <p>Promo & Terms</p>
                </div>
            </div>
            <p className="text-center mt-8">&copy; 2024 Baby Store | Powered by Baby Store</p>
        </div>
    );
};

export default Footer;
