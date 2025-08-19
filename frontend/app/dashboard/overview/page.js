"use client";
import React, { useState, useEffect } from 'react';
import { getMyProperties } from '../../../handlers/PropertyHandlers';
import { useRouter } from 'next/navigation';

const DashboardOverview = () => {
    const [stats, setStats] = useState({
        totalProperties: 0,
        activeProperties: 0,
        totalViews: 0,
        totalQueries: 0
    });
    const [recentProperties, setRecentProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const result = await getMyProperties();
            console.log('Dashboard data loaded:', result);

            if (result && result.success) {
                const properties = result.data?.properties || [];
                const activeProperties = properties.filter(p => p.isActive);

                setStats({
                    totalProperties: properties.length,
                    activeProperties: activeProperties.length,
                    totalViews: properties.reduce((sum, p) => sum + (p.views || 0), 0),
                    totalQueries: properties.reduce((sum, p) => sum + (p.queries || 0), 0)
                });

                // Get recent properties (last 5)
                setRecentProperties(properties.slice(0, 5));
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, icon, color = "green" }) => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${color}-100 text-${color}-600`}>
                    {icon}
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div> */}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-sm p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome to Your Dashboard!</h2>
                <p className="text-green-100">
                    Manage your properties, respond to queries, and grow your real estate business.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Properties"
                    value={stats.totalProperties}
                    color="green"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    }
                />
                <StatCard
                    title="Active Listings"
                    value={stats.activeProperties}
                    color="blue"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                <StatCard
                    title="Total Views"
                    value={stats.totalViews}
                    color="purple"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    }
                />
                <StatCard
                    title="Queries"
                    value={stats.totalQueries}
                    color="yellow"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    }
                />
            </div>

            {/* Recent Properties */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Recent Properties</h3>
                </div>
                <div className="p-6">
                    {recentProperties.length > 0 ? (
                        <div className="space-y-4">
                            {recentProperties.map((property) => (
                                <div key={property.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">{property.title}</h4>
                                            <p className="text-sm text-gray-500">{property.location} • {property.category}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">₹{property.price}</p>
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${property.isActive
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {property.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <p className="text-gray-500">No properties found. Start by adding your first property!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => router.push('/dashboard/create-property')}
                        className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Property
                    </button>

                    <button
                        onClick={() => router.push('/dashboard/properties')}
                        className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Manage Properties
                    </button>

                    <button
                        onClick={() => router.push('/dashboard/queries')}
                        className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        View Queries
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
