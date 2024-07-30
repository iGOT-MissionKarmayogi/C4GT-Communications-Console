import NodemailerService from "../services/nodemailerService.js";
import SendgridService from "../services/sendgridService.js";


const getEmailService=()=>{
    switch (process.env.EMAIL_SERVICE){
        case 'nodemailer':
            return new NodemailerService();
        case 'sendgrid':
            return new SendgridService();
        default:
            throw new Error("Invalid Email service selected")
    }
};

export default getEmailService;