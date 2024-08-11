import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "https://api.angelcam.com/v1/";
const TOKEN = import.meta.env.ANGEL_TOKEN 
const jsonHeaders = {
  headers: {
    'Authorization': `PersonalAccessToken ${TOKEN}`,
    'Content-Type': 'application/json'
  }
}
console.log(URL);
const usersApi = axios.create({
  baseURL: URL,
});

export const getUser = () => usersApi.get("/me", jsonHeaders);

export const sharedCameras = () => usersApi.get("/shared-cameras/", jsonHeaders);