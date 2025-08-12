"use client"
import React, { useState } from 'react'
import { createPropertyWithImages } from "../../handlers/PropertyUploadHandlers";

const page = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        purpose: '',
        location: '',
        price: ''
    });
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 10) {
            alert('Maximum 10 files allowed');
            return;
        }
        setSelectedFiles(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createPropertyWithImages(formData, selectedFiles);
            console.log('Property created:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
            />
            <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
            >
                <option value="">Select Category</option>
                <option value="flat">Flat</option>
                <option value="house">House</option>
                <option value="plot">Plot</option>
                <option value="pg">PG</option>
                <option value="farmhouse">Farmhouse</option>
                <option value="villa">Villa</option>
                <option value="office">Office</option>
                <option value="shop">Shop</option>
                <option value="other">Other</option>
            </select>
            <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                required
            >
                <option value="">Select Purpose</option>
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
            </select>
            <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
            />
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                max="10"
            />
            <button type="submit">Create Property</button>
        </form>
    );
}

export default page
