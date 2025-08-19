// Properties Page - Browse and search all available properties
// Displays property listings with filtering, search, and pagination functionality

"use client";
import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import SearchFilterBar from '../components/SearchFilterBar'
import { useAppContext } from '../context/AppContext'
import { getProperties, searchProperties } from '../../handlers/PropertyHandlers'
import { fetchImageUrl } from '../../handlers/ImageHandlers';
import PropertyCard from '../components/PropertyCard';

// Loading Component - Displays while properties are being fetched
const PropertiesLoading = () => (
    <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Properties</h1>
                <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-2 text-gray-600">Loading properties...</p>
            </div>
        </div>
    </div>
);

// Main Properties Content Component - Handles property display and filtering
const PropertiesContent = () => {
    const [properties, setProperties] = useState([]); // Property listings data
    const [error, setError] = useState(''); // Error message state
    const [currentPage, setCurrentPage] = useState(1); // Pagination current page
    const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
    const searchParams = useSearchParams(); // URL search parameters
    const { loading, setLoading } = useAppContext(); // Global loading state
    const [filters, setFilters] = useState(Object.fromEntries(searchParams.entries())); // Search filters from URL

    // Load properties with optional search filters
    const loadProperties = async (searchFilters) => {
        setLoading(true);
        setError('');

        // Fetch properties from API with current or provided filters
        let result = await getProperties(searchFilters || filters);

        if (result && result.success) {
            // Process successful API response
            let propertiesData = result.data?.properties || result.data || [];
            // Optional: Transform property image URLs
            // propertiesData = propertiesData.map(property => ({
            //     ...property,
            //     image: fetchImageUrl(property.image || '/uploads/default-property.jpg')
            // }));

            setProperties(propertiesData);
            setTotalPages(result.data?.totalPages || 1);
            setCurrentPage(result.data?.currentPage || 1);
        } else {
            // Handle API failure
            const errorMessage = result?.message || 'Failed to load properties';
            setError(errorMessage);
            // Fallback to static data if API fails
            setProperties(staticProperties);
        }

        setLoading(false);
    };

    // Load properties on component mount and when search params change
    useEffect(() => {
        loadProperties();
    }, [searchParams]);

    // Filter static properties when API search fails
    // const filterStaticProperties = (filters) => {
    //     let filtered = staticProperties;

    //     if (filters.location) {
    //         filtered = filtered.filter(property =>
    //             property.location.toLowerCase().includes(filters.location.toLowerCase())
    //         );
    //     }

    //     if (filters.category) {
    //         filtered = filtered.filter(property =>
    //             property.category.toLowerCase() === filters.category.toLowerCase()
    //         );
    //     }

    //     if (filters.minPrice || filters.maxPrice) {
    //         filtered = filtered.filter(property => {
    //             const priceStr = property.price.replace(/[₹,]/g, '').split('/')[0];
    //             const price = parseInt(priceStr);

    //             if (filters.minPrice && price < parseInt(filters.minPrice)) return false;
    //             if (filters.maxPrice && price > parseInt(filters.maxPrice)) return false;

    //             return true;
    //         });
    //     }

    //     setProperties(filtered);
    // };

    // Static fallback data
    const staticProperties = [
        {
            id: 1,
            title: "2 BHK Flat for Rent",
            location: "Roorkee",
            price: "₹12,000/month",
            category: "Flat",
            image: "/images/flat.jpg",
            description: "Well-maintained 2 BHK flat with modern amenities"
        },
        {
            id: 2,
            title: "Residential Plot for Sale",
            location: "Dehradun",
            price: "₹25 Lakh",
            category: "Plot",
            image: "/images/plot.jpg",
            description: "Prime location residential plot with clear title"
        },
        {
            id: 3,
            title: "PG Accommodation",
            location: "Haridwar",
            price: "₹5,000/month",
            category: "PG",
            image: "/images/PG.jpg",
            description: "Comfortable PG with all facilities included"
        },
        {
            id: 4,
            title: "3 BHK House for Sale",
            location: "Rishikesh",
            price: "₹45 Lakh",
            category: "House",
            image: "/images/house.jpg",
            description: "Spacious house with garden and parking"
        },
        {
            id: 5,
            title: "2 BHK Flat for Rent",
            location: "Roorkee",
            price: "₹15,000/month",
            category: "Flat",
            image: "/images/flat.jpg",
            description: "Modern flat with all amenities near IIT Roorkee"
        },
        {
            id: 6,
            title: "Commercial Plot",
            location: "Dehradun",
            price: "₹80 Lakh",
            category: "Plot",
            image: "/images/plot.jpg",
            description: "Prime commercial plot on main road"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search and Filter Section */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Properties</h1>
                    <SearchFilterBar onSearch={getProperties} searchParams={searchParams} />
                </div>
            </div>

            {/* Properties Grid */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <div className="mb-4 sm:mb-6">
                    <p className="text-sm sm:text-base text-gray-600">{properties.length} properties found</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {properties.map((property) => <PropertyCard key={property.id} property={property} />)}
                </div>

                {/* Load More Button */}
                <div className="text-center mt-6 sm:mt-8">
                    <button className="bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-gray-300 transition-colors text-sm sm:text-base">
                        Load More Properties
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main Properties page component with Suspense wrapper
const Properties = () => {
    return (
        <Suspense fallback={<PropertiesLoading />}>
            <PropertiesContent />
        </Suspense>
    );
};

export default Properties;
