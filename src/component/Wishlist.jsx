import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useFetchProducts from "./CoustumeHook";
import { BiCartDownload } from "react-icons/bi";
import { wishContext } from "./WishlistContext";

const Wishlist = () => {
    const userdetails = localStorage.getItem('currentUser')
    const {myWish,setMyWish} = useContext(wishContext)
    const {addToCart} = useFetchProducts()

    const handleAddPro=async(id,price)=>{
      addToCart(id,price)
    }

    const handleRemove=async(productId)=>{
        console.log(productId);
        
      try {
        const resp = await axios.delete('http://localhost:5000/api/user/removefromwish',{
            data:{productId},
            withCredentials:true
        })
        const data = resp.data.products
        setMyWish(data)
      } catch (error) {
        console.log(error);
      }
    }


    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold text-center">Your Favorite Items</h2>
            {myWish.length<0?<p className="text-center text-gray-500 mb-4">
                There are {myWish.length} products in this list
            </p>:''}
            
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-left py-2 px-4">Product Name</th>
                        <th className="text-left py-2 px-4">Unit Price</th>
                        <th className="text-left py-2 px-4">Stock Status</th>
                        <th className="text-left py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {myWish.map((product) => (
                        <tr key={product._id} className="border-t">
                            <td className="flex items-center py-2 px-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-10 w-10 rounded-full mr-4"
                                />
                                {product.name}
                            </td>
                            <td className="py-2 px-4">
                                {product.price}
                            </td>
                            <td className="py-2 px-4">In Stock</td>
                            <td className="py-2 px-4">
                                <button onClick={()=>handleAddPro(product._id,product.price)}
                                    className=" text-black text-xl px-5 "
                                >
                                    <BiCartDownload />
                                </button>
                                <button onClick={()=>handleRemove(product._id)} className="ml-2 text-gray-500 hover:text-red-600">
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Wishlist;
