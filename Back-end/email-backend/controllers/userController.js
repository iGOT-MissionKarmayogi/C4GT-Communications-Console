import User from '../models/userModel.js';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });

// Controller to fetch all users
/**
 * Get all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the fetched users or an error message.
*/

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};



// Controller to create a new user
/**
 * Create a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is created.
*/

export const createUser = async (req, res) => {
  const { name, email, otherField } = req.body;

  const newUser = new User({
    name,
    email,
    otherField
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};


export const uploadUserData = async (req, res) => {
  try {
    let users = [];

    if (req.file) {
      // Handle file upload
      const filePath = req.file.path;
      const fileExtension = req.file.mimetype;

      if (fileExtension === 'application/json') {
        // Parse JSON file
        const fileData = fs.readFileSync(filePath, 'utf8');
        users = JSON.parse(fileData);
      } else if (fileExtension === 'text/csv') {
        // Parse CSV file
        users = await parseCSV(filePath);
      } else {
        return res.status(400).json({ message: 'Unsupported file format' });
      }

      fs.unlinkSync(filePath);
    } else {
      users = req.body; 
    }

    const savedUsers = await User.insertMany(users);
    res.status(201).json(savedUsers);
  } catch (error) {
    console.error('Error uploading users:', error);
    res.status(500).json({ message: 'Failed to upload users' });
  }
};

/**
 * Parse CSV file to extract user data.
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<Array>} - A Promise that resolves to an array of user objects.
 */
const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const users = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => users.push(data))
      .on('end', () => resolve(users))
      .on('error', (error) => reject(error));
  });
};

