import React from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../images/logo-nav.png';
import homeImg from '../img/home-img.png';

const Home = () => {
  const navigate = useNavigate();

  const handleAdminLoginClick = () => {
    navigate('/AdminLogin');
  };

  const handleUserLoginClick = () => {
    navigate('/UserLogin');
  };

  return (
    <div>
      <nav className=" nav container nav__logo">
          <img src={logo} alt="Logo" />
          <span className=" ">Gym Coach</span>
      {/* Admin Login Button */}
      <button
        onClick={handleAdminLoginClick}
        className="mt-2 absolute top-2 right-12 hidden md:inline-flex neon-lime font-medium rounded-lg text-sm md:text-base lg:text-lg z-10 px-5 py-2.5 text-center sm:mb-0"
      >
        Admin Login
      </button>
    </nav>
    <section className="home section" id="home">
      <div className="home__container container grid"> 
        <div className="home__data">
          <h2 className="home__subtitle font-4xl">WELCOME TO</h2>
          <h1 className="home__title">GYM Coach</h1>
          <p className="home__description mb-4">
            In here, we'll help you to shape and build your ideal body and live your life to the fullest.
          </p>
          <p className="mb-2 mt-2 ml-6 italic animate-bounce">See what you have to do today!</p>
          <button
            onClick={handleUserLoginClick}
            className="ml-6 z-10 button button__flex "
          >
            User Login <i className='ri-arrow-right-line'></i>
          </button>
        </div>
        <div className="home__images">
          <img src={homeImg} alt="home img" className="home__img" />
          <div className="home__triangle home__triangle-3"></div>
          <div className="home__triangle home__triangle-2"></div>
          <div className="home__triangle home__triangle-1"></div>
        </div>
      </div>
    </section>
  </div>
  
  );
};

export default Home;
