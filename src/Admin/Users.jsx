import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Admincontext } from './ContextAdmin';

const Users = () => {
  const { usersData } = useContext(Admincontext);


  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Users List</h1>
      {usersData.length >0 ? (
        <div className="grid gap-4">
          {usersData.map((item, id) =>(
            <Link key={id} to={`/admin/users/${item.id}`} className="block">
              <div className="bg-white shadow-md p-4 rounded-lg flex items-center h-20">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8847/8847419.png"
                  alt="Profile Icon"
                  className="h-16 w-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h2 className="text-lg font-bold mb-1">{item.name}</h2>
                  <p className="text-gray-600">{item.email}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No users found.</p>
      )}
    </div>
  );
};

export default Users;
