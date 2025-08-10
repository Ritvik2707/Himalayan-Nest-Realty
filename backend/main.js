import express from 'express';
import { connectToDB } from './config/db.js';
import AuthRouter from './routes/AuthRoutes.js';
import PropertyRouter from './routes/PropertyRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

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

connectToDB();

app.use('/api/auth', AuthRouter);
app.use('/api/properties', PropertyRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
});