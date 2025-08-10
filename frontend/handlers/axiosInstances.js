import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies in requests
});

api.interceptors.response.use(
    response => response,
    error => {
        // Handle errors globally
        if (error.response) {
            // console.error('API Error:', error.response);
            return Promise.reject(error.response);
        } else {
            console.error('Network Error:', error.message);
            return Promise.reject({ message: 'Network error. Please try again later.' });
        }
    }
);

export default api;