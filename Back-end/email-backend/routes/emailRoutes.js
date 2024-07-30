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
  const { to, templateId } = req.body;

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
        text: selectedTemplate.body,
        html: selectedTemplate.bodyHtml, // Assuming you have an HTML body in your template model
      };
    } else {
      // Default email content
      emailContent = {
        to: to || 'aakarshsolar@gmail.com', // Use provided 'to' or default email
        subject: 'Test Email',
        text: 'This is a default test email, no template selected',
        html: '<p>This is a default test email, no template selected.</p>',
      };
    }

    const emailService = getEmailService();
    await emailService.sendEmail(emailContent);


    // Ensure 'to' is always defined for logging
    const recipient = to || 'aakarshsolar@gmail.com';




    //Log the email history in case of Success
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
    const recipient = to || 'aakarshsolar@gmail.com';

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

