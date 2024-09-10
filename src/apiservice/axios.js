import axios from 'axios';

// Create the Axios instance
const BASE_URL = process.env.REACT_APP_BASE_API;
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    httpsAgent: {
        rejectUnauthorized: false,
    },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        let res = { success: false, message: 'Something went wrong', error: null };

        if (error.response) {
            res = {
                success: false,
                message: error.response.data.code || 'Something went wrong',
                error: error.response.data,
            };
        } else if (error.request) {
            res = {
                success: false,
                message: 'Please check your internet connection.',
                error: error.request,
            };
        } else {
            res = {
                success: false,
                message: error.message,
                error,
            };
        }

        return Promise.reject(res);
    }
);

// Handle response function
const handleResponse = async (request) => {
    try {
        const response = await request;
        
        const responseData = response.data;
        
        // Check the 'status' field in the response data
        if (responseData.status === true || responseData.status === 'success') {
            return { success: true, data: responseData, message: responseData.message || '' };
        } else {
            return { success: false, data: responseData, message: responseData.message || 'Request failed' };
        }
    } catch (error) {
        return error;
    }
};

// Define the Services object
export const Services = {
    GET: (url, params = {}) => {
        let endpoint = url;
        if (Object.keys(params).length) {
            const paramsString = new URLSearchParams(params).toString();
            endpoint = `${endpoint}?${paramsString}`;
        }
        return handleResponse(axiosInstance.get(endpoint));
    },

    POST: (url, data = {}) => {
        return handleResponse(axiosInstance.post(url, data));
    },

    PUT: (url, data = {}) => {
        return handleResponse(axiosInstance.put(url, data));
    },

    DELETE: (url, data = {}) => {
        return handleResponse(axiosInstance.delete(url, { data }));
    },
};
