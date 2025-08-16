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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ quiet: true });

const app = express();
app.use(cors({
    origin: [process.env.FRONTEND_URL].filter(Boolean),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With', 'Access-Control-Allow-Origin'],
    credentials: true // Allow credentials
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

registerRelations(); // Register model relations
connectToDB();

app.use('/api/auth', AuthRouter);
app.use('/api/properties', PropertyRouter);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, HOST, () => {
    console.log(`App is listening at host ${HOST}, port ${PORT}`);
});