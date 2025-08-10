"use client";
import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import SearchFilterBar from '../components/SearchFilterBar'
import { useAppContext } from '../context/AppContext'
import { getProperties, searchProperties } from '../../handlers/PropertyHandlers'

// Loading component for Suspense fallback
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

// Main Properties component that uses useSearchParams
const PropertiesContent = () => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useSearchParams();
    const { loading, setLoading } = useAppContext();

    // Load properties on component mount and when search params change
    useEffect(() => {
        loadProperties();
    }, [searchParams]);

    const loadProperties = async () => {
        setLoading(true);
        setError('');

        try {
            // Get search parameters from URL
            const filters = {};
            searchParams.forEach((value, key) => {
                filters[key] = value;
            });

            let result;
            if (Object.keys(filters).length > 0) {
                // Use search if there are filters
                result = await searchProperties(filters);
            } else {
                // Get all properties if no filters
                result = await getProperties();
            }

            if (result && result.success) {
                // Handle successful response
                const propertiesData = result.data?.properties || result.data || [];
                setProperties(propertiesData);
                setTotalPages(result.data?.totalPages || 1);
                setCurrentPage(result.data?.currentPage || 1);
            } else {
                // Handle API failure
                const errorMessage = result?.error || result?.message || 'Failed to load properties';
                setError(errorMessage);
                // Fallback to static data if API fails
                setProperties(staticProperties);
            }
        } catch (error) {
            console.error('Error loading properties:', error);
            setError('Failed to load properties');
            // Fallback to static data on error
            setProperties(staticProperties);
        } finally {
            setLoading(false);
        }
    };

    // Handle search from SearchFilterBar component
    const handleSearch = async (filters) => {
        setLoading(true);
        setError('');

        try {
            const result = await searchProperties(filters);

            if (result && result.success) {
                // Handle successful search response
                const propertiesData = result.data?.properties || result.data || [];
                setProperties(propertiesData);
                setTotalPages(result.data?.totalPages || 1);
                setCurrentPage(result.data?.currentPage || 1);
            } else {
                // Handle search failure
                const errorMessage = result?.error || result?.message || 'Search failed';
                setError(errorMessage);
                // Filter static data based on search criteria
                filterStaticProperties(filters);
            }
        } catch (error) {
            console.error('Search error:', error);
            setError('Search failed');
            // Filter static data based on search criteria
            filterStaticProperties(filters);
        } finally {
            setLoading(false);
        }
    };

    // Filter static properties when API search fails
    const filterStaticProperties = (filters) => {
        let filtered = staticProperties;

        if (filters.location) {
            filtered = filtered.filter(property =>
                property.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        if (filters.category) {
            filtered = filtered.filter(property =>
                property.type.toLowerCase() === filters.category.toLowerCase()
            );
        }

        if (filters.minPrice || filters.maxPrice) {
            filtered = filtered.filter(property => {
                const priceStr = property.price.replace(/[₹,]/g, '').split('/')[0];
                const price = parseInt(priceStr);

                if (filters.minPrice && price < parseInt(filters.minPrice)) return false;
                if (filters.maxPrice && price > parseInt(filters.maxPrice)) return false;

                return true;
            });
        }

        setProperties(filtered);
    };

    // Static fallback data
    const staticProperties = [
        {
            id: 1,
            title: "2 BHK Flat for Rent",
            location: "Roorkee",
            price: "₹12,000/month",
            type: "Flat",
            image: "/images/flat.jpg",
            description: "Well-maintained 2 BHK flat with modern amenities"
        },
        {
            id: 2,
            title: "Residential Plot for Sale",
            location: "Dehradun",
            price: "₹25 Lakh",
            type: "Plot",
            image: "/images/plot.jpg",
            description: "Prime location residential plot with clear title"
        },
        {
            id: 3,
            title: "PG Accommodation",
            location: "Haridwar",
            price: "₹5,000/month",
            type: "PG",
            image: "/images/PG.jpg",
            description: "Comfortable PG with all facilities included"
        },
        {
            id: 4,
            title: "3 BHK House for Sale",
            location: "Rishikesh",
            price: "₹45 Lakh",
            type: "House",
            image: "/images/house.jpg",
            description: "Spacious house with garden and parking"
        },
        {
            id: 5,
            title: "2 BHK Flat for Rent",
            location: "Roorkee",
            price: "₹15,000/month",
            type: "Flat",
            image: "/images/flat.jpg",
            description: "Modern flat with all amenities near IIT Roorkee"
        },
        {
            id: 6,
            title: "Commercial Plot",
            location: "Dehradun",
            price: "₹80 Lakh",
            type: "Plot",
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
                    <SearchFilterBar onSearch={handleSearch} />
                </div>
            </div>

            {/* Properties Grid */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                        <p className="mt-2 text-gray-600">Loading properties...</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 sm:mb-6">
                            <p className="text-sm sm:text-base text-gray-600">{properties.length} properties found</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {properties.map((property) => (
                                <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative h-40 sm:h-48">
                                        <Image
                                            src={property.image}
                                            alt={property.title}
                                            fill sizes='(100vw) 100vw, (min-width: 640px) 50vw, (min-width: 1024px) 33vw'
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-3 sm:p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{property.title}</h3>
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                {property.type}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-xs sm:text-sm mb-2">{property.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 text-xs sm:text-sm">{property.location}</span>
                                            <span className="text-base sm:text-lg font-bold text-green-600">{property.price}</span>
                                        </div>
                                        <button className="w-full mt-2 sm:mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors text-sm sm:text-base">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        <div className="text-center mt-6 sm:mt-8">
                            <button className="bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-gray-300 transition-colors text-sm sm:text-base">
                                Load More Properties
                            </button>
                        </div>
                    </>
                )}
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
