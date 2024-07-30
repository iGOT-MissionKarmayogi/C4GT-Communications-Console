import User from '../models/userModel.js';

// Controller to fetch all users
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
  
  // Controller to upload user data
  export const uploadUserData = async (req, res) => {
    try {
      const users = req.body;  // Assuming req.body is an array of users
  
      const savedUsers = await User.insertMany(users);
      res.status(201).json(savedUsers);
    } catch (error) {
      console.error('Error uploading users:', error);
      res.status(500).json({ message: 'Failed to upload users' });
    }
  };

