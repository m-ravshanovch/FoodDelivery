import axios from "axios";
import { setupInterceptor } from "./interceptor";

export const authApi = setupInterceptor(
  axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL,
  })
);