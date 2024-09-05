import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import ConnectDB from './DB/index.js';
import { errorHandler,notfound } from './middlewares/error.js';
import AuthRouter from './Routes/Auth.routes.js';
import userRouter from './Routes/User.routes.js';
import TemplateRouter from './Routes/Template.routes.js';
// "start": "concurrently \"nodemon server.js\" \"nodemon Email/backend/server.js\""

// Import routes

// Initialize express
const app = express();

// Load environment variables
dotenv.config();

// Middlewares
app.get('/', (req, res) => {
    res.send("Welcome to Notifier project")
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));
app.use(bodyParser.json());


// Routes
app.use('/api/auth', AuthRouter);
app.use('/api/user', userRouter);
app.use('/api/templates', TemplateRouter);


// Error handling middlewares
app.use(notfound);
app.use(errorHandler);


// Connect to MongoDB
ConnectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log('Error connecting to MongoDB', error.message);
});