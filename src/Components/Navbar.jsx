import React, { useContext, useEffect, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdFavoriteBorder } from 'react-icons/md';
import { RiShoppingBag4Line } from "react-icons/ri";
import { FaCircleArrowRight } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import useFetchProducts from '../CustomHook/CoustumeHook';
import { cartContext } from '../Context/CartContext';
import { wishContext } from '../Context/WishlistContext';
import navimg from '../assets/navlogo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [category, setCategory] = useState('all categories');
  const { myPro } = useContext(cartContext);
  const { myWish } = useContext(wishContext);
  const navigate = useNavigate();
  const { products } = useFetchProducts();


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const user = localStorage.getItem('currentUser');
  const isLog = localStorage.getItem('isLogin') === 'true';

  const { name = '' } = user ? JSON.parse(user) : {};

  useEffect(() => {
    if (search) {
      const filteredPro = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) &&
          (category === 'all categories' || product.category === category)
      );
      setFilteredProducts(filteredPro);
      setIsOpen(true);
      setShowSearch(false);
    } else {
      setIsOpen(false);
    }
  }, [search, products, category]);

  const linkClick = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (path) => {
    navigate(path);
  };

  
  return (
    <header className="sticky top-0 z-50 bg-gray-100 opacity-95 md:h-[87px]">
      <div className="container mx-auto px-4 py-2 md:px-8 md:py-4 flex justify-between items-center">
        <Link to="/home">
          <img src={navimg} alt="Logo" className="h-12 w-60 md:h-14" />
        </Link>
        <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden xl:flex items-center">
          <div>
            <Link to={'/category'}>
              <p className="bg-transparent uppercase font-bold text-sm p-4 mr-4 flex items-center">
                <FaCircleArrowRight className="mr-2" />
                all category
              </p>
            </Link>
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="I'm searching for ..."
            className="border-l border-gray-300 bg-transparent font-semibold text-sm pl-4"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="ml-auto h-5 px-4 text-gray-500 cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          />
        </div>

        <div className="flex items-center space-x-4 relative">
          <div className="block md:hidden relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-black h-6 w-6 hover:text-gray-900 cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
            />
            {showSearch && (
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="Search by"
                className="absolute top-8 left-0 w-[75px] text-black px-3 py-2 rounded-3xl bg-white border focus:outline-none focus:ring-2 focus:ring-black"
              />
            )}
          </div>

          {isOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-35 flex justify-center items-start pt-20 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl relative overflow-auto max-h-screen">
                <h2 className="text-2xl font-bold mb-4 text-black">Search Results</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                  X
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <Link key={index} to={`/category/${product._id}`} onClick={linkClick}>
                        <div className="border rounded-lg p-4 shadow-lg transform hover:scale-105 transition duration-150 bg-white hover:bg-gray-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md"
                          />
                          <h2 className="text-lg font-semibold mt-4 text-black">{product.name}</h2>
                          <p className="text-green-500 text-xl mt-2">${product.price}</p>
                          <p className="text-gray-600 mt-2">{product.description}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <h1 className="text-center text-gray-500 col-span-full">No search results found.</h1>
                  )}
                </div>
              </div>
            </div>
          )}
          <Link to={'/wishlist'} className="flex items-center text-center relative">
            <MdFavoriteBorder className="text-black h-6 w-6 hover:text-gray-900 cursor-pointer" />
            <span className="absolute -top-2 -right-3 bg-btnColor w-[20px] h-[22px] rounded-xl text-white text-xs flex items-center justify-center">
              {myWish.length}
            </span>
          </Link>
          <Link to={'/cart'} className="flex items-center text-center relative">
            <RiShoppingBag4Line className="text-black h-6 w-6 hover:text-gray-900 cursor-pointer" />
            <span className="absolute -top-2 -right-3 bg-btnColor w-[20px] h-[22px] rounded-xl text-white text-xs flex items-center justify-center">
              {myPro.length}
            </span>
          </Link>
          <div className="relative group">
            <div className="flex items-center">
              <CgProfile className="text-black h-6 w-6 hover:text-gray-900 cursor-pointer" />
              <RiArrowDropDownLine className="text-black h-6 w-6 hover:text-gray-900 cursor-pointer" />
            </div>
            {isLog && <p className="absolute text-sm text-gray-700 top-8 left-0">{name}</p>}
            <ul className="absolute rounded-xl right-0 hidden group-hover:block bg-white shadow-lg p-4 min-w-[150px]">
              <li
                className="py-2 hover:pl-2 transition-all duration-300 border-l-2 border-transparent hover:border-blue-500 cursor-pointer"
                onClick={() => handleOptionClick('/orders')}
              >
                My Orders
              </li>
              <li
                className="py-2 hover:pl-2 transition-all duration-300 border-l-2 border-transparent hover:border-blue-500 cursor-pointer"
                onClick={() => handleOptionClick('/contactus')}
              >
                Contact Us
              </li>
              <li
                className="py-2 hover:pl-2 transition-all duration-300 border-l-2 border-transparent hover:border-blue-500 cursor-pointer"
                onClick={() => handleOptionClick('/profile')}
              >
                Profile
              </li>
            </ul>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
