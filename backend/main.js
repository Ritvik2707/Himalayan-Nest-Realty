// Himalayan Nest Real Estate - Backend Server
// Main entry point for the Express.js application

import express from 'express';
import { connectToDB } from './config/db.js';
import { registerRelations } from './models/index.js';
import AuthRouter from './routes/AuthRoutes.js';
import PropertyRouter from './routes/PropertyRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES6 module compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ quiet: true });

const app = express();

// Configure CORS for frontend communication
app.use(cors({
    origin: [process.env.FRONTEND_URL].filter(Boolean), // Allow only frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With', 'Access-Control-Allow-Origin'],
    credentials: true // Enable cookies and authentication headers
}));

// Middleware setup
app.use(cookieParser()); // Parse cookies for authentication
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static uploaded files (property images, etc.)
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize database and model relationships
registerRelations(); // Set up Sequelize model associations
connectToDB(); // Connect to PostgreSQL database

// Route handlers
app.use('/api/auth', AuthRouter); // Authentication routes (login, register, etc.)
app.use('/api/properties', PropertyRouter); // Property CRUD operations

// Start server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, HOST, () => {
    console.log(`App is listening at host ${HOST}, port ${PORT}`);
});