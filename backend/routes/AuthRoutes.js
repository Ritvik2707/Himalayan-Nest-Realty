import express from 'express';
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../controllers/AuthController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', AuthMiddleware, logoutUser);
router.get('/profile', AuthMiddleware, getCurrentUser);

export default router;