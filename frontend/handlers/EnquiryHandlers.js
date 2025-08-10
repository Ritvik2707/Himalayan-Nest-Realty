// Enquiry API handlers for Himalayan Nest Real Estate
import api from "./axiosInstances";

/**
 * Submit Property Enquiry
 * @param {Object} enquiryData - Enquiry form data
 * @returns {Promise<Object>} Enquiry response
 */
export const submitEnquiry = async (enquiryData) => {
    try {
        const response = await api.post('/enquiries', enquiryData);
        const data = response.data;

        return {
            success: true,
            data: data,
            message: data.message || 'Enquiry submitted successfully!'
        };
    } catch (error) {
        console.error('Submit enquiry error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to submit enquiry';
        return {
            success: false,
            error: errorMessage,
            message: 'Failed to submit enquiry'
        };
    }
};

/**
 * Get All Enquiries (Admin/Owner)
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Object>} Enquiries response
 */
export const getEnquiries = async (filters = {}) => {
    try {
        const params = {};

        // Add filters to query parameters
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== '') {
                params[key] = value;
            }
        });

        const response = await api.get('/enquiries', { params });
        const data = response.data;

        return {
            success: true,
            data: data,
            message: data.message || 'Enquiries fetched successfully'
        };
    } catch (error) {
        console.error('Get enquiries error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch enquiries';
        return {
            success: false,
            error: errorMessage,
            message: 'Failed to fetch enquiries'
        };
    }
};

/**
 * Get Single Enquiry by ID
 * @param {string} enquiryId - Enquiry ID
 * @returns {Promise<Object>} Enquiry details response
 */
export const getEnquiryById = async (enquiryId) => {
    try {
        const response = await api.get(`/enquiries/${enquiryId}`);
        return response.data;
    } catch (error) {
        console.error('Get enquiry by ID error:', error);
        return null;
    }
};

/**
 * Update Enquiry Status
 * @param {string} enquiryId - Enquiry ID
 * @param {string} status - New status
 * @param {string} notes - Optional notes
 * @returns {Promise<Object>} Update response
 */
export const updateEnquiryStatus = async (enquiryId, status, notes = '') => {
    try {
        const response = await api.put(`/enquiries/${enquiryId}/status`, { status, notes });
        const data = response.data;

        return {
            success: true,
            data: data,
            message: 'Enquiry status updated successfully!'
        };
    } catch (error) {
        console.error('Update enquiry status error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to update enquiry status';

        if (error.response?.status === 401) {
            return {
                success: false,
                error: 'Authentication required. Please login.',
                message: 'Failed to update enquiry status'
            };
        }

        if (error.response?.status === 403) {
            return {
                success: false,
                error: 'You are not authorized to update this enquiry.',
                message: 'Failed to update enquiry status'
            };
        }

        return {
            success: false,
            error: errorMessage,
            message: 'Failed to update enquiry status'
        };
    }
};

/**
 * Delete Enquiry
 * @param {string} enquiryId - Enquiry ID
 * @returns {Promise<Object>} Delete response
 */
export const deleteEnquiry = async (enquiryId) => {
    try {
        await api.delete(`/enquiries/${enquiryId}`);

        return {
            success: true,
            message: 'Enquiry deleted successfully!'
        };
    } catch (error) {
        console.error('Delete enquiry error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete enquiry';

        if (error.response?.status === 401) {
            return {
                success: false,
                error: 'Authentication required. Please login.',
                message: 'Failed to delete enquiry'
            };
        }

        if (error.response?.status === 403) {
            return {
                success: false,
                error: 'You are not authorized to delete this enquiry.',
                message: 'Failed to delete enquiry'
            };
        }

        return {
            success: false,
            error: errorMessage,
            message: 'Failed to delete enquiry'
        };
    }
};

/**
 * Get Enquiries for Property
 * @param {string} propertyId - Property ID
 * @returns {Promise<Object>} Property enquiries response
 */
export const getPropertyEnquiries = async (propertyId) => {
    try {
        const response = await api.get(`/enquiries/property/${propertyId}`);
        const data = response.data;

        return {
            success: true,
            data: data,
            message: 'Property enquiries fetched successfully'
        };
    } catch (error) {
        console.error('Get property enquiries error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch property enquiries';

        if (error.response?.status === 401) {
            return {
                success: false,
                error: 'Authentication required. Please login.',
                message: 'Failed to fetch property enquiries'
            };
        }

        return {
            success: false,
            error: errorMessage,
            message: 'Failed to fetch property enquiries'
        };
    }
};

/**
 * Submit Contact Form
 * @param {Object} contactData - Contact form data
 * @returns {Promise<Object>} Contact response
 */
export const submitContactForm = async (contactData) => {
    try {
        const response = await api.post('/contact', contactData);
        const data = response.data;

        return {
            success: true,
            data: data,
            message: data.message || 'Thank you for contacting us! We will get back to you soon.'
        };
    } catch (error) {
        console.error('Submit contact form error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to submit contact form';
        return {
            success: false,
            error: errorMessage,
            message: 'Failed to submit contact form'
        };
    }
};