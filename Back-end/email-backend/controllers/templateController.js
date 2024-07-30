import EmailTemplate from '../models/template.js';

// Fetch all templates from the database
export const getTemplates = async () => {
  try {
    const templates = await EmailTemplate.find();
    return templates;
  } catch (error) {
    console.error('Error fetching templates:', error);
    return [];
  }
};

// Select a template by ID
export const getTemplateById = async (id) => {
  try {
    const template = await EmailTemplate.findById(id);
    return template;
  } catch (error) {
    console.error('Error fetching template by ID:', error);
    return null;
  }
};

// Create a new template
export const createTemplate = async (name, subject, body) => {
  const newTemplate = new EmailTemplate({
    name,
    subject,
    body,
  });

  try {
    await newTemplate.save();
    return newTemplate;
  } catch (error) {
    console.error('Error creating template:', error);
    return null;
  }
};
