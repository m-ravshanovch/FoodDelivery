import axios from "axios";

export const publicAuthApi = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL,
})