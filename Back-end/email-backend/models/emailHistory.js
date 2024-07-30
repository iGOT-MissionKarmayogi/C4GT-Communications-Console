import mongoose from 'mongoose';

const emailHistorySchema = new mongoose.Schema({
  username: String,
  email: String,
  status: String,
  time: String,
  date: String,
});

const EmailHistory = mongoose.model('EmailHistory', emailHistorySchema, 'emailHistory');

export default EmailHistory;