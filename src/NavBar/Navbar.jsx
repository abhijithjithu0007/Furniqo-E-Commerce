import React, { useContext, useEffect, useState } from 'react';
import { faBabyCarriage, faMagnifyingGlass, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { Mycontext } from '../component/SignUp';
import img from '../assets/logo.png';
import useFetchProducts from '../component/CoustumeHook';
import { cartContext } from '../component/CartContext';

const Navbar = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {total}= useContext(cartContext)
  const navigate = useNavigate();
  const { products, loading, error } = useFetchProducts();


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const user = localStorage.getItem('currentUser')
  const isLog = JSON.parse(localStorage.getItem('isLogin'))

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
    } else {
      setIsOpen(false);
    }
  }, [search, products]);

  const linkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-gray-100 opacity-95 md:h-[95px]">
      <div className="container mx-auto px-4 py-2 md:px-8 md:py-4 flex justify-between items-center">
        <Link to='/home'>
          <img src={img} alt="Logo" className="h-10 md:h-16" />
        </Link>
        <ul className="hidden md:flex space-x-6 font-bold">
          <li><Link to="/" className="hover:text-gray-500 text-lg">Home</Link></li>
          <li><Link to="/category" className="hover:text-gray-500 text-lg">Category</Link></li>
          <li><Link to="/contactus" className="hover:text-gray-500 text-lg">Contact Us</Link></li>
        </ul>
        <div className="flex items-center space-x-4 relative">
          <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search here' className="w-full text-black md:w-auto px-3 py-2 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-black" />
          {isOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-35 flex justify-center items-start pt-20 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl relative overflow-auto max-h-screen">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Search Results</h2>
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">X</button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <Link key={index} to={`/category/${product.id}`} onClick={linkClick}>
                        <div className="border rounded-lg p-4 shadow-lg transform hover:scale-105 transition duration-150 bg-white hover:bg-gray-100">
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
          <Link to={'/cart'} className="flex items-center text-center">
            <FontAwesomeIcon icon={faShoppingCart} className="text-black h-6 w-6 hover:text-gray-900 cursor-pointer" />
            <span className="ml-1 bg-btnColor w-[20px] h-[22px] rounded-xl absolute bottom-12 right-9">{total.length}</span>
          </Link>
          <div className='mt-6'>
            <FontAwesomeIcon icon={faUser} className="text-black h-6 w-6 hover:text-gray-900 cursor-pointer" onClick={handleProfile} />
          {isLog?(<p>{name}</p>):""}  
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
