import React, { useState} from 'react';

import axios from 'axios';

import exercises from './ExerciseAPI'; 
import { useExerciseContext } from './ExerciseContext'; 

axios.defaults.baseURL = 'https://gym-coach-with-pg.onrender.com';


const CreateTemplate = () => {
  const { onSave } = useExerciseContext();
  const [day, setDay] = useState('');
  const [muscle, setMuscle] = useState('');
  const [selectedExercises, setSelectedExercises] = useState(new Set());
  const targetMuscles = ['Chest', 'Biceps', 'Shoulder', 'Triceps', 'Legs', 'Back'];

  const handleExerciseChange = (exerciseName) => {
    const updatedExercises = new Set(selectedExercises);
  
    if (updatedExercises.has(exerciseName)) {
      updatedExercises.delete(exerciseName);
    } else {
      updatedExercises.add(exerciseName);
    }
  
    setSelectedExercises(updatedExercises);
  };
  
  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  function getExercisesDetails(selectedExercisesNames) {
    return selectedExercisesNames.map(selectedName => 
      exercises.find(exercise => exercise.name === selectedName)
    );
  }

  const handleSubmit = async () => {
    // Ensure getExercisesDetails is correctly formatting the exercisesArray
    const exercisesArray = getExercisesDetails(Array.from(selectedExercises));
  
    if (day && muscle && exercisesArray.length > 0) {
      const name = `${day}-${muscle}`; 
      const template = { name, day, muscle, exercises: exercisesArray };
      try {
        await onSave(template);  // Assuming onSave is received from context and is the function you defined.
        // Handle success feedback to user here
        resetFormFields();  // Assuming this resets your form's state
      } catch (error) {
        console.error('Error saving the template:', error);
        // Handle error feedback to user here
      }
    } else {
      alert('Please fill all the fields and select at least one exercise.');
    }
  };
  
  
  const resetFormFields = () => {
    setDay('');
    setMuscle('');
    setSelectedExercises(new Set());
  };

  return (
    <div className='font-RedHat p-4 shadow-lg rounded-lg flex-grow flex-shrink w-full bg-white text-black'>
    <h2 className="text-2xl md:text-xl text-lime-600 font-bold mb-4">Create Workout Template</h2>
    <div className='mb-5'>
      <label className="block text-lg font-semibold mr-4">
        Day:  
        <select 
          className="mt-1 text-sm block w-52 h-6 rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-slate-300"
          value={day} 
          onChange={handleDayChange}
        >
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
      </label>
    </div>
    <div className="mb-5">
      <label className="block text-lg font-semibold">Target Muscle:</label>
        <div className="mt-2">
        {targetMuscles.map((targetMuscle, index) => (
            <div key={index} className="flex items-center mb-2">
                <input
                    type="radio"
                    id={targetMuscle}
                    name="muscle"
                    value={targetMuscle}
                    className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                    checked={muscle === targetMuscle}
                    onChange={(e) => setMuscle(e.target.value)}
                />
                <label htmlFor={targetMuscle} className="ml-3 block text-sm font-medium ">
                    {targetMuscle}
                </label>
            </div>
        ))}
              </div>
        </div>
        <fieldset className="mb-2">
              <legend className="text-lg font-semibold">Choose Exercises:</legend>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 font-medium gap-4 mt-2">
                  {exercises.map((exercise) => (
                      <div key={exercise.name} className="flex flex-col items-center text-center">
                          <label>
                          <input
                            type="checkbox"
                            className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 mb-4 mr-2 rounded"
                            checked={selectedExercises.has(exercise.name)}
                            onChange={() => handleExerciseChange(exercise.name)}
                          />

                              {exercise.name}
                          </label>
                          <img src={exercise.gifPath} alt={exercise.name} className="w-24 h-24 md:w-32 md:h-32 mb-4 rounded" loading="lazy" />
                      </div>
                  ))}
              </div>
          </fieldset>
          <button onClick={handleSubmit}
            className="mt-4 hover:bg-green-700 text-blue-600 font-bold py-2 px-4 rounded-lg neon-blue">
              Save Template
          </button>
    </div>
  );
}

export default CreateTemplate;
