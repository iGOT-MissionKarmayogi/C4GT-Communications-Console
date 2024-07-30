import express from 'express';
import emailRoutes from './emailRoutes.js';
import templateRoutes from './templateRoutes.js';
import emailHistoryRouter from './emailHistoryRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { getUsers, createUser, uploadUserData  } from '../controllers/userController.js';
import userRoutes from './userRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"..", 'views', 'index.html'));
});

router.use('/send-email', emailRoutes);
router.use('/templates', templateRoutes);

router.use('/users', userRoutes);

// Route to fetch all users
router.get('/users', getUsers);
// Route to create a new user
router.post('/users', createUser);


// Route to upload user data
router.post('/upload-users', uploadUserData);


// Route to fetch History
router.get('/history', emailHistoryRouter);


export default router;









