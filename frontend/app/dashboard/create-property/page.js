"use client";
import React, { useState } from 'react';
import { createProperty } from '../../../handlers/PropertyHandlers';
import { CloudUpload, X } from 'lucide-react';

const CreateProperty = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        purpose: '',
        location: '',
        price: ''
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    const categories = [
        { value: 'flat', label: 'Flat/Apartment' },
        { value: 'house', label: 'House' },
        { value: 'plot', label: 'Plot/Land' },
        { value: 'pg', label: 'PG/Hostel' },
        { value: 'farmhouse', label: 'Farmhouse' },
        { value: 'villa', label: 'Villa' },
        { value: 'office', label: 'Office Space' },
        { value: 'shop', label: 'Shop/Retail' },
        { value: 'other', label: 'Other' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 10) {
            setMessage({
                type: 'error',
                content: 'Maximum 10 images allowed'
            });
            return;
        }

        setSelectedFiles(files);

        // Create preview URLs
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const removeImage = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        const newPreviews = previewImages.filter((_, i) => i !== index);

        // Clean up object URL
        URL.revokeObjectURL(previewImages[index]);

        setSelectedFiles(newFiles);
        setPreviewImages(newPreviews);
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            description: '',
            category: '',
            purpose: '',
            location: '',
            price: ''
        });

        setSelectedFiles([]);
        setPreviewImages([]);
        setMessage({ type: '', content: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', content: '' });

        try {
            const result = await createProperty(formData, selectedFiles);

            if (result && result.success) {
                setMessage({
                    type: 'success',
                    content: 'Property created successfully!'
                });

                // Reset form
                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    purpose: '',
                    location: '',
                    price: ''
                });
                setSelectedFiles([]);
                setPreviewImages([]);

                // Reset file input
                const fileInput = document.getElementById('images');
                if (fileInput) fileInput.value = '';

            } else {
                setMessage({
                    type: 'error',
                    content: result?.error || result?.message || 'Failed to create property'
                });
            }
        } catch (error) {
            console.error('Error creating property:', error);
            setMessage({
                type: 'error',
                content: 'An unexpected error occurred'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Add New Property</h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                    {message.content && (
                        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            {message.content}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="lg:col-span-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Property Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="e.g., 2 BHK Apartment in Prime Location"
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                                    Purpose *
                                </label>
                                <select
                                    id="purpose"
                                    name="purpose"
                                    value={formData.purpose}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="">Select Purpose</option>
                                    <option value="rent">For Rent</option>
                                    <option value="sale">For Sale</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="e.g., Dehradun, Uttarakhand"
                                />
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                    Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="e.g., 25000"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="5"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Describe your property in detail..."
                            ></textarea>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                                Property Images (Max 10 images)
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                                <input
                                    type="file"
                                    id="images"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="images"
                                    className="cursor-pointer flex flex-col items-center"
                                >
                                    <CloudUpload className="w-12 h-12 text-gray-400 mb-4" />
                                    <span className="text-gray-600">Click to upload images or drag and drop</span>
                                    <span className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB each</span>
                                </label>
                            </div>

                            {/* Image Previews */}
                            {previewImages.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {previewImages.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700'
                                    }`}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Property'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProperty;
