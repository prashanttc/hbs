import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://hbs-a2w9.onrender.com/api/auth/register", credentials);
      navigate("/login");
    } catch (err) {
     console.log(err)
        }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Hotel Booking System
          </a>
          <div className="space-y-6">
            <h1 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
              create your account
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input
                  type="text"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
        
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone number</label>
                <input
                  type="number"
                  id="phone"
                  placeholder="11223344"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="abc@mail.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
           
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600"
                  />     
                </div>
              </div>
              <button
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleClick}
              >
             create account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                already have a account??sign in <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
