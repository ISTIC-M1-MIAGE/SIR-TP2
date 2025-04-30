import axios from 'axios';

export function createAxiosInstance() {

    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8080',  // Update with your backend API URL
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
            'Accept': 'application/json',       // Accept JSON responses


        },
    });

// Attach Authorization header automatically
    axiosInstance.interceptors.request.use(
        (config) => {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("jwt_token");

                console.log("Current token:", token);

                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                    console.log("Authorization header set:", config.headers.Authorization);
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}