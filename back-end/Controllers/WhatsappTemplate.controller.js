// Logic to retrive WhatsApp users

// Import the User model from the correct path
import WhatsAppUser from '../Models/Whatsapp.model.js'; 


// Controller to fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await WhatsAppUser.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Controller to upload user data
export const uploadUserData = async (req, res) => {
  try {
    const users = req.body;  // Assuming req.body is an array of users

    // Log the incoming data for debugging
    console.log('Incoming user data:', users);

    // Validate the incoming user data
    users.forEach(user => {
      if (!user.name || user.whatsappNumber === undefined) {
        throw new Error('Validation failed: Name and whatsappNumber are required');
      }
    });

    // Insert users into the database
    const savedUsers = await WhatsAppUser.insertMany(users);
    res.status(201).json(savedUsers);
  } catch (error) {
    console.error('Error uploading users:', error);
    res.status(500).json({ message: 'Failed to upload users', error: error.message });
  }
};