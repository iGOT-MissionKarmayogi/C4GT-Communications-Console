import express from 'express'; 
import emailRoutes from './emailRoutes.js'; 
import templateRoutes from './templateRoutes.js'; 
import emailHistoryRouter from './emailHistoryRouter.js';
import path from 'path'; 
import { fileURLToPath } from 'url'; 
import { getUsers, createUser, uploadUserData } from '../controllers/userController.js'; 
import userRoutes from './userRoutes.js'; 
import multer from 'multer';
import { verify, roleAuthorization } from '../../middlewares/authenticated.js';

// Get the filename and directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new router instance
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Route to serve the index.html file
router.get('/', verify, roleAuthorization(['Admin']),  (req, res) => {
  res.sendFile(path.join(__dirname, "..", 'views', 'index.html'));
});

// Use email routes for /send-email path
router.use('/send-email', verify, roleAuthorization(['Admin']), emailRoutes);
// Use template routes for /templates path
router.use('/templates', verify, roleAuthorization(['Admin']),  templateRoutes);

// Use user routes for /users path
router.use('/users', verify, roleAuthorization(['Admin']),  userRoutes);

// Route to fetch all users
router.get('/users', verify, roleAuthorization(['Admin']),  getUsers);
// Route to create a new user
router.post('/users', verify, roleAuthorization(['Admin']),  createUser);

// Route to upload user data
router.post('/upload-user-data', verify, roleAuthorization(['Admin']),  upload.single('file'), uploadUserData);

// Route to fetch email history
router.get('/history', verify, roleAuthorization(['Admin']),  emailHistoryRouter);

// Export the router as the default export
export default router;






