import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetchProducts from './CoustumeHook';
import { BiCartDownload } from "react-icons/bi";
import { IoMdShareAlt } from "react-icons/io";
import axios from 'axios';
import toast from 'react-hot-toast';
import { wishContext } from '../Context/WishlistContext';
import { useLoad } from '../Context/LoadingContext';

const ProductDetails = () => {
  const { products } = useFetchProducts();
  const { id } = useParams();
  const [carts, setCarts] = useState(null);
  const [isFilled, setIsFilled] = useState(false);
  const { setMyWish, fetchData } = useContext(wishContext);
  const islogin = JSON.parse(localStorage.getItem('isLogin'));
  const apiorigin = import.meta.env.VITE_API_URL
  const {startLoad,stopLoad} = useLoad(useContext)

  useEffect(() => {
    const fetchData = async () => {
      startLoad()
      try {
        const resp = await axios.get(`${apiorigin}/api/user/${id}`);
        setCarts(resp.data);

        const wishlistResp = await axios.get(`${apiorigin}/api/user/viewwishlist/${id}`, { withCredentials: true });
        setIsFilled(wishlistResp.data.isInWishlist);
      } catch (error) {
        console.log(error);
      }finally{
        stopLoad()
      }
    };
    fetchData();
  }, [id]);

  const { addToCart } = useFetchProducts();

  const handleAddcart = async () => {
    addToCart(carts._id, carts.price);
  };

  const addToWish = async (productId) => {
    startLoad()
    try {
      if (isFilled) {
        await axios.delete(`${apiorigin}/api/user/removefromwish`, {
          data: { productId: productId },
          withCredentials: true,
        });
        setIsFilled(false);
        await fetchData();
      } else {
        if (islogin === false) {
          toast.error("Log in to add items to cart!", { position: 'top-right' });
        } else {
          const { data } = await axios.post(`${apiorigin}/api/user/wishlist`, {
            productId: productId,
          }, { withCredentials: true });
          setMyWish(data.products);
          setIsFilled(true);
          toast.success('Added To Wishlist', { position: 'top-right' });
          await fetchData();
        }
      }
    } catch (error) {
      console.log(error);
    }finally{
      stopLoad()
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Copied to clipboard');
    } catch (error) {
      console.log(error);
    }
  };

  const related = products.filter((rel) => rel.category === (carts ? carts.category : ''));

  return (
    <div className="container mx-auto p-4">
      {carts && (
        <div className="bg-btnColor flex flex-col md:flex-row items-center p-4 md:p-8 lg:p-12 overflow-hidden relative">
          <div className="w-full max-w-6xl rounded bg-white shadow-xl p-4 md:p-8 lg:p-12 mx-auto text-gray-800 relative md:text-left">
            <div className="md:flex items-center">
              <div className="w-full md:w-1/2 h-auto px-4 md:px-6 lg:px-8 mb-6 md:mb-0">
                <div className="relative">
                  <img src={carts.image} className="w-full h-auto object-cover rounded" alt={carts.name} />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-4 md:px-6 lg:px-8">
                <div className="mb-6">
                  <h1 className="font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">{carts.name}</h1>
                  <p className="text-sm md:text-base lg:text-lg">
                    {carts.description}
                    <a href="#" className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE</a>
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="inline-block align-bottom">
                    <span className="text-xl md:text-2xl leading-none align-baseline">₹</span>
                    <span className="font-bold text-3xl md:text-4xl lg:text-5xl leading-none align-baseline">{carts.price}</span>
                  </div>
                  <div className="flex flex-col md:flex-row space-y-4 justify-center items-center md:space-y-0 md:space-x-4 mt-4">
                    <button
                      onClick={handleAddcart}
                      className="bg-gradient-to-r from-blue-500 to-btnColor text-white hover:from-btnColor hover:to-blue-600 opacity-90 hover:opacity-100 text-lg font-semibold rounded-full px-6 py-2 flex items-center space-x-2 transition-all duration-300"
                    >
                      <BiCartDownload className="text-xl" />
                      <span>ADD TO CART</span>
                    </button>
                    <button onClick={() => addToWish(carts._id)} className="p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill={isFilled ? 'red' : 'none'}
                        viewBox="0 0 24 24"
                        stroke={isFilled ? 'red' : 'currentColor'}
                        strokeWidth={2}
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div>
                      <IoMdShareAlt onClick={handleCopyUrl} className='text-3xl' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <div className="border-b border-gray-300">
          <ul className="flex space-x-4 md:space-x-8 overflow-x-auto">
            <li className="pb-2 border-b-2 border-btnColor whitespace-nowrap">Description</li>
            <li className="pb-2 whitespace-nowrap">Additional Information</li>
            <li className="pb-2 whitespace-nowrap">Reviews (5)</li>
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">Product Description</h3>
          <p className="mt-2 text-sm md:text-base lg:text-lg">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
            egestas semper. Aenean ultricies mi vitae est. Mauris placerat
            eleifend leo.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 border-b-2 border-btnColor">You may also like...</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {related.map((item, id) => (
            <Link to={`/category/${item._id}`} key={id}>
              <div className="flex flex-col justify-center items-center max-w-xs sm:max-w-sm md:max-w-md bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden mx-auto">
                <img
                  className="h-40 w-full object-cover"
                  src={item.image}
                  alt={item.name}
                />
                <div className="w-full p-4">
                  <h1 className="text-gray-900 font-bold text-sm md:text-base lg:text-lg">{item.name}</h1>
                  <p className="text-gray-600 text-xs md:text-sm">$ {item.price}</p>
                  <button
                    onClick={() => addToWish(item._id)}
                    className="mt-4 bg-btnColor text-white py-1 px-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  >
                    {isFilled ? "Remove from Wishlist" : "Add to Wishlist"}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
