import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';

const ContactUs = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="bg-white shadow-lg flex rounded-lg overflow-hidden">
        <div className="bg-btnColor text-white p-8 w-1/3">
          <h2 className="text-2xl font-semibold mb-6">Contact Info</h2>
          <div className="flex items-center mb-4">
            <MdLocationOn className="text-xl mr-3" />
            <p>2912 Meadowbrook Road<br />Los Angeles, CA<br />90017</p>
          </div>
          <div className="flex items-center mb-4">
            <MdEmail className="text-xl mr-3" />
            <p>lorem@ipsum.com</p>
          </div>
          <div className="flex items-center mb-8">
            <MdPhone className="text-xl mr-3" />
            <p>310-386-1623</p>
          </div>
          <div className="flex space-x-4">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaPinterestP />
            <FaLinkedinIn />
          </div>
        </div>
        <div className="p-8 w-2/3">
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
          <form>
            <div className="flex mb-4">
              <input type="text" placeholder="First Name" className="w-1/2 mr-2 p-2 border-b" />
              <input type="text" placeholder="Last Name" className="w-1/2 ml-2 p-2 border-b" />
            </div>
            <div className="flex mb-4">
              <input type="email" placeholder="Email Address" className="w-1/2 mr-2 p-2 border-b" />
              <input type="tel" placeholder="Mobile Number" className="w-1/2 ml-2 p-2 border-b" />
            </div>
            <textarea placeholder="Write your message here..." className="w-full p-2 mb-4 border-b h-32"></textarea>
            <button type="submit" className="bg-black text-white py-2 px-6 rounded">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
