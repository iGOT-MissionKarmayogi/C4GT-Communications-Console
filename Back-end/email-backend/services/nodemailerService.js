import nodemailer from 'nodemailer';
import EmailService from './emailService.js';


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