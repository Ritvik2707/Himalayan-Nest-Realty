'use client';
import { createContext, useState, useContext, useEffect } from "react";
import { getCurrentUser } from "../../handlers/AuthHandlers";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Start with true for initial auth check
    const [authChecked, setAuthChecked] = useState(false);

    // Check authentication status on app initialization
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const result = await getCurrentUser();

                if (result && result.success && result.data?.user) {
                    setUser(result.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setUser(null);
            } finally {
                setAuthChecked(true);
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Helper function to clear user data
    const clearUser = () => {
        setUser(null);
    };

    // Helper function to check if user is authenticated
    const isAuthenticated = () => {
        return user !== null;
    };

    const context = {
        // User state
        user,
        setUser,

        // Loading state
        loading,
        setLoading,

        // Auth check state
        authChecked,
    };

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the App Context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};