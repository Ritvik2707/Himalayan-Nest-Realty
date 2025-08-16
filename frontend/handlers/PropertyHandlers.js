// Property API handlers for Himalayan Nest Real Estate
import api from "./axiosInstances";

/**
 * Get All Properties with Filters
 * @param {Object} filters - Search and filter parameters
 * @returns {Promise<Object>} Properties response
 */
export const getProperties = async (filters = {}) => {
    try {
        const params = {};

        // Add filters to query parameters
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== '') {
                params[key] = value;
            }
        });

        console.log('Fetching properties with params:', params);

        const response = await api.get('/properties', { params });
        const data = response.data;

        return {
            success: true,
            data: data,
            message: data.message || 'Properties fetched successfully'
        };
    } catch (error) {
        console.error('Get properties error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch properties';
        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * Get Featured Properties
 * @param {number} limit - Number of properties to fetch
 * @returns {Promise<Object>} Featured properties response
 */
export const getFeaturedProperties = async (limit = 6) => {
    try {
        const response = await api.get('/properties/featured', {
            params: { limit }
        });
        return response.data;
    } catch (error) {
        console.error('Get featured properties error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch featured properties';
        return {
            success: false,
            error: errorMessage,
            message: 'Failed to fetch featured properties'
        };
    }
};

/**
 * Get Single Property by ID
 * @param {string} propertyId - Property ID
 * @returns {Promise<Object>} Property details response
 */
export const getPropertyById = async (propertyId) => {
    try {
        const response = await api.get(`/properties/${propertyId}`);
        const data = response.data;

        return {
            success: true,
            data: data,
            message: data.message || 'Property fetched successfully'
        };
    } catch (error) {
        // console.error('Get property by ID error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch property';
        return {
            success: false,
            error: errorMessage,
            message: 'Failed to fetch property'
        };
    }
};

/**
 * Create New Property Listing
 * @param {Object} propertyData - Property data
 * @returns {Promise<Object>} Create property response
 */
export const createProperty = async (propertyData) => {
    try {
        const response = await api.post('/properties', propertyData);
        const data = response.data;

        return {
            success: true,
            data: data,
            message: data.message || 'Property created successfully'
        };
    } catch (error) {
        console.error('Create property error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to create property';

        if (error.response?.status === 401) {
            return {
                success: false,
                error: 'Authentication required. Please login.',
                message: 'Failed to create property'
            };
        }

        return {
            success: false,
            error: errorMessage,
            message: 'Failed to create property'
        };
    }
};

/**
 * Update Property Listing
 * @param {string} propertyId - Property ID
 * @param {Object} propertyData - Updated property data
 * @returns {Promise<Object>} Update property response
 */
export const updateProperty = async (propertyId, propertyData) => {
    try {
        const response = await api.put(`/properties/${propertyId}`, propertyData);
        const data = response.data;

        return {
            success: true,
            data: data,
            message: data.message || 'Property updated successfully'
        };
    } catch (error) {
        console.error('Update property error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to update property';

        if (error.response?.status === 401) {
            return {
                success: false,
                error: 'Authentication required. Please login.',
                message: 'Failed to update property'
            };
        }

        if (error.response?.status === 403) {
            return {
                success: false,
                error: 'You are not authorized to update this property.',
                message: 'Failed to update property'
            };
        }

        return {
            success: false,
            error: errorMessage,
            message: 'Failed to update property'
        };
    }
};

/**
 * Delete Property Listing
 * @param {string} propertyId - Property ID
 * @returns {Promise<Object>} Delete property response
 */
export const deleteProperty = async (propertyId) => {
    try {
        const response = await api.delete(`/properties/${propertyId}`);
        const data = response.data;

        return {
            success: true,
            data: data,
            message: data.message || 'Property deleted successfully'
        };
    } catch (error) {
        console.error('Delete property error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete property';

        if (error.response?.status === 401) {
            return {
                success: false,
                error: 'Authentication required. Please login.',
                message: 'Failed to delete property'
            };
        }

        if (error.response?.status === 403) {
            return {
                success: false,
                error: 'You are not authorized to delete this property.',
                message: 'Failed to delete property'
            };
        }

        return {
            success: false,
            error: errorMessage,
            message: 'Failed to delete property'
        };
    }
};

/**
 * Get User's Properties
 * @returns {Promise<Object>} User properties response
 */
export const getUserProperties = async () => {
    try {
        const response = await api.get('/properties/my-properties');
        const data = response.data;

        return {
            success: true,
            data: data,
            message: 'Your properties fetched successfully'
        };
    } catch (error) {
        console.error('Get user properties error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch your properties';

        if (error.response?.status === 401) {
            return {
                success: false,
                error: 'Authentication required. Please login.',
                message: 'Failed to fetch your properties'
            };
        }

        return {
            success: false,
            error: errorMessage,
            message: 'Failed to fetch your properties'
        };
    }
};

/**
 * Upload Property Images
 * @param {string} propertyId - Property ID
 * @param {FormData} formData - Image files form data
 * @returns {Promise<Object>} Upload response
 */
export const uploadPropertyImages = async (propertyId, formData) => {
    try {
        const response = await api.post(`/properties/${propertyId}/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const data = response.data;

        return {
            success: true,
            data: data,
            message: 'Images uploaded successfully!'
        };
    } catch (error) {
        console.error('Upload property images error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to upload images';

        if (error.response?.status === 401) {
            return {
                success: false,
                error: 'Authentication required. Please login.',
                message: 'Failed to upload images'
            };
        }

        return {
            success: false,
            error: errorMessage,
            message: 'Failed to upload images'
        };
    }
};