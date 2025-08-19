// Search Filter Bar Component - Advanced property search and filtering
// Provides search functionality with location, category, price, and keyword filters

"use client";
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../context/AppContext';

const SearchFilterBar = ({ onSearch, searchParams }) => {
    const router = useRouter();

    // Filter state management
    const [filters, setFilters] = useState({
        location: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        keywords: '',
        purpose: 'buy' // Default search for buying properties
    });
    const { loading, setLoading } = useAppContext();

    // Initialize filters from URL parameters or set defaults
    useEffect(() => {
        const initialFilters = {
            location: searchParams.get('location') || '',
            category: searchParams.get('category') || '',
            minPrice: searchParams.get('budget') || '',
            maxPrice: searchParams.get('budget') || '',
            keywords: searchParams.get('keywords') || '',
            purpose: searchParams.get('purpose') || 'buy' // Default to 'buy'
        };
        setFilters(initialFilters);
    }, [searchParams]);

    // Update individual filter values
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Execute search with current filters
    const handleSearch = async () => {
        setLoading(true);

        try {
            // Build URL parameters for navigation
            const params = new URLSearchParams();

            // Only include non-empty filter values in URL
            Object.entries(filters).forEach(([key, value]) => {
                if (value && value.toString().trim()) {
                    params.set(key, value);
                }
            });

            // Call parent component's search handler if provided
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
            setLoading(false);
        }
    };

    const handleClearFilters = () => {
        const clearedFilters = {
            location: '',
            category: '',
            minPrice: '',
            maxPrice: '',
            keywords: '',
            purpose: 'buy'
        };
        console.log('Clearing filters:', searchParams);

        if (searchParams.size > 0) router.replace('/properties');
        setFilters(clearedFilters);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border">
            {/* Buy/Rent Toggle */}
            <div className="flex gap-2 mb-4">
                <button
                    className={`px-4 py-2 rounded ${filters.purpose === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => handleFilterChange('purpose', 'buy')}
                >
                    Buy
                </button>
                <button
                    className={`px-4 py-2 rounded ${filters.purpose === 'rent' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => handleFilterChange('purpose', 'rent')}
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

                <input
                    type="text"
                    placeholder="Enter keywords..."
                    className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 w-full col-span-1 md:col-span-2 lg:col-span-2"
                    value={filters.keywords || ''}
                    onChange={(e) => handleFilterChange('keywords', e.target.value)}
                />

                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className={`px-6 py-2 rounded transition-colors ${loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                        } text-white`}
                >
                    {loading ? 'Searching...' : 'Search'}
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
