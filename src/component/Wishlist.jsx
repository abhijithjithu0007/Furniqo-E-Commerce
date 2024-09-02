import axios from "axios";
import React, { useContext } from "react";
import useFetchProducts from "./CoustumeHook";
import { BiCartDownload } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { wishContext } from "./WishlistContext";
import toast from "react-hot-toast";

const Wishlist = () => {
    const { myWish, setMyWish } = useContext(wishContext);
    const { addToCart } = useFetchProducts();

    const handleAddPro = async (id, price) => {
        addToCart(id, price);
    };

    const handleRemove = async (productId) => {
        try {
            const resp = await axios.delete(
                "http://localhost:5000/api/user/removefromwish",
                {
                    data: { productId },
                    withCredentials: true,
                }
            );
            if (resp.status === 200) {
                toast.success("Removed From Wishlist", { position: "top-right" });
            }
            const data = resp.data.products;
            setMyWish(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg border border-gray-200 mt-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Your Favorite Items
            </h2>
            {myWish.length === 0 ? (
                <p className="text-center text-gray-500 mb-4">
                    There are no products in your wishlist.
                </p>
            ) : (
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-gray-600 font-medium">Product</th>
                            <th className="py-3 px-4 text-gray-600 font-medium">Price</th>
                            <th className="py-3 px-4 text-gray-600 font-medium">Stock</th>
                            <th className="py-3 px-4 text-gray-600 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myWish.map((product, key) => (
                            <tr
                                key={key}
                                className="border-t hover:bg-gray-50 transition duration-200"
                            >
                                <td className="flex items-center py-4 px-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-12 w-12 rounded-full border mr-4 object-cover shadow-sm"
                                    />
                                    <span className="font-semibold text-gray-800">
                                        {product.name}
                                    </span>
                                </td>
                                <td className="py-4 px-4 font-semibold">
                                    ₹{product.price}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-500">In Stock</td>
                                <td className="py-4 px-4">
                                    <button
                                        onClick={() => handleAddPro(product._id, product.price)}
                                        className="p-2 rounded-lg text-2xl shadow-md transition-all duration-300    "
                                    >
                                        <BiCartDownload />
                                    </button>
                                    <button
                                        onClick={() => handleRemove(product._id)}
                                        className="ml-3 p-2 rounded-lg  shadow-md transition-all duration-300 text-2xl hover:text-red-600"
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Wishlist;
