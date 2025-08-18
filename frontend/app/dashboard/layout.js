"use client";
import React, { useEffect, useState } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { useAppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, authChecked, loading } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!authChecked || user?.role !== "dealer")) {
            router.push("/login");
        }
    }, [user, loading, authChecked, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                {/* <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div> */}
            </div>
        );
    }

    if (!authChecked || user?.role !== "dealer") {
        return null;
    }


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
                    <main className="p-4 lg:p-6">{children}</main>
                </div>
            </div>
        </div>
    );
}
