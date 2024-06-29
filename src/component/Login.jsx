import React, { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';


const Login = ({ setIsLoggedIn }) => {
  const [loginError, setLoginError] = useState({});
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const navigate = useNavigate();

  const handleName = (e) => {
    setUserName(e.target.value);
  };

  const handlePass = (e) => {
    setUserPass(e.target.value);
  };

  const name = localStorage.getItem('username');
  const pass = localStorage.getItem('password');

  const handleClick = () => {
    const errors = {};
    if (userName !== name) {
      errors.nameErr = '* Name does not match';
    }
    if (userPass !== pass) {
      errors.passErr = '* Password does not match';
    }
    setLoginError(errors);

    if (userName === name && userPass === pass) {
      localStorage.setItem('isLogin', JSON.stringify(true));
      setIsLoggedIn(true)
      navigate('/profile')
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center max-w-md mx-auto my-10 bg-white p-8 border border-gray-300 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              onChange={handleName}
              type="text"
              id="name"
              className="mt-1 block w-full md:w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your name"
            />
            {loginError.nameErr && <p>{loginError.nameErr}</p>}
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
            {loginError.passErr && <p>{loginError.passErr}</p>}
          </div>
        </div>
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
        <div>
          <Link to={'/signup'}>Not have an account?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
