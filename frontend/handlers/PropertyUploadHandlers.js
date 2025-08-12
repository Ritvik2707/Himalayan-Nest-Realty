// Example usage in frontend for file upload during property creation

import api from './axiosInstances';

export const createPropertyWithImages = async (propertyData, imageFiles) => {
    try {
        // Create FormData object for multipart/form-data
        const formData = new FormData();

        // Append property data
        formData.append('title', propertyData.title);
        formData.append('description', propertyData.description || '');
        formData.append('category', propertyData.category);
        formData.append('purpose', propertyData.purpose);
        formData.append('location', propertyData.location);
        formData.append('price', propertyData.price);

        // Append image files
        if (imageFiles && imageFiles.length > 0) {
            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('images', imageFiles[i]);
            }
        }

        const response = await api.post('/properties', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating property with images:', error);
        // throw error;
    }
};

export const fetchImageUrl = (imageUrl) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    return `${API_BASE_URL}${imageUrl}`;
}