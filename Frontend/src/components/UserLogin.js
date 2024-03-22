import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TypewriterComponent from "typewriter-effect";
import usersData from '../users.json'; 
import chooseImg from '../img/calculate-img.png'; // Ensure this path is correct
import logo from '../images/logo-nav.png';

const UserLogin = () => {
  const [userId, setUserId] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userExists = usersData.some((user) => user.id === userId);
    if (userExists) {
      setLoginStatus('Login successful!');
      navigate(`/user/${userId}`);
    } else {
      setLoginStatus('Login failed: ID not found.');
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
          <h1 className="text-5xl mb-8 font-bold text-center">Welcome to Gym <br className='text-center' /> Coach</h1>

          <form className="w-full max-w-xs md:max-w-md px-8 py-6 bg-opacity-90 bg-gray-900 rounded-lg neon-lime text-white" onSubmit={handleSubmit}>
            <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-lime-400">
              <TypewriterComponent
                    options={{
                      strings: [
                        "User Login"
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                />
            </h2>
            <p className="text-lg italic text-center text-white mb-4">See your assigned exercises for today!</p>
            <label htmlFor="userId" className="block mb-2 font-medium text-sm">User ID</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="block w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
            />

            <button type="submit" className="w-full text-lime-500 bg-white font-semibold rounded-lg text-sm px-5 py-2.5 text-center mb-2">
              Submit
            </button>
          </form>

          {loginStatus && (
            <p className="mt-4 text-red-500">{loginStatus}</p>
          )}
        </div>

        {/* Image container, only visible on md screens and larger */}
        <div className="hidden md:flex justify-center md:w-1/2 lg:w-1/3 z-10">
          <img src={chooseImg} alt="Choose" className="w-3/4 md:w-full max-w-md" />
        </div>
          <div className="home__triangle home__triangle-3 md:hidden z-0"></div>
            <div className="home__triangle home__triangle-2"></div>
            <div className="home__triangle home__triangle-1"></div>
      </div>
    </div>
  );
};

export default UserLogin;
