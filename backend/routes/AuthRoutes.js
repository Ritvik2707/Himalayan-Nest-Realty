import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/AuthController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', AuthMiddleware, logoutUser);

export default router;