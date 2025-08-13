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
        return { success: false, error: error.message };
    }
};

// Helper function to handle Cloudinary URLs
export const fetchImageUrl = (imageUrl) => {
    if (!imageUrl) return '/images/placeholder.jpg';

    // If it's already a full URL (Cloudinary), return as is
    if (imageUrl.startsWith('http')) return imageUrl;

    // If it's a relative path, construct full URL (for backward compatibility)
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    return `${backendUrl}${imageUrl}`;
};

// Helper function to get optimized Cloudinary URL
export const getOptimizedImageUrl = (imageUrl, options = {}) => {
    if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
        return fetchImageUrl(imageUrl);
    }

    const { width = 800, height = 600, quality = 'auto', crop = 'fill' } = options;

    // For Cloudinary URLs, we can add transformation parameters
    // Example: https://res.cloudinary.com/demo/image/upload/w_800,h_600,c_fill,q_auto/sample.jpg
    const transformations = `w_${width},h_${height},c_${crop},q_${quality}`;

    // Insert transformation into Cloudinary URL
    return imageUrl.replace('/upload/', `/upload/${transformations}/`);
};