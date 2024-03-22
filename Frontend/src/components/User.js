import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TemplateCard from './TemplateCard';
import { useExerciseContext } from './ExerciseContext';

import logo from '../images/logo-nav.png';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const User = () => {
  const { userId } = useParams();
  const { users } = useExerciseContext();
  const [userTemplates, setUserTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const user = users.find((user) => user.id === userId);

  useEffect(() => {
    const fetchAssignedTemplates = async () => {
      setIsLoading(true);
      try {
        // Use Axios to get data directly, without needing to call .json()
        const response = await axios.get(`/api/templates/user/${userId}`);
        setUserTemplates(response.data); // Directly use response.data
      } catch (err) {
        setError(err.message || 'Failed to fetch templates');
        console.error("Error fetching assigned templates:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignedTemplates();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div >
     <div className=" mb-3 ml-2 mt-2 flex items-center">
        <img src={logo} alt="Logo" className="h-6 w-6 mr-2" />
        <span className="text-white text-lg font-semibold">Gym Coach</span>
      </div>
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center font-RedHat bg-black">
        <div className="w-full mb-8 bg-white bg-opacity-10 p-6 rounded-lg shadow-lg z-10">
        <h1 className='text-lg text-white mb-2'>Welcome {user.name}!</h1>
        <div className="font-bold mb-4 flex flex-wrap items-center justify-between text-white shadow-xl">
            <h1 className='text-2xl font-bold'>See your today's Exercises.</h1>
            <h2 className='text-lg text-lime-800 underline'>Your ID: {userId}</h2>
          </div>
          <p className="text-lg text-white text-center mb-2 font-semibold">This is your weekly Exercises from Gym Coach.</p>
          <p className="text-center text-gray-400 mb-4 font-normal">All the best!</p>

          {/* Special Considerations Section */}
          <div className=" bg-gray-600 bg-opacity-10 p-4 rounded-lg mb-4">
            <div className='flex'>
            <h2 className="text-xl md:text-2xl font-bold text-transparent flrx flex-wrap bg-clip-text bg-gradient-to-r from-lime-500 to-lime-400 mb-2">Special Considerations</h2>
            </div>
            
            <ul className="list-disc list-inside text-white">
              <li>Take 2 min rest between sets</li>
              <li>Do not Exercise On Your Own. Follow The Workout</li>
              <li>Any Exercise Causing Discomfort Discontinue</li>
              <li>Do warm up set for first exercise with light Weight</li>
              <li className='font-bold'>Nutrition Plan is VERY IMPORTANT For Maximum Recovery, Performance & fat loss</li>
            </ul>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl mb-4 p-6 font-bold text-lime-600">Weekly Exercises</h1>
          {userTemplates.length > 0 ? (
            userTemplates.map((template, index) => (
              <TemplateCard key={template._id || index} template={template} />
            ))
          ) : (
            <p className="text-white">No Exercises assigned yet.</p>
          )}
        </div>
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="home__triangle home__triangle-3 md:hidden"></div>
          <div className="home__triangle home__triangle-2"></div>
          <div className="home__triangle home__triangle-1"></div>
        </div>
      </div>
    </div>
  );
};

export default User;
