

import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const getToken = () => {
    try {
        const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
        const user = persistRoot && JSON.parse(persistRoot.user);
        return user && user.currentUser && user.currentUser.accessToken;
    } catch (error) {
        console.error("Token retrieval error: ", error);
        return null;
    }
};

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

const userRequest = axios.create({
    baseURL: BASE_URL,
});

// Minden kéréshez automatikusan hozzáadja az Authorization fejlécet
userRequest.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { userRequest };