import express from 'express';
import { createTemplate, getTemplates, getTemplateById , updateTemplate} from '../controllers/templateController.js';
import mongoose from 'mongoose';
import EmailTemplate from '../models/template.js';

const router = express.Router();

// Route to create a new template
router.post('/', async (req, res) => {
  const { name, subject, body } = req.body;
  /**
   * Creates a new template.
   *
   * @param {string} name - The name of the template.
   * @param {string} subject - The subject of the template.
   * @param {string} body - The body of the template.
   * @returns {Promise} - A promise that resolves to the newly created template.
   */
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
    /**
     * Retrieves the templates.
     * @returns {Promise<Array>} The templates.
     */
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
    /**
     * Represents a template object.
     * @typedef {Object} Template
     * @property {string} templateId - The ID of the template.
     * @property {string} content - The content of the template.
     * @property {string} subject - The subject of the template.
     */
    const template = await getTemplateById(templateId);
    if (template) {
      res.status(200).json(template);
    } else {
      res.status(404).json({ message: 'Template not found by get' });
    }
  } catch (error) {
    console.error('Error fetching template by ID:', error);
    res.status(500).json({ message: 'Failed to fetch template' });
  }
});

// Route to update a template by ID
router.put('/:id', async (req, res) => {
  const templateId = req.params.id;
  const templateData = req.body;
  try {
    console.log('Updating template with ID:', templateId);
    console.log('Template data:', templateData);

    // Validate templateId
    if (!mongoose.Types.ObjectId.isValid(templateId)) {
      return res.status(400).json({ message: 'Invalid template ID' });
    }

    const updatedTemplate = await EmailTemplate.findByIdAndUpdate(templateId, templateData, { new: true });
    if (updatedTemplate) {
      res.status(200).json(updatedTemplate);
    } else {
      res.status(404).json({ message: 'Template not found' });
    }
  } catch (error) {
    console.error('Error updating template by ID:', error);
    res.status(500).json({ message: 'Failed to update template', error: error.message });
  }
});

export default router;
