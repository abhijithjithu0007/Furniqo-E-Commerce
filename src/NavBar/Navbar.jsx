import React, { useContext, useEffect, useState } from 'react';
import { faBabyCarriage, faMagnifyingGlass, faShoppingCart, faUser,faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/logo@img.png';
import useFetchProducts from '../component/CoustumeHook';
import { cartContext } from '../component/CartContext';

const Navbar = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false)
  const { myPro } = useContext(cartContext);
  const navigate = useNavigate();
  const { products } = useFetchProducts();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const user = localStorage.getItem('currentUser');
  const isLog = JSON.parse(localStorage.getItem('isLogin'));

  const { name = '' } = user ? JSON.parse(user) : {};
  const handleProfile = () => {
    navigate(isLoggedIn ? '/profile' : '/login');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (search) {
      const filteredPro = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filteredPro);
      setIsOpen(true);
      setShowSearch(false)
    } else {
      setIsOpen(false);
      
    }
  }, [search, products]);

  const linkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-gray-100 opacity-95 md:h-[87px]">
      <div className="container mx-auto px-4 py-2 md:px-8 md:py-4 flex justify-between items-center">
        <Link to='/home'>
          <img src={img} alt="Logo" className="h-12 w-60 md:h-14" />
        </Link>
        <ul className="hidden md:flex space-x-6 font-bold">
          <li>
            <Link to='/' className="text-sm text-gray-700 hover:text-btnColor">Home</Link>
          </li>
          <li className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-7" viewBox="0 0 20 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14" />
            </svg>
          </li>
          <li>
            <Link to='/category' className="text-sm text-gray-700 hover:text-btnColor">Category</Link>
          </li>
          <li className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-7" viewBox="0 0 20 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14" />
            </svg>
          </li>
          <li>
            <Link to='/contactus' className="text-sm text-gray-700 hover:text-btnColor">Contact Us</Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4 relative">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder='Search by name'
            className="hidden md:block text-black px-3 py-2 rounded-3xl bg-white border focus:outline-none focus:ring-2 focus:ring-black"
          />
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
                placeholder='Search by'
                className="absolute  top-8 left-0 w-[75px] text-black px-3 py-2 rounded-3xl bg-white border focus:outline-none focus:ring-2 focus:ring-black"
              />
            )}
          </div>

          {isOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-35 flex justify-center items-start pt-20 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl relative overflow-auto max-h-screen">
                <h2 className="text-2xl font-bold mb-4 text-btnColor">Search Results</h2>
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">X</button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <Link key={index} to={`/category/${product.id}`} onClick={linkClick}>
                        <div className="border rounded-lg p-4 shadow-lg transform hover:scale-105 transition duration-150 bg-white hover:bg-gray-100">
                          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
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
           <FontAwesomeIcon icon={faHeart} className="text-black h-6 w-6 hover:text-gray-900 cursor-pointer" />
          </Link>
          <Link to={'/cart'} className="flex items-center text-center relative">
            <FontAwesomeIcon icon={faShoppingCart} className="text-black h-6 w-6 hover:text-gray-900 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-btnColor w-[20px] h-[22px] rounded-xl text-white text-xs flex items-center justify-center">{myPro.length}</span>
          </Link>
          <div className='relative'>
            <FontAwesomeIcon icon={faUser} className="text-black h-6 w-6 hover:text-gray-900 cursor-pointer" onClick={handleProfile} />
            {isLog && <p className='absolute text-sm text-gray-700 top-8'>{name}</p>}
          </div>
        </div>
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-gray-900" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 9h14a1 1 0 110 2H3a1 1 0 110-2zm0-4h14a1 1 0 110 2H3a1 1 0 110-2zm0 8h14a1 1 0 110 2H3a1 1 0 110-2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link
                to="/"
                className="text-white hover:text-btnColor transition duration-300 ease-in-out transform hover:scale-105"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/category"
                className="text-white hover:text-btnColor transition duration-300 ease-in-out transform hover:scale-105"
                onClick={toggleMenu}
              >
                Category
              </Link>
            </li>
            <li>
              <Link
                to="/contactus"
                className="text-white hover:text-btnColor transition duration-300 ease-in-out transform hover:scale-105"
                onClick={toggleMenu}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
