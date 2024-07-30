import EmailHistory from '../models/emailHistory.js';

// Fetch all history from the database
export const getHistory = async () => {
  try {
    const history = await EmailHistory.find();
    return history;
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
};