import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'



const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const navigate = useNavigate();

  const handleName = (e) => {
    setUserName(e.target.value);
  };

  const handlePass = (e) => {
    setUserPass(e.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email: userName,
        password: userPass,
      });
  
      if (response.status === 200) {
        localStorage.setItem('currentUser', JSON.stringify(response.data.user))
        localStorage.setItem('isLogin', JSON.stringify(true));
        toast.success("Login Completed", { position: 'top-right' });
        navigate('/profile');
      } else {
        alert('Error occurred');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error("Invalid Credentials", { position: 'top-right' });
    }
  };
  

  return (
    <div>
      <div className="flex flex-col justify-center items-center max-w-md mx-auto my-10 bg-white p-8 border border-gray-300 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={handleName}
              type="email"
              id="email"
              className="mt-1 block w-full md:w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={handlePass}
              type="password"
              id="password"
              className="mt-1 block w-full md:w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button onClick={handleClick} class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Login</span>
            </button>
        <div className='mt-5 underline hover:text-btnColor'>
          <Link to={'/signup'}>Not have an account?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
