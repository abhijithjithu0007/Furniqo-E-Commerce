import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePass = (e) => {
    setUserPass(e.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email: userEmail,
        password: userPass,
      },{ withCredentials: true });
  
      if (response.status === 200) {
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        localStorage.setItem('isLogin', JSON.stringify(true));
        toast.success("Login Completed", { position: 'top-right' });
        navigate('/');
      } else {
        alert('Error occurred');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error("Invalid Credentials", { position: 'top-right' });
    }
  };

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className=" container mx-auto">
        <div className=" flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{ backgroundImage: "url('https://img.freepik.com/free-vector/access-control-system-abstract-concept-illustration-security-system-authorize-entry-login-credentials-electronic-access-password-pass-phrase-pin-verification_335657-3373.jpg?t=st=1724476853~exp=1724480453~hmac=cc5a6165b8f0ff145ab2f0846777310aefa65a1b0f509402fa9f1e188a6b1016&w=740')" }}
            ></div>
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    onChange={handleEmail}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <input
                    onChange={handlePass}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="**************"
                  />
                </div>
               
                <div className="mb-6 text-center">
                  <button
                    onClick={handleClick}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Sign In
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to="/signup"
                  >
                    Create an Account!
                  </Link>
                </div>
              
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
