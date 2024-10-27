import axios from "axios";
import {ACCESS_TOKEN} from '../js/constants'

const apiURL = 'http://localhost:8000';


const api = axios.create({
    baseURL : apiURL
})

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
)


// // Response interceptor for refreshing the access token when expired
// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         // If the token is expired
//         if (error.response.status === 401 && error.response.data.code === 'token_not_valid') {
//             const refreshToken = localStorage.getItem('refreshToken');

//             // Check if the refresh token is available
//             if (refreshToken) {
//                 try {
//                     const response = await axios.post('/api/token/refresh/', { refresh: refreshToken });

//                     // Save the new access token
//                     localStorage.setItem('accessToken', response.data.access);

//                     // Retry the original request with the new access token
//                     originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
//                     return axios(originalRequest);
//                 } catch (refreshError) {
//                     // If refresh fails, log out the user or redirect to login page
//                     console.error('Failed to refresh token:', refreshError);
//                     localStorage.removeItem('accessToken');
//                     localStorage.removeItem('refreshToken');
//                     window.location.href = '/login';  // Redirect to login page
//                 }
//             } else {
//                 // No refresh token, log out the user
//                 console.error('No refresh token available');
//                 localStorage.removeItem('accessToken');
//                 localStorage.removeItem('refreshToken');
//                 window.location.href = '/login';
//             }
//         }

//         return Promise.reject(error);
//     }
// );


export default api;