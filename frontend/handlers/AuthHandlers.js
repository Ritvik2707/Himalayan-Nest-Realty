// Authentication API handlers for Himalayan Nest Real Estate
import api from "./axiosInstances";

/**
 * User Registration Handler
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Registration response
 */
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        const data = response.data;

        // Store user data if provided (no token needed as it's in cookies)
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return {
            success: true,
            data: data,
            message: data.message || 'Registration successful!'
        };
    } catch (error) {
        console.error('Registration error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
        return {
            success: false,
            error: errorMessage,
            message: 'Registration failed. Please try again.'
        };
    }
};

/**
 * User Login Handler
 * @param {Object} credentials - User login credentials
 * @returns {Promise<Object>} Login response
 */
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        const data = response.data;

        // Store user data (authentication is handled via cookies)
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return {
            success: true,
            data: data,
            message: data.message || 'Login successful!'
        };
    } catch (error) {
        console.error('Login error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Login failed';
        return {
            success: false,
            error: errorMessage,
            message: 'Login failed. Please check your credentials.'
        };
    }
};

/**
 * User Logout Handler
 * @returns {Promise<Object>} Logout response
 */
export const logoutUser = async () => {
    try {
        await api.post('/auth/logout');
        return {
            success: true,
            message: 'Logged out successfully'
        }
    } catch (error) {
        console.warn('Logout request failed', error.message);
        return {
            success: false,
            message: 'Logout failed. Please try again.'
        };
    }
};

/**
 * Get Current User Profile
 * @returns {Promise<Object>} User profile response
 */
export const getCurrentUser = async () => {
    try {
        const response = await api.get('/auth/profile');
        const data = response.data;

        // Update stored user data
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return {
            success: true,
            data: data,
            message: data.message || 'Profile fetched successfully'
        };
    } catch (error) {
        console.error('Get current user error:', error.data);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch user profile';

        if (error.response?.status === 401) {
            return {
                success: false,
                error: 'Session expired. Please login again.',
                message: 'Failed to fetch user profile'
            };
        }

        return {
            success: false,
            error: errorMessage,
            message: 'Failed to fetch user profile'
        };
    }
};

/**
 * Update User Profile
 * @param {Object} profileData - Updated profile data
 * @returns {Promise<Object>} Update response
 */
export const updateUserProfile = async (profileData) => {
    try {
        const response = await api.put('/auth/profile', profileData);
        const data = response.data;

        // Update stored user data
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return {
            success: true,
            data: data,
            message: data.message || 'Profile updated successfully!'
        };
    } catch (error) {
        console.error('Update profile error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to update profile';

        if (error.response?.status === 401) {
            return {
                success: false,
                error: 'Session expired. Please login again.',
                message: 'Failed to update profile'
            };
        }

        return {
            success: false,
            error: errorMessage,
            message: 'Failed to update profile'
        };
    }
};

/**
 * Request Password Reset
 * @param {string} email - User email
 * @returns {Promise<Object>} Reset request response
 */
export const requestPasswordReset = async (email) => {
    try {
        const response = await api.post('/auth/forgot-password', { email });
        return {
            success: true,
            message: 'Password reset link sent to your email!'
        };
    } catch (error) {
        console.error('Password reset request error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to send password reset link'
        };
    }
};

/**
 * Reset Password
 * @param {Object} resetData - Password reset data
 * @returns {Promise<Object>} Reset response
 */
export const resetPassword = async (resetData) => {
    try {
        const response = await api.post('/auth/reset-password', resetData);
        return {
            success: true,
            message: 'Password reset successfully!'
        };
    } catch (error) {
        console.error('Password reset error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to reset password'
        };
    }
};

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;

    const user = localStorage.getItem('user');
    return !!user;
};

/**
 * Get stored user data
 * @returns {Object|null} User data or null
 */
export const getStoredUser = () => {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
        return JSON.parse(userStr);
    } catch (error) {
        console.error('Error parsing stored user data:', error);
        return null;
    }
};