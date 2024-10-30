import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../js/constants';

const apiURL = 'http://localhost:8000';

const api = axios.create({
    baseURL: apiURL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for refreshing the access token when expired
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If the token is expired
        if (error.response && error.response.status === 401 && error.response.data.code === 'token_not_valid') {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);

            // Check if the refresh token is available
            if (refreshToken) {
                try {
                    // Use `api` instance to ensure `baseURL` is applied
                    const response = await api.post('/api/token/refresh/', { refresh: refreshToken });

                    // Save the new access token
                    localStorage.setItem(ACCESS_TOKEN, response.data.access);

                    // Retry the original request with the new access token
                    originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    // If refresh fails, log out the user or redirect to login page
                    console.error('Failed to refresh token:', refreshError);
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(REFRESH_TOKEN);
                    window.location.href = '/login';  // Redirect to login page
                }
            } else {
                // No refresh token, log out the user
                console.error('No refresh token available');
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
