import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Admincontext } from './ContextAdmin';

const UserDetails = () => {
  const params = useParams();
  const { usersData } = useContext(Admincontext) 
  const eachUser = usersData.filter((val) => val._id === params.id);
  

  return (
    <div className="max-w-lg mx-auto mt-8">
      {eachUser.length > 0 ? (
        eachUser.map((item, id) => (
          <div key={id} className="bg-white shadow-md p-8 rounded-lg space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
              <h3 className="text-lg text-gray-700">{item.email}</h3>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold mt-4 mb-2">Order Details</h2>
              <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                <p className="text-gray-800"><span className="font-semibold">Order ID:</span> 12345</p>
                <p className="text-gray-800"><span className="font-semibold">Product:</span>Baby Suit</p>
                <p className="text-gray-800"><span className="font-semibold">Quantity:</span> 2</p>
                <p className="text-gray-800"><span className="font-semibold">Price:</span> 589.00</p>
                <p className="text-gray-800"><span className="font-semibold">Status:</span> Shipped</p>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-1xl font-semibold mt-4 mb-2">Address</h2>
              <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                <p className="text-gray-800"><span className="font-semibold">Street:</span>Nilambur</p>
                <p className="text-gray-800"><span className="font-semibold">City:</span>Pookkottumpadam</p>
                <p className="text-gray-800"><span className="font-semibold">State:</span>Malappuram</p>
                <p className="text-gray-800"><span className="font-semibold">Zip Code:</span> 12345</p>
                <p className="text-gray-800"><span className="font-semibold">Country:</span>India</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">User not found.</p>
      )}
    </div>
  );
};

export default UserDetails;
