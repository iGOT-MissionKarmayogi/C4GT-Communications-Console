import express from 'express';
import { createTemplate, getTemplates, getTemplateById } from '../controllers/templateController.js';

const router = express.Router();

// Route to create a new template
router.post('/', async (req, res) => {
  const { name, subject, body } = req.body;
  const newTemplate = await createTemplate(name, subject, body);
  if (newTemplate) {
    res.status(201).json(newTemplate);
  } else {
    res.status(500).json({ message: 'Failed to create template' });
  }
});

// Route to fetch all templates
router.get('/', async (req, res) => {
  try {
    const templates = await getTemplates();
    res.status(200).json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ message: 'Failed to fetch templates' });
  }
});


// Route to fetch a template by ID
router.get('/:id', async (req, res) => {
  const templateId = req.params.id;
  try {
    const template = await getTemplateById(templateId);
    if (template) {
      res.status(200).json(template);
    } else {
      res.status(404).json({ message: 'Template not found' });
    }
  } catch (error) {
    console.error('Error fetching template by ID:', error);
    res.status(500).json({ message: 'Failed to fetch template' });
  }
});

export default router;
