import sgMail from '@sendgrid/mail';
import EmailService from './emailService.js';

class SendgridService extends EmailService {
  constructor() {
    super();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail({ to, subject, text, html }) {
    const msg = {
      to,
      from: process.env.EMAIL_USER,
      subject,
      text,
      html
    };
    return sgMail.send(msg);
  }
}

export default SendgridService;
