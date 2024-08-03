import express from 'express';
import getEmailService from '../config/emailConfig.js';
import { getTemplateById } from '../controllers/templateController.js'; // Import the function to fetch template by ID
import EmailHistory from '../models/emailHistory.js';

const router = express.Router();

//To log email history
export const saveEmailStatus = async (emailData) => {
  const emailHistory = new EmailHistory(emailData);
  await emailHistory.save();
};
// Route to send an email with selected or default template
router.post('/', async (req, res) => {
  const { to,body, templateId } = req.body;

  try {
    let emailContent = {};

    if (templateId) {
      // Fetch the selected template by ID
      const selectedTemplate = await getTemplateById(templateId);

      if (!selectedTemplate) {
        return res.status(404).json({ message: 'Template not found' });
      }

      // Use the selected template content
      emailContent = {
        to,
        subject: selectedTemplate.subject,
        text: body,
        html: selectedTemplate.bodyHtml, 
      };
    } else {
      // Default email content
      emailContent = {
        to: to , // Use provided 'to' or default email
        subject: 'Test Email',
        text: 'This is a default test email, no template selected',
        html: '<p>This is a default test email, no template selected.</p>',
      };
    }

    const emailService = getEmailService();
    await emailService.sendEmail(emailContent);


    // Ensure 'to' is always defined for logging
    const recipient = to ;




    //Log the email history in case of Success
    /**
     * Represents the email data object.
     * @typedef {Object} EmailData
     * @property {string} username - The username of the recipient.
     * @property {string} email - The email address of the recipient.
     * @property {string} status - The status of the email (e.g., 'Success', 'Failed').
     * @property {string} time - The time the email was sent in the format 'HH:MM:SS'.
     * @property {string} date - The date the email was sent in the format 'MM/DD/YYYY'.
     */
    const emailData = {
      username: recipient,
      email: recipient,
      status: 'Success',
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    }
    
    await saveEmailStatus(emailData);




    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Failed to send email:', error);


    //Log the email history in case of Failure

    // Ensure 'to' is always defined for logging
    const recipient = to ;

    const emailData = {
      username: recipient,
      email: recipient,
      status: 'Fail',
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    }
    await saveEmailStatus(emailData);

    res.status(500).send('Failed to send email');
  }
});

export default router;

