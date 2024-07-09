import React ,{useEffect} from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';
import Footer from '../component/Footer';
import ScrollReveal from 'scrollreveal';

const ContactUs = () => {
    useEffect(() => {
      const sr = ScrollReveal();
  
      sr.reveal('.contact-info', {
        delay: 300,
        distance: '50px',
        origin: 'bottom',
        interval: 200,
      });
  
      sr.reveal('.send-message', {
        delay: 300,
        distance: '50px',
        origin: 'right',
        interval: 200,
      });
  
      return () => {
        sr.destroy();
      };
    }, []);
  
    return (
      <div className="flex justify-center items-center min-h-screen p-8 bg-homeBg">
        <div className="bg-white shadow-lg flex flex-col md:flex-row rounded-lg overflow-hidden">
          <div className="bg-btnColor text-white p-8 md:w-1/3 contact-info">
            <h2 className="text-2xl font-semibold mb-6">Contact Info</h2>
            <div className="flex items-center mb-4">
              <MdLocationOn className="text-xl mr-3" />
              <p>LittleNest<br />Manjeri Thurakkal<br />90017</p>
            </div>
            <div className="flex items-center mb-4">
              <MdEmail className="text-xl mr-3" />
              <p>littlenest@gmail.com</p>
            </div>
            <div className="flex items-center mb-8">
              <MdPhone className="text-xl mr-3" />
              <p>+91 1234567890</p>
            </div>
            <div className="flex space-x-4">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaPinterestP />
              <FaLinkedinIn />
            </div>
          </div>
          <div className="p-8 md:w-2/3 send-message">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            <form>
              <div className="flex flex-col sm:flex-row mb-4">
                <input type="text" placeholder="First Name" className="w-full sm:w-1/2 mr-0 sm:mr-2 mb-2 sm:mb-0 p-2 border-b" />
                <input type="text" placeholder="Last Name" className="w-full sm:w-1/2 ml-0 sm:ml-2 p-2 border-b" />
              </div>
              <div className="flex flex-col sm:flex-row mb-4">
                <input type="email" placeholder="Email Address" className="w-full sm:w-1/2 mr-0 sm:mr-2 mb-2 sm:mb-0 p-2 border-b" />
                <input type="tel" placeholder="Mobile Number" className="w-full sm:w-1/2 ml-0 sm:ml-2 p-2 border-b" />
              </div>
              <textarea placeholder="Write your message here..." className="w-full p-2 mb-4 border-b h-32"></textarea>
              <button type="submit" className="bg-black text-white py-2 px-6 rounded">Send</button>
            </form>
          </div>
        </div>
      </div>
    )
};

export default ContactUs;
