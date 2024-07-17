import nodemailer from 'nodemailer';
import Template from '../Models/Template.model.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

/**
 * @desc    Send Email to array of users of particular tempalte
 * @route   POST /api/email
 * @access  Private
 * 
 */

const sendEmail = async (req, res) => {
    try {
        const { templateId , emails } = req.body;

        const template = await Template.findOne({ templateId });

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'Template not found',
            });
        }

        const mailOptions = {
            from: process.env.EMAIL,
            to: emails,
            subject: template.Subject,
            html: template.Content,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Email sent',
                data: info,
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export { sendEmail };