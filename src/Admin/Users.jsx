import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Admincontext } from './ContextAdmin';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';

const Users = () => {
  const { usersData, setUsersData } = useContext(Admincontext);

  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(`http://localhost:5000/api/admin/deleteuser/${id}`, {
        withCredentials: true
      });
      console.log(resp);

      if (resp.status === 200) {
        const updatedUser = usersData.filter((user) => user._id !== id);
        setUsersData(updatedUser);
        alert('User deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold mb-6">Users List</h1>
      {usersData.length > 0 ? (
        <div className="space-y-4">
          {usersData.map((item) => (
            <div key={item._id} className="bg-white shadow-lg p-4 rounded-lg flex items-center space-x-4">
              <Link to={`/admin/users/${item._id}`} className="flex items-center space-x-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8847/8847419.png"
                  alt="Profile Icon"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
                  <p className="text-gray-700">{item.email}</p>
                </div>
              </Link>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-600 hover:text-red-800 transition-colors duration-150"
                aria-label="Delete User"
              >
                <MdDeleteForever className="text-2xl" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No users found.</p>
      )}
    </div>
  );
};

export default Users;
