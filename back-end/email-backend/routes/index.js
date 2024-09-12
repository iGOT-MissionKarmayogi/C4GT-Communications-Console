import express from 'express'; 
import emailRoutes from './emailRoutes.js'; 
import templateRoutes from './templateRoutes.js'; 
import emailHistoryRouter from './emailHistoryRouter.js';
import path from 'path'; 
import { fileURLToPath } from 'url'; 
import { getUsers, createUser, uploadUserData } from '../controllers/userController.js'; 
import userRoutes from './userRoutes.js'; 
import multer from 'multer';

// Get the filename and directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new router instance
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Route to serve the index.html file
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "..", 'views', 'index.html'));
});

// Use email routes for /send-email path
router.use('/send-email',emailRoutes);
// Use template routes for /templates path
router.use('/templates', templateRoutes);

// Use user routes for /users path
router.use('/users', userRoutes);

// Route to fetch all users
router.get('/users', getUsers);
// Route to create a new user
router.post('/users', createUser);

// Route to upload user data
router.post('/upload-user-data', upload.single('file'), uploadUserData);

// Route to fetch email history
router.get('/history', emailHistoryRouter);

// Export the router as the default export
export default router;






