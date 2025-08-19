// Global Application Context for State Management
// Manages user authentication state and provides it to all components

'use client';
import { createContext, useState, useContext, useEffect } from "react";
import { getCurrentUser } from "../../handlers/AuthHandlers";

// Create context for global state sharing
const AppContext = createContext();

// Context Provider component that wraps the entire app
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Current authenticated user
    const [loading, setLoading] = useState(true); // Loading state for auth check
    const [authChecked, setAuthChecked] = useState(false); // Has auth check completed

    // Check authentication status on app initialization
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Verify if user is still authenticated (check JWT validity)
                const result = await getCurrentUser();

                if (result && result.success && result.data?.user) {
                    setUser(result.data.user); // User is authenticated
                } else {
                    setUser(null); // No valid authentication
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setUser(null); // Clear user on error
            } finally {
                setAuthChecked(true);
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Helper function to clear user data (for logout)
    const clearUser = () => {
        setUser(null);
    };

    // Context value object containing all shared state and functions
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