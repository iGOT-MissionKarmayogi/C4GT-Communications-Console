import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    TemplateId: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const HistoryModel = mongoose.model('History', historySchema);

export default HistoryModel;