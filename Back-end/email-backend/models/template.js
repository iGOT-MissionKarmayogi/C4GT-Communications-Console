import mongoose from 'mongoose';

/**
 * Represents a template schema.
 *
 * @typedef {Object} TemplateSchema
 * @property {string} name - The name of the template.
 * @property {string} subject - The subject of the template.
 * @property {string} body - The body of the template.
 * @property {Date} createdAt - The creation date of the template.
 */
const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EmailTemplate = mongoose.model('EmailTemplate', templateSchema,'emailTemplates');

export default EmailTemplate;
