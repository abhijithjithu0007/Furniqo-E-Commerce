import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Admincontext } from '../Context/ContextAdmin';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';

const Users = () => {
  const { usersData, setUsersData } = useContext(Admincontext);
  const apiorigin = import.meta.env.VITE_API_URL

  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(`${apiorigin}/api/admin/deleteuser/${id}`, {
        withCredentials: true
      });

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
    <div className="w-full max-w-6xl mx-auto mt-12 p-8 bg-[#1E1E1E] rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-[#FFFFFF] mb-6 border-b border-[#B0B0B0] pb-4">Users List</h1>
      {usersData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usersData.map((item) => (
            <div key={item._id} className="bg-[#2A2A2A] shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
              <Link to={`/admin/users/${item._id}`} className="flex items-center p-4 hover:bg-[#333333] transition-colors duration-150">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8847/8847419.png"
                  alt="Profile Icon"
                  className="h-20 w-20 rounded-full border-2 border-[#007BFF] object-cover"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-[#FFFFFF] mb-1">{item.name}</h2>
                  <p className="text-[#B0B0B0]">{item.email}</p>
                </div>
              </Link>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-[#FF4D4D] text-white hover:bg-red-600 transition-colors duration-150 rounded-b-lg w-full py-2 flex items-center justify-center"
                aria-label="Delete User"
              >
                <MdDeleteForever className="text-xl" />
                <span className="ml-2">Delete</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#B0B0B0] text-center text-lg">No users found.</p>
      )}
    </div>
  );
};

export default Users;
