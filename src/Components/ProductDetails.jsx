import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetchProducts from '../CustomHook/CoustumeHook';
import { IoMdShareAlt } from "react-icons/io";
import toast from 'react-hot-toast';
import { wishContext } from '../Context/WishlistContext';
import { useLoad } from '../Context/LoadingContext';
import axiosInstance from '../axiosInstance';
import { CiStar } from "react-icons/ci";
import { FiArrowLeftCircle,FiArrowRightCircle } from "react-icons/fi";



const ProductDetails = () => {
  const { products } = useFetchProducts();
  const { id } = useParams();
  const [carts, setCarts] = useState(null);
  const [isFilled, setIsFilled] = useState(false);
  const { setMyWish, fetchData } = useContext(wishContext);
  const islogin = JSON.parse(localStorage.getItem('isLogin'));
  const { startLoad, stopLoad } = useLoad();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3

  useEffect(() => {
    const fetchData = async () => {
      startLoad();
      try {
        const resp = await axiosInstance.get(`/api/user/${id}`);
        setCarts(resp.data);

        const wishlistResp = await axiosInstance.get(`/api/user/viewwishlist/${id}`, { withCredentials: true });
        setIsFilled(wishlistResp.data.isInWishlist);
      } catch (error) {
        console.log(error);
      } finally {
        stopLoad();
      }
    };
    fetchData();
  }, [id]);

  const { addToCart } = useFetchProducts();

  const handleAddcart = async () => {
    addToCart(carts._id, carts.price);
  };

  const addToWish = async (productId) => {
    startLoad();
    try {
      if (islogin === false) {
        toast.error("Log in to add items to wishlist!", { position: 'top-right' });
      } else {
        const { data } = await axiosInstance.post(`/api/user/wishlist`, {
          productId: productId,
        }, { withCredentials: true });
        setMyWish(data.products);
        setIsFilled(true);
        toast.success('Added to Wishlist', { position: 'top-right' });
        await fetchData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoad();
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Copied to clipboard');
    } catch (error) {
      console.log(error);
    }
  };

  const related = products.filter((rel) => rel.category === (carts ? carts.category : ''));
  const totalPages = Math.ceil(related.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = related.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 mt-2">
      {carts && (
        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-2/3 bg-white mx-auto my-8 shadow-md transition-all duration-300 hover:shadow-lg relative">
          <nav className="flex justify-between items-center p-6 border-b-2 border-gray-200 text-gray-600 text-xs uppercase">
            <Link to="/category" className="flex items-center space-x-2">
              <svg
                className="h-5 w-5 cursor-pointer"
                version="1.1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256" stroke="#727272" />
              </svg>
              <span>Back to all Products</span>
            </Link>
            <div onClick={handleCopyUrl}>
              <IoMdShareAlt className='text-2xl ' />
            </div>
          </nav>
          <div className="p-8 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <img
                src={carts.image}
                alt={carts.name}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 border-l-2 border-gray-200 pl-8">
              <h2 className="text-gray-600 text-sm font-medium uppercase">{carts.name}</h2>
              <h4 className="text-gray-600 text-xs font-medium uppercase mt-1">{carts.category}</h4>
              <h4 className="text-gray-600 text-xs font-medium mt-1">Material : {carts.material}</h4>
              <div className='flex justify-start'>
                <h4 className="text-gray-600 text-xs font-medium mt-1">Rating : {carts.rating} </h4>
                <CiStar className='pt-1 text-xl text-yellow-600' />
              </div>
              <h1 className="text-gray-800 text-4xl font-light mt-4">${carts.price}</h1>
              <p className="text-gray-600 text-sm leading-6 mt-4 mb-6">{carts.description}</p>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={handleAddcart}
                  className="bg-white text-black border border-black text-sm uppercase py-3 px-6 mr-2 transition-all duration-300 hover:bg-black hover:text-white"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => addToWish(carts._id)}
                  className="bg-transparent border border-gray-300 text-gray-800 text-xs uppercase py-3 px-6 transition-all duration-300 hover:border-black hover:text-red-400"
                >
                  {isFilled ? "In Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 px-4 lg:px-8 md:mt-32">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 border-b-2 border-btnColor">You may also like...</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 p-12 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {paginatedProducts.map((item) => (
            <Link to={`/category/${item._id}`} key={item._id}>
              <div className="flex flex-col justify-center items-center bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden mx-auto">
                <img
                  className="h-40 w-full object-cover md:h-[300px] "
                  src={item.image}
                  alt={item.name}
                />
                <div className="w-full p-4 text-center">
                  <h1 className="text-gray-900 font-bold text-sm md:text-base lg:text-lg">{item.name}</h1>
                  <p className="text-gray-600 text-xs md:text-sm">$ {item.price}</p>
                  <button
                    onClick={() => addToWish(item._id)}
                    className="mt-4 bg-btnColor text-white py-1 px-3 rounded-full"
                  >
                    Add to Wishlist
                  </button>
                </div>
                
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-evenly items-center mt-4 px-2 border-t-2 lg:px-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-gray-800 rounded-2xl hover:bg-gray-300 transition-colors duration-300"
          >
            <FiArrowLeftCircle className='text-3xl'/>

          </button>
          <div className="text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2  text-gray-800 rounded-2xl hover:bg-gray-300 transition-colors duration-300"
          >
            <FiArrowRightCircle className='text-3xl' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
