import mongoose from "mongoose";


const variable = {
    name : {
        type: String,
    },
    type : {
        type: String,
    },
    value : {
        type: String,
    }
}

/**
 * TemplateSchema represents the schema for a template in the application.
 *
 * @typedef {Object} TemplateSchema
 * @property {String} templateId - The unique identifier for the template.
 * @property {String} Subject - The subject of the template.
 * @property {String} Content - The content of the template.
 * @property {String} type - The type of the template (email, sms, whatsapp).
 * @property {Array} variables - An array of variables used in the template.
 */
const TemplateSchema = new mongoose.Schema({
    templateId: {
        type: String,
        unique: true,
    },
    Subject: {
        type: String,
        required: true,
    },
    Content : {
        type: String,
        required: true,
    },
    type : {
        type: String,
        enum : ['email','sms','whatsapp'],
        required: true,
    },
    variables : [variable],
});

const Template = mongoose.model("Template", TemplateSchema);

export default Template;

