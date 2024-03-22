import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TypewriterComponent from "typewriter-effect";
import chooseImg from '../img/choose-img.png'; 
import logo from '../images/logo-nav.png';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const correctUsername = 'Admin';
    const correctPassword = 'Admin@123';

    if (username === correctUsername && password === correctPassword) {
      console.log('Login Successful');
      navigate('/Admin');
    } else {
      console.log('Login Failed: Incorrect username or password');
    }
  };

  return (
    <div>
     <div className="bg-black ml-2 mt-2 flex items-center">
        <img src={logo} alt="Logo" className="h-6 w-6 mr-2" />
        <span className="text-white text-lg font-semibold">Gym Coach</span>
      </div>
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-black">
        {/* Login form container */}
        <div className="mr-6 ml-6 p-4 md:w-1/2 lg:w-1/3 z-10">
          <h1 className="text-5xl mb-8 text-center home__title">Gym Coach</h1>
          <div className="w-full max-w-xs md:max-w-md px-8 py-4 bg-opacity-70 bg-gray-900 rounded-lg neon-lime text-white">
            <form onSubmit={handleLogin}>
              <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-lime-300">
                <TypewriterComponent
                    options={{
                      strings: [
                        "Admin Login"
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                />
              </h2>
              <p className='text-md md:text-lg italic text-center text-white mb-4'>Assign Exercises to user!</p>
              <div className="mb-4">
                <label htmlFor="username" className="block mb-2 font-medium text-sm">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 font-medium text-sm">Password</label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="show-password"
                  type="checkbox"
                  onChange={togglePasswordVisibility}
                  className="mr-2 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                />
                <label htmlFor="show-password" className="font-medium text-sm text-gray-300">Show Password</label>
              </div>
              <button
                type="submit"
                className="w-full text-black bg-lime-400 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        {/* Image container, only visible on md screens and larger */}
        <div className="hidden mt-16 md:flex justify-center md:w-1/2 lg:w-1/3 z-10">
          <img src={chooseImg} alt="Choose" className="home__img md:w-full max-w-md" />
        </div>
          <div className="home__triangle home__triangle-3 md:hidden z-0"></div>
            <div className="home__triangle home__triangle-2"></div>
            <div className="home__triangle home__triangle-1"></div>
      </div>
    </div>
  );
};

export default AdminLogin;
