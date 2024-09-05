import nodemailer from 'nodemailer';
import EmailService from './emailService.js';


/**
 * Represents a service for sending emails using Nodemailer.
 * @extends EmailService
 */
class NodemailerService extends EmailService{
    constructor(){
        super();
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }
    /**
     * Sends an email using Nodemailer.
     *
     * @param {Object} options - The email options.
     * @param {string} options.to - The recipient's email address.
     * @param {string} options.subject - The email subject.
     * @param {string} options.text - The plain text version of the email.
     * @param {string} options.html - The HTML version of the email.
     * @returns {Promise} A promise that resolves when the email is sent.
     */
    async sendEmail({ to, subject, text, html }){
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html
        };
        return this.transporter.sendMail(mailOptions);
    }
}

export default NodemailerService;