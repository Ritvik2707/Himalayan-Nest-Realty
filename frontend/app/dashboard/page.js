"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import PropertiesManagement from '../components/dashboard/PropertiesManagement';
import CreateProperty from '../components/dashboard/CreateProperty';
import ProfileManagement from '../components/dashboard/ProfileManagement';
import QueriesManagement from '../components/dashboard/QueriesManagement';
import DashboardOverview from '../components/dashboard/DashboardOverview';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, authChecked, loading } = useAppContext();
    const router = useRouter();

    // Redirect if not authenticated or not a dealer
    useEffect(() => {
        if (!loading && (!authChecked || user?.role !== 'dealer')) {
            router.push('/login');
        }
    }, [user, loading, authChecked, router]);

    // Show loading while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    // Don't render if not authenticated
    if (!authChecked || user?.role !== 'dealer') {
        return null;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <DashboardOverview />;
            case 'properties':
                return <PropertiesManagement />;
            case 'create-property':
                return <CreateProperty />;
            case 'queries':
                return <QueriesManagement />;
            case 'profile':
                return <ProfileManagement />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                </div>
            )}

            <div className="flex">
                {/* Sidebar */}
                <DashboardSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                {/* Main content */}
                <div className="flex-1 lg:mx-auto">
                    {/* Header */}
                    <DashboardHeader
                        setIsSidebarOpen={setIsSidebarOpen}
                        user={user}
                    />

                    {/* Page content */}
                    <main className="p-4 lg:p-6">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
