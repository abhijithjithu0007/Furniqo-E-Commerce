import React from 'react';

const Users = () => {
  // Fetching user data from localStorage
  const allUser = localStorage.getItem('userData');
  const users = allUser ? JSON.parse(allUser) : [];

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Users List</h1>
      {users.length > 0 ? (
        <div className="grid gap-4">
          {users.map((item, id) => (
            <div key={id} className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-600">{item.email}</p>
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
