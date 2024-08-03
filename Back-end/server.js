import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from './DB/index.js';
import { errorHandler,notfound } from './middlewares/error.js';

//Email-Specific
import getEmailService from './email-backend/config/emailConfig.js';



// Import routes
import AuthRouter from './Routes/Auth.routes.js';
import TemplateRouter from './Routes/Template.routes.js';
import EmailRouter from './email-backend/routes/index.js';
import WhatsappRouter from './Routes/Whatsapp.routes.js';
import listEndpoints from 'express-list-endpoints';
// Initialize express
const app = express();


// Load environment variables
dotenv.config();

// Middlewares
app.get('/', (req, res) => {
    res.send("Welcome to Back-end of Notifier project")
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));
app.use(bodyParser.json());


//Email-Specific
app.use(bodyParser.urlencoded({ extended: true }));
// Get email service
const emailService = getEmailService();


// Routes
app.use('/api/auth', AuthRouter);
app.use('/api/templates', TemplateRouter);
app.use('/api/email', EmailRouter);
app.use('/api/whatsapp',WhatsappRouter);


// Error handling middlewares
app.use(notfound);
app.use(errorHandler);

console.log("All endpoints are :",listEndpoints(app));
// Connect to MongoDB
ConnectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT} and MongoDB is connected`);
    });
}).catch((error) => {
    console.log('Error connecting to MongoDB', error.message);
});



