import React, { useState, useEffect, useContext,createContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Mycontext = createContext();

const SignUp = () => {
  const [validate, setValidate] = useState({ name: "", email: "", password: "", confirm: "" });
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const { userData, setUserData } = useContext(Mycontext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValidate({ ...validate, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormError(validating(validate));
    setIsSubmit(true);
    setUserData([...userData, { username: validate.name, password: validate.password, email: validate.email }]);
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      alert("Registration Completed");
      navigate('/login');
      localStorage.setItem('username', validate.name);
      localStorage.setItem('password', validate.password);
      localStorage.setItem('email', validate.email);

    }
  }, [formError, isSubmit, navigate]);

  const validating = (values) => {
    const errors = {};
    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.name) {
      errors.name = "* Username is required!";
    }
    if (!values.email) {
      errors.email = "* Email is required!";
    } else if (!regEx.test(values.email)) {
      errors.email = "* This is not a valid email";
    }
    if (!values.password) {
      errors.password = "* Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "* Password must contain more than 4 characters";
    } else if (values.password.length > 8) {
      errors.password = "* Password must contain less than 8 characters";
    } else if (values.password !== values.confirm) {
      errors.confirm = "*The passwords do not match";
    }
    return errors;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Register an Account
        </h2>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input onChange={handleChange} id="name" name="name" type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Name" />
              </div>
              <p className='text-red-700'>{formError.name}</p>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input onChange={handleChange} id="email" name="email" type="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Email" />
              </div>
              <p className='text-red-700'>{formError.email}</p>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input onChange={handleChange} id="password" name="password" type="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your password" />
              </div>
              <p className='text-red-700'>{formError.password}</p>
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input onChange={handleChange} id="confirm" name="confirm" type="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Confirm your password" />
              </div>
              <p className='text-red-700'>{formError.confirm}</p>
            </div>
            <div>
              <button onClick={handleClick} type="submit" className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-600">
                Register
              </button>
              <div className='text-center mt-3'>
                <p>Already have an account?<Link to='/login' className='text-indigo-600 hover:text-indigo-700'>Login</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
