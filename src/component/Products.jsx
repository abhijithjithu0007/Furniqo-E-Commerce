import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mycontext } from '../Pages/SignUp';

const Products = () => {


    const {api,setApi} = useContext(Mycontext)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4">
            {api.map((item, key) => (
                <Link to={ `/collections/${item.id}`}>
                    <div key={key} className="card bg-base-100 w-72 md:w-auto lg:w-auto shadow-xl rounded-[20px] overflow-hidden">
                        <figure className="px-10 pt-10">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="rounded-xl w-full h-[220px]"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-semibold mb-2">{item.name}</h2>
                            <p className="text-red-600 mb-2">Price: ${item.price}</p>
                            <p className="text-yellow-500">{'★'.repeat(item.stars)}{'☆'.repeat(5 - item.stars)}</p>
                            <p className="text-gray-700 mb-4">{item.description}</p>
                            <div className="card-actions">

                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
     

    );
};

export default Products;
