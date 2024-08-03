import NodemailerService from "../services/nodemailerService.js";
import SendgridService from "../services/sendgridService.js";

/**
 * Function to get the appropriate email service based on the environment variable.
 * @returns {Object} - An instance of the selected email service.
 * @throws {Error} - If the EMAIL_SERVICE environment variable is invalid.
*/

const getEmailService = () => {
    switch (process.env.EMAIL_SERVICE) {
        case 'nodemailer':
            return new NodemailerService();
        case 'sendgrid':
            return new SendgridService();
        default:
            throw new Error("Invalid Email service selected");
    }
};

export default getEmailService;