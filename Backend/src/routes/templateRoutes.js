const express = require('express');
const router = express.Router();
const { createTemplate, getAllTemplates, assignTemplateToUser, getAssignedTemplatesForUser, deleteTemplate } = require('../controllers/templateControllers');

// Existing template routes
router.post('/create', createTemplate);
router.get('/all', getAllTemplates);

// Route to delete a template
router.delete('/template/:templateId', deleteTemplate);

// Assign a template to a user
router.post('/assign', assignTemplateToUser);

// Get all templates assigned to a specific user
router.get('/user/:userId', getAssignedTemplatesForUser);

module.exports = router;
