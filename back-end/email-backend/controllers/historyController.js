import EmailHistory from '../models/emailHistory.js';
/**
 * Fetch all email history from the database.
 * @returns {Array} - An array of email history records.
*/

export const getHistory = async () => {
  try {
    const history = await EmailHistory.find();
    return history;
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
};