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
    const {startLoad,stopLoad} = useLoad(useContext)
    const handleAddPro = async (id, price) => {
        addToCart(id, price);
    };

    const handleRemove = async (productId) => {
        startLoad()
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
        }finally{
            stopLoad()
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 rounded-lg shadow-lg border border-gray-200 mt-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 md:mb-6">
                Your Favorite Items
            </h2>
            {myWish.length === 0 ? (
                <p className="text-center text-gray-500 mb-4">
                    There are no products in your wishlist.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-2 md:px-4 text-gray-600 font-medium">Product</th>
                                <th className="py-3 px-2 md:px-4 text-gray-600 font-medium">Price</th>
                                <th className="py-3 px-2 md:px-4 text-gray-600 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myWish.map((product, key) => (
                                <tr
                                    key={key}
                                    className="border-t hover:bg-gray-50 transition duration-200"
                                >
                                    <td className="flex items-center py-4 px-2 md:px-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-10 w-10 md:h-12 md:w-12 rounded-full border mr-2 md:mr-4 object-cover shadow-sm"
                                        />
                                        <span className="font-semibold text-gray-800 text-sm md:text-base">
                                            {product.name}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 md:px-4 font-semibold text-sm md:text-base">
                                        ₹{product.price}
                                    </td>
                                    <td className="py-4 px-2 md:px-4 flex items-center">
                                        <button
                                            onClick={() => handleAddPro(product._id, product.price)}
                                            className="p-2 rounded-lg text-xl md:text-2xl shadow-md transition-all duration-300 hover:bg-gray-100"
                                        >
                                            <BiCartDownload />
                                        </button>
                                        <button
                                            onClick={() => handleRemove(product._id)}
                                            className="ml-2 md:ml-3 p-2 rounded-lg shadow-md transition-all duration-300 text-xl md:text-2xl hover:text-red-600 hover:bg-gray-100"
                                        >
                                            <MdDeleteOutline />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
