import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Admincontext } from './ContextAdmin';

const UserDetails = () => {
  const params = useParams();
  const { usersData } = useContext(Admincontext);

  const eachUser = usersData.filter((val) => val.id === params.id);
  console.log(eachUser);

  return (
    <div className="max-w-lg mx-auto mt-8">
      {eachUser.length > 0 ? (
        eachUser.map((item, id) => (
          <div key={id} className="bg-white shadow-md p-8 rounded-lg">
            <h1 className="text-3xl font-bold mb-4">{item.fullname}</h1>
            <h3 className="text-xl text-gray-700">{item.email}</h3>
          </div>
        ))
      ) : (
        <p className="text-gray-600">User not found.</p>
      )}
    </div>
  );
};

export default UserDetails;
