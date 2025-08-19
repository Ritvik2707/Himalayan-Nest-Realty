// Loading Spinner Component - Global loading indicator
// Displays overlay with spinner during API calls and page transitions

'use client';

import React from 'react';
import { useAppContext } from '../context/AppContext';

const LoadingSpinner = () => {
    const { loading } = useAppContext(); // Get global loading state

    // Don't render if not loading
    if (!loading) return null;

    return (
        // Full-screen overlay with semi-transparent background
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
            {/* Loading indicator card */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-3">
                {/* Animated spinner */}
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                {/* Loading text */}
                <span className="text-gray-700 font-medium">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;
