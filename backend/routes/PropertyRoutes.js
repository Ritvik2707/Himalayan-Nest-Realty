import express from 'express';
import { getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty } from '../controllers/PropertyController.js';
import AuthMiddleware, { validateDealer } from '../middlewares/AuthMiddleware.js';

const router = express.Router();
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/', AuthMiddleware, validateDealer, createProperty);
router.put('/:id', AuthMiddleware, validateDealer, updateProperty);
router.delete('/:id', AuthMiddleware, validateDealer, deleteProperty);

export default router;