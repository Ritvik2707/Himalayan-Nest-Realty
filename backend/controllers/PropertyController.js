import { Op } from 'sequelize';
import { Property } from '../config/db.js';
import path from 'path';
import { deleteUploadedFiles } from '../middlewares/FileUploadMiddleware.js';

const createFilterQuery = (query) => {
    const filters = {};
    if (query.location) filters.location = query.location;
    if (query.category) filters.category = query.category;
    if (query.purpose) filters.purpose = query.purpose === 'buy' ? 'sale' : 'rent';

    if (query.minPrice || query.maxPrice || query.budget) {
        filters.price = {};
        if (query.budget) {
            filters.price['$gte'] = Number(query.budget / 10);
            filters.price['$lte'] = Number(query.budget);
        }
        if (query.minPrice) filters.price['$gte'] = Number(query.minPrice);
        if (query.maxPrice) filters.price['$lte'] = Number(query.maxPrice);
    }

    if (query.keywords) {
        const list = query.keywords.replace(/\s{2,}/g, " ").split(' ');
        // Build an array of keyword conditions for title and description
        filters[Op.or] = list.map(keyword => ({
            [Op.or]: [
                { title: { [Op.like]: `%${keyword}%` } },
                { description: { [Op.like]: `%${keyword}%` } }
            ]
        }));
    }

    return filters;
}

export const getAllProperties = async (req, res) => {
    const query = req.query; // Extract query parameters for filtering, sorting, etc.

    // Create filter query based on request parameters
    const filters = createFilterQuery(query);
    console.log('filter parameters:', query, filters);

    try {
        const properties = await Property.findAll({
            where: filters,
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Properties fetched successfully',
            properties: properties,
            totalCount: properties.length
        });
    } catch (error) {
        console.error('Error fetching properties:', error.message);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
}

export const getPropertyById = async (req, res) => {
    const { id } = req.params;
    try {
        const property = await Property.findByPk(id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Property fetched successfully',
            property: property
        });
    } catch (error) {
        console.error('Error fetching property:', error.message);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
}

export const createProperty = async (req, res) => {
    try {
        const { title, description, category, purpose, location, price } = req.body;

        // Validate required fields
        if (!title || !category || !purpose || !location || !price) {
            // Clean up uploaded files if validation fails
            if (req.files && req.files.length > 0) {
                const filePaths = req.files.map(file => file.path);
                deleteUploadedFiles(filePaths);
            }
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: title, category, purpose, location, and price are required'
            });
        }

        // Process uploaded images
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => {
                // Return relative path for storing in database
                return `/uploads/properties/${file.filename}`;
            });
        }

        const propertyData = {
            title,
            description: description || '',
            category,
            purpose,
            location,
            price: parseFloat(price),
            images: imageUrls,
            dealer_id: req.user.id // Assuming authenticated user is the dealer
        };

        const newProperty = await Property.create(propertyData);

        res.status(201).json({
            success: true,
            message: 'Property created successfully',
            data: {
                property: newProperty
            }
        });
    } catch (error) {
        console.error('Error creating property:', error.message);

        // Clean up uploaded files if database operation fails
        if (req.files && req.files.length > 0) {
            const filePaths = req.files.map(file => file.path);
            deleteUploadedFiles(filePaths);
        }

        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
}

export const updateProperty = async (req, res) => {
    const { id } = req.params;
    const { purpose, price, isActive } = req.body;
    try {
        const property = await Property.findByPk(id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        property.purpose = purpose || property.purpose;
        property.price = price || property.price;
        property.isActive = isActive !== undefined ? isActive : property.isActive;

        await property.save();
        res.status(200).json({
            success: true,
            message: 'Property updated successfully',
            property: property
        });
    } catch (error) {
        console.error('Error updating property:', error.message);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
}

export const deleteProperty = async (req, res) => {
    const { id } = req.params;
    try {
        const property = await Property.findByPk(id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        await property.destroy();
        res.status(200).json({
            success: true,
            message: 'Property deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting property:', error.message);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
}
