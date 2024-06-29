import React, { useContext, useState } from 'react';
import { Mycontext } from '../component/SignUp';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [cate, setCate] = useState([]);
    const { api } = useContext(Mycontext);

    const handleCategory = (category) => {
        const filtering = api.filter((item) => item.category === category);
        setCate(filtering);
    };

    return (
        <div className="container mx-auto p-4 flex bg-whiteColor">
            <div className="w-1/4 pr-4">
                <div className="mb-8 space-y-4">
                    <h2 className="text-lg font-semibold mb-4">Categories</h2>
                    <button onClick={() => handleCategory("Boy fashion")} className="category-btn bg-btnColor hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300">Boys Fashion</button>
                    <button onClick={() => handleCategory("Girl fashion")} className="category-btn bg-btnColor hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300">Girls Fashion</button>
                    <button onClick={() => handleCategory("Feeding")} className="category-btn bg-btnColor hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300">Feeding</button>
                    <button onClick={() => handleCategory("Accessories")} className="category-btn bg-btnColor hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300">Accessories</button>
                    <button onClick={() => handleCategory("Toys")} className="category-btn bg-btnColor hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300">Toys</button>
                    <button onClick={() => handleCategory("Books")} className="category-btn bg-btnColor hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300">Books</button>
                    <button onClick={() => handleCategory("Footwear")} className="category-btn bg-btnColor hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300">Footwear</button>
                    <button onClick={() => handleCategory("Bed")} className="category-btn bg-btnColor hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300">Beds</button>
                </div>
            </div>
            <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {cate.map((item, key) => (
                    <Link to={`/collections/${item.id}`} key={key} className="w-full">
                        <div className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-whiteColor">
                            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h2>
                                <p className="text-gray-600 mb-2">{item.description}</p>
                                <p className="text-yellow-500">{'★'.repeat(item.stars)}{'☆'.repeat(5 - item.stars)}</p>
                                <h2 className="text-lg font-semibold text-gray-700">${item.price}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Categories;
