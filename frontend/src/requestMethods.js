import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const getToken = () => {
    try {
        const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
        if (!persistRoot) return null; 
        
        const user = JSON.parse(persistRoot.user);
        return user?.currentUser?.accessToken || null;
    } catch (error) {
        console.error("Token retrieval error:", error);
        return null;
    }
};

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);