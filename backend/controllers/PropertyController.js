import { Property } from '../config/db.js';

export const getAllProperties = async (req, res) => {
    const query = req.query; // Extract query parameters for filtering, sorting, etc.

    try {
        const properties = await Property.findAll({
            where: query,
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Properties fetched successfully',
            properties: properties,
            totalCount: properties.length
        });
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
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
        console.error('Error fetching property:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const createProperty = async (req, res) => {
    const { title, description, type, purpose, location, price } = req.body;
    if (!title || !type || !purpose || !location || !price) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }

    const propertyData = {
        title, description, type, purpose, location, price,
        dealer_id: req.user.id // Assuming authenticated user is the dealer
    };

    try {
        const newProperty = await Property.create(propertyData);
        res.status(201).json({
            success: true,
            message: 'Property created successfully',
            property: newProperty
        });
    } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
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
        console.error('Error updating property:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
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
        console.error('Error deleting property:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
