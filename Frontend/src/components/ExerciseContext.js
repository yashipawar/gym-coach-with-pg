import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; 

import usersData from '../users.json';

// axios.defaults.baseURL = 'https://localhost:5000';

const ExerciseContext = createContext();

export const useExerciseContext = () => useContext(ExerciseContext);

export const ExerciseProvider = ({ children }) => {
  const [templates, setTemplates] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [users, setUsers] = useState(usersData);

  const onSave = async (template) => {
    try {
      // Here, "/api/templates/create" is the full path to your backend endpoint. Adjust as needed.
      const response = await axios.post('/api/templates/create', template);

      const newTemplate = response.data;
      setTemplates((prevTemplates) => [...prevTemplates, newTemplate]);

      // Optionally, handle success (e.g., showing a success message)
    } catch (error) {
      console.error('Error saving the template to the database:', error);
      // Optionally, handle the error (e.g., showing an error message)
    }
  };

  const fetchTemplatesForUser = async (userId) => {
    try {
      const response = await axios.get(`/api/templates/user/${userId}`);
      const assignedTemplates = response.data;
      setAssignments(assignedTemplates);
    } catch (error) {
      console.error('Error fetching templates for user:', error);
      // Optionally, handle the error (e.g., updating state to show an error message)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const templatesResponse = await axios.get('/api/templates/all');
        setTemplates(templatesResponse.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchData();
  }, []);

  const saveTemplate = async (template) => {
    try {
      const response = await axios.post('/api/templates/all', template);
      setTemplates(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };
  
  const deleteTemplate = async (templateId) => {
    try {
      const response = await axios.delete(`/api/templates/template/${templateId}`);
      setTemplates(prevTemplates => prevTemplates.filter(template => template.id !== templateId));
      console.log(response.data.message);
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };
  

  const assignTemplate = async (userId, templateId) => {
    try {
      await axios.post('/api/templates/assign', { userId, templateId });
      const updatedAssignments = await axios.get(`/api/templates/user/${userId}`);
      setAssignments(updatedAssignments.data);
      console.log(updatedAssignments.data)
    } catch (error) {
      console.error('Error assigning template:', error);
    }
  };

  return (
    <ExerciseContext.Provider value={{ users, templates, assignments, saveTemplate, deleteTemplate, assignTemplate, onSave, fetchTemplatesForUser }}>
      {children}
    </ExerciseContext.Provider>
  );
};
