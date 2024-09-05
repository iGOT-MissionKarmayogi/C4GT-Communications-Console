import mongoose from 'mongoose';

/**
 * Represents the schema for email history.
 *
 * @typedef {Object} EmailHistorySchema
 * @property {string} username - The username associated with the email.
 * @property {string} email - The email address.
 * @property {string} status - The status of the email.
 * @property {string} time - The time when the email was sent.
 * @property {string} date - The date when the email was sent.
 */

const emailHistorySchema = new mongoose.Schema({
  username: String,
  email: String,
  status: String,
  time: String,
  date: String,
});

const EmailHistory = mongoose.model('EmailHistory', emailHistorySchema, 'emailHistory');

export default EmailHistory;