import axios from "axios";
import { setupInterceptor } from "./interceptor";

export const notificationApi = setupInterceptor(
  axios.create({
    baseURL: import.meta.env.VITE_NOTIFICATIONS,
  })
);