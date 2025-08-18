// Example usage in frontend for file upload during property creation

import api from './axiosInstances';

// Helper function to handle Cloudinary URLs
export const fetchImageUrl = (imageUrl) => {
    if (!imageUrl) return '';

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