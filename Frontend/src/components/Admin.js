import React from 'react';

import CreateTemplate from './CreateTemplate';
import SavedTemplates from './SavedTemplates';
import AssignTemplates from './AssignTemplates';

const Admin = () => {
  return (
    <div className="p-4 flex flex-wrap bg-slate-300 shadow-2xl">
      <h1 className="text-4xl font-RedHat mb-4 w-full font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-green-500">Admin Dashboard</h1>
      <p className="mb-8 w-full text-lg text-slate-700">Welcome to the admin panel. Here you can manage templates, view saved templates and assign templates to users.</p>
      <CreateTemplate />
      <SavedTemplates />
      <AssignTemplates />
    </div>
  );
};

export default Admin;
