import express from 'express';
import { getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty, getUserProperties } from '../controllers/PropertyController.js';
import AuthMiddleware, { validateDealer } from '../middlewares/AuthMiddleware.js';
import { uploadPropertyImages, handleMulterError } from '../middlewares/FileUploadMiddleware.js';

const router = express.Router();
router.get('/', getAllProperties);
router.get('/my-properties', AuthMiddleware, validateDealer, getUserProperties);
router.get('/:id', getPropertyById);
router.post('/', AuthMiddleware, validateDealer, uploadPropertyImages, handleMulterError, createProperty);
router.put('/:id', AuthMiddleware, validateDealer, uploadPropertyImages, handleMulterError, updateProperty);
router.delete('/:id', AuthMiddleware, validateDealer, deleteProperty);

export default router;