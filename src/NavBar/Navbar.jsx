import React, { useContext, useEffect, useState } from 'react';
import { faBabyCarriage, faMagnifyingGlass, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { Mycontext } from '../Pages/SignUp';

const Navbar = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState()


  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfile = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false);
  }

  const { api, setApi ,myCart} = useContext(Mycontext)


  useEffect(() => {
    if (search) {
      const filteredPro = api.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())

      )
      setFilteredProducts(filteredPro)
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }


  }, [search, api])

  const linkClick=()=>{
    setIsOpen(false)
  }

  return (
    <div className="sticky top-0 z-50 bg-gray-200 opacity-95">
      <div className="flex justify-between items-center px-4 py-2 md:px-8 md:py-4">
        <Link to='/home'>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBabyCarriage} className="text-blue-700 text-3xl mr-2" />
            <h1 className="text-2xl font-bold">LittleNest</h1>
          </div>
        </Link>
        <ul className="hidden md:flex space-x-6 font-bold">
          <li><Link to="/" className="hover:text-gray-500">Home</Link></li>
          <li><Link to="/category" className="hover:text-gray-500">Category</Link></li>
          <li><Link to="/collections" className="hover:text-gray-500">Collections</Link></li>
          <li><Link to="/contactus" className="hover:text-gray-500">Contact Us</Link></li>
        </ul>
        <div className="flex items-center justify-end space-x-4 relative">
          <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search here' className="w-full md:w-auto px-3 py-2 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-blue-500" />




          {isOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-35 flex justify-center items-start pt-20 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl relative overflow-auto max-h-screen">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Search Results</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                  &times;
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <Link onClick={linkClick} to={`/collections/${product.id}`}>
                        <div key={index} className="border rounded-lg p-4 shadow-lg transform hover:scale-105 transition duration-150 bg-white hover:bg-gray-100">
                          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                          <h2 className="text-lg font-semibold mt-4 text-blue-700">{product.name}</h2>
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




          <Link to={'/cart'}><FontAwesomeIcon icon={faShoppingCart} className="text-blue-700 h-6 w-6 hover:text-gray-900 cursor-pointer" /><span>{myCart.length}</span></Link>
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="text-blue-700 h-6 w-6 hover:text-gray-900 cursor-pointer"
              onClick={handleProfile}
            />
          </div>
        </div>
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-gray-900" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 9h14a1 1 0 110 2H3a1 1 0 110-2zm0-4h14a1 1 0 110 2H3a1 1 0 110-2zm0 8h14a1 1 0 110 2H3a1 1 0 110-2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-200 py-2">
          <ul className="flex flex-col items-center space-y-2">
            <li><Link to="/" className="text-gray-800 hover:text-gray-600" onClick={() => { toggleMenu(); navigate('/home'); }}>Home</Link></li>
            <li><Link to="/category" className="text-gray-800 hover:text-gray-600" onClick={() => { toggleMenu(); navigate('/category'); }}>Category</Link></li>
            <li><Link to="/collections" className="text-gray-800 hover:text-gray-600" onClick={() => { toggleMenu(); navigate('/collections'); }}>Collections</Link></li>
            <li><Link to="/contactus" className="text-gray-800 hover:text-gray-600" onClick={() => { toggleMenu(); navigate('/contactus'); }}>Contact Us</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
