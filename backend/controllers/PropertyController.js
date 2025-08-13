import { Op } from 'sequelize';
import { Property } from '../config/db.js';
import { deleteCloudinaryImages } from '../middlewares/FileUploadMiddleware.js';

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
    // console.log('filter parameters:', query, filters);

    try {
        let properties = await Property.findAll({
            where: filters,
            attributes: {
                exclude: ['dealer_id']
            },
            order: [['createdAt', 'DESC']]
        });

        properties = properties.map(p => ({
            ...p.toJSON(),
            image: p.images?.[0] || null,
            images: null
        }));

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
                const cloudinaryUrls = req.files.map(file => file.path); // Cloudinary returns full URL in file.path
                await deleteCloudinaryImages(cloudinaryUrls);
            }
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: title, category, purpose, location, and price are required'
            });
        }

        // Process uploaded images from Cloudinary
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => {
                // Cloudinary returns the full URL in file.path
                return file.path;
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
            const cloudinaryUrls = req.files.map(file => file.path);
            await deleteCloudinaryImages(cloudinaryUrls);
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

        // Delete images from Cloudinary before deleting property
        if (property.images && property.images.length > 0) {
            try {
                await deleteCloudinaryImages(property.images);
                console.log('Images deleted from Cloudinary successfully');
            } catch (cloudinaryError) {
                console.error('Error deleting images from Cloudinary:', cloudinaryError);
                // Continue with property deletion even if image deletion fails
            }
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
