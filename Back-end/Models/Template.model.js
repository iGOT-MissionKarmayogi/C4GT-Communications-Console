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

