import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useFetchProducts from './CoustumeHook';
import { BiCartDownload } from "react-icons/bi";
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { products } = useFetchProducts();
  const navigate = useNavigate();
  const { id } = useParams();
  const [carts, setCarts] = useState(null);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`http://localhost:5000/api/user/${id}`);
        setCarts(resp.data);

        const wishlistResp = await axios.get(`http://localhost:5000/api/user/viewwishlist/${id}`, { withCredentials: true });
        setIsFilled(wishlistResp.data.isInWishlist);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const { addToCart } = useFetchProducts()

  const handle = async () => {
    addToCart(carts._id, carts.price)
  }


  const addToWish = async (productId) => {
    try {
      if (isFilled) {
        await axios.delete('http://localhost:5000/api/user/removefromwish', {
          data: { productId: productId },
          withCredentials: true
        });
        setIsFilled(false);
      } else {
        await axios.post('http://localhost:5000/api/user/wishlist', {
          productId: productId
        }, { withCredentials: true });
        setIsFilled(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const related = products.filter((rel) => rel.category === (carts ? carts.category : ''));

  return (
    <div>
      <div className="container mx-auto p-4">
        {carts && (
          <div className="min-w-screen min-h-screen bg-btnColor flex items-center p-5 lg:p-10 overflow-hidden relative">
            <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
              <div className="md:flex items-center -mx-10">
                <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                  <div className="relative">
                    <img src={carts.image} className="w-full relative z-10" alt="" />
                    <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-10">
                  <div className="mb-10">
                    <h1 className="font-bold uppercase text-2xl mb-5">{carts.name}</h1>
                    <p className="text-sm">{carts.description}
                      <a href="#" className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i className="mdi mdi-arrow-right"></i></a>
                    </p>
                  </div>
                  <div>
                    <div className="inline-block align-bottom mr-5">
                      <span className="text-2xl leading-none align-baseline">₹</span>
                      <span className="font-bold text-5xl leading-none align-baseline">{carts.price}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <button
                        onClick={handle}
                        className="bg-gradient-to-r from-blue-500 to-btnColor text-white hover:from-btnColor hover:to-blue-600 opacity-90 hover:opacity-100 text-lg font-semibold rounded-full px-8 py-3 flex items-center space-x-2 transition-all duration-300"
                      >
                        <BiCartDownload className="text-2xl" />
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="border-b border-gray-300">
            <ul className="flex space-x-8 overflow-x-auto">
              <li className="pb-2 border-b-2 border-btnColor whitespace-nowrap">Description</li>
              <li className="pb-2 whitespace-nowrap">Additional Information</li>
              <li className="pb-2 whitespace-nowrap">Reviews (5)</li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Product Description</h3>
            <p className="mt-2">
              Pellentesque habitant morbi tristique senectus et netus et malesuada
              fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
              ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
              egestas semper. Aenean ultricies mi vitae est. Mauris placerat
              eleifend leo.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 border-b-2 border-btnColor">You may also like...</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item, id) => (
              <Link to={`/category/${item._id}`} key={id}>
                <div className="flex flex-col justify-center items-center max-w-sm mx-auto my-8">
                  <div style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                    className="bg-gray-300 h-64 w-full rounded-lg shadow-md bg-cover bg-center"></div>
                  <div className="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
                    <div className="py-2 text-center font-bold uppercase tracking-wide text-gray-800">{item.name}</div>
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-200">
                      <h1 className="text-gray-800 font-bold">₹{item.price}</h1>
                      <p className="text-yellow-500 text-sm">{'★'.repeat(item.stars)}{'☆'.repeat(5 - item.stars)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
