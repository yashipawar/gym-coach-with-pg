// SavedTemplates.js
import React from 'react';
import { useExerciseContext } from './ExerciseContext';

const SavedTemplates = () => {
  const { templates, deleteTemplate } = useExerciseContext();

  return (
    <div className=" font-RedHat p-4 bg-slate-100 shadow-lg rounded-lg flex-grow flex-shrink w-full text-black mt-4">
      <h2 className="text-2xl md:text-xl font-bold mb-4 text-green-500">Saved Templates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="flex flex-col shadow-lg rounded-lg p-2 bg-white mb-4"> {/* Added mb-4 for spacing below each card */}
            <div className="flex-1">
              <h3 className="font-semibold text-black text-base md:text-lg">{`${template.day}-${template.muscle}`}</h3>
              <p className="text-sm text-orange-500">Day: {template.day}</p>
              <p className="text-sm">Target Muscle: {template.muscle}</p>
              <div>
                <h4 className="font-semibold mt-2 text-sm md:text-base">Exercises:</h4>
                <ul className="list-disc pl-5">
                  {template.exercises.map((exercise, index) => (
                    <li key={index} className="flex items-center justify-between mt-1">
                      <span className="text-sm md:text-base">{exercise.name}</span>
                      {exercise.gifpath && (
                        <img src={exercise.gifpath} alt={exercise.name} className="ml-2 w-12 h-12 md:w-16 md:h-16 rounded" loading="lazy" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-2 flex justify-center pb-2"> {/* Added pb-2 for padding at the bottom */}
              <button
                onClick={() => deleteTemplate(template.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs md:text-sm w-3/4" 
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedTemplates;
