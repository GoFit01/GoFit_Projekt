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

const TOKEN = getToken();

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
});