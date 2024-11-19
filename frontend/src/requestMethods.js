import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

// A helyi tárolóból történő adatlekérés és a token beállítása
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`, // Ha van token, hozzáadjuk
  },
});

// Ellenőrizzük, hogy van-e token, és ha nincs, akkor a hívások előtt frissítjük.
export const updateUserRequestToken = () => {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const TOKEN = currentUser?.accessToken;
  
  userRequest.defaults.headers.Authorization = `Bearer ${TOKEN || ""}`;
};