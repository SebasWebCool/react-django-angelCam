import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://127.0.0.1:8000";

console.log(URL);
const usersApi = axios.create({
  baseURL: `${URL}/api`,
});

export const getUser = () => usersApi.get("/user");

export const logInUser = (data) => usersApi.post("/login", data);

export const logOutUser = (data) => usersApi.post(`/logout`, data);

export const registerUser = (data) => usersApi.post(`/register`, data);
