import React, { useState } from 'react';

import { useExerciseContext } from './ExerciseContext'; 

const AssignTemplate = () => {
  const { assignTemplate, templates } = useExerciseContext();
  const [userId, setUserId] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusMessageType, setStatusMessageType] = useState('info');

  const handleAssignTemplate = async () => {
    if (userId.trim() && selectedTemplateId) {
      try {
        await assignTemplate(userId.trim(), selectedTemplateId); 
        setStatusMessageType('success');
        setStatusMessage(`Template successfully assigned to user ID ${userId}.`);
      } catch (error) {
        console.error("Error assigning template:", error);
        setStatusMessageType('error');
        setStatusMessage('Failed to assign template. Please try again.');
      }
      setUserId('');
      setSelectedTemplateId('');
    } else {
      setStatusMessageType('error');
      setStatusMessage('Please select a user and a template to assign.');
    }
  };

  return (
    <div className="p-4 font-RedHat shadow-lg rounded-lg flex-grow flex-shrink w-full bg-slate-200 mt-4 text-black">
      <h2 className="text-2xl md:text-xl font-bold mb-4 text-green-500">Assign Template to User</h2>
      {statusMessage && <div className={`mb-4 text-center ${statusMessageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>{statusMessage}</div>}
      <div>
        <input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border border-gray-300 focus:ring-opacity-50 bg-transparent rounded-lg p-2 w-full mb-4"
          placeholder="User ID"
        />
        <select
          id="templateSelect"
          value={selectedTemplateId}
          onChange={(e) => setSelectedTemplateId(e.target.value)}
          className="border border-gray-300 bg-transparent focus:ring-opacity-50 rounded-lg p-2 w-full mb-4"
        >
          <option value="">Select a template...</option>
          {templates.map((template) => (
            // Ensure `template.id` is a unique value for each template
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAssignTemplate}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Assign Template
        </button>
      </div>
    </div>
  );
};

export default AssignTemplate;
