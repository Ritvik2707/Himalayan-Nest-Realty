"use client";
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SearchFilterBar = ({ onSearch, initialFilters = {} }) => {
    const router = useRouter();

    const [filters, setFilters] = useState({
        location: initialFilters.location || '',
        category: initialFilters.category || '',
        minPrice: initialFilters.minPrice || '',
        maxPrice: initialFilters.maxPrice || '',
        type: initialFilters.type || 'buy'
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSearch = async () => {
        setIsLoading(true);

        try {
            // Create URLSearchParams for navigation
            const params = new URLSearchParams();

            // Only add non-empty filter values to URL
            Object.entries(filters).forEach(([key, value]) => {
                if (value && value.toString().trim()) {
                    params.set(key, value);
                }
            });

            // If we have an onSearch callback (like in properties page), call it
            if (onSearch) {
                await onSearch(filters);
            } else {
                // Otherwise navigate to properties page with search params
                const queryString = params.toString();
                router.push(`/properties${queryString ? `?${queryString}` : ''}`);
            }
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearFilters = () => {
        const clearedFilters = {
            location: '',
            category: '',
            minPrice: '',
            maxPrice: '',
            type: 'buy'
        };
        setFilters(clearedFilters);

        if (onSearch) {
            onSearch(clearedFilters);
        } else {
            router.push('/properties');
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border">
            {/* Buy/Rent Toggle */}
            <div className="flex gap-2 mb-4">
                <button
                    className={`px-4 py-2 rounded ${filters.type === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => handleFilterChange('type', 'buy')}
                >
                    Buy
                </button>
                <button
                    className={`px-4 py-2 rounded ${filters.type === 'rent' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => handleFilterChange('type', 'rent')}
                >
                    Rent
                </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <input
                    type="text"
                    placeholder="Enter location..."
                    className="border rounded px-3 py-2 focus:outline-none focus:border-green-500"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                />

                <select
                    className="border rounded px-3 py-2 focus:outline-none focus:border-green-500"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="flat">Flat</option>
                    <option value="plot">Plot</option>
                    <option value="pg">PG</option>
                    <option value="house">House</option>
                    <option value="commercial">Commercial</option>
                </select>

                <input
                    type="number"
                    placeholder="Min Price (₹)"
                    className="border rounded px-3 py-2 focus:outline-none focus:border-green-500"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Max Price (₹)"
                    className="border rounded px-3 py-2 focus:outline-none focus:border-green-500"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />

                <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className={`px-6 py-2 rounded transition-colors ${isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                        } text-white`}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>

                <button
                    onClick={handleClearFilters}
                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                    Clear
                </button>
            </div>
        </div>
    )
}

export default SearchFilterBar
