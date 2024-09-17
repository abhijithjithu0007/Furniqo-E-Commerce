import axios from "axios";
import React, { useContext } from "react";
import useFetchProducts from "./CoustumeHook";
import { BiCartDownload } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { wishContext } from "../Context/WishlistContext";
import toast from "react-hot-toast";
import { useLoad } from "../Context/LoadingContext";
import axiosInstance from "../axiosInstance";

const Wishlist = () => {
    const { myWish, setMyWish } = useContext(wishContext);
    const { addToCart } = useFetchProducts();
    const { startLoad, stopLoad } = useLoad(useContext);

    const handleAddPro = async (id, price) => {
        addToCart(id, price);
    };

    const handleRemove = async (productId) => {
        startLoad();
        try {
            const resp = await axiosInstance.delete(`/api/user/removefromwish`, {
                data: { productId },
                withCredentials: true,
            });
            if (resp.status === 200) {
                toast.success("Removed From Wishlist", { position: "top-right" });
            }
            const data = resp.data.products;
            setMyWish(data);
        } catch (error) {
            console.log(error);
        } finally {
            stopLoad();
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold text-center mb-8">Favourites</h2>
            <div className="text-center mb-6">
                <p>{myWish ? myWish.length : 0} Items</p>
            </div>
            {myWish.length === 0 ? (
                <p className="text-center text-gray-500 mb-4">
                    There are no products in your wishlist.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {myWish.map((product, key) => (
                        <div key={key} className="border rounded-lg p-4 shadow-lg relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-cover mb-4 rounded"
                            />
                            <button
                                onClick={() => handleRemove(product._id)}
                                className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full"
                            >
                                <MdDeleteOutline className="text-gray-600 hover:text-red-600 text-xl" />
                            </button>
                            <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                            <p className="text-xl font-semibold mb-4">₹{product.price}</p>
                            <button
                                onClick={() => handleAddPro(product._id, product.price)}
                                className="w-full bg-black text-white p-2 rounded transition-all duration-300 hover:bg-white hover:text-black border border-black flex items-center justify-center"
                            >
                                <BiCartDownload className="mr-2" /> Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
