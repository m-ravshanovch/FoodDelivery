import axios from "axios";
import { setupInterceptor } from "./interceptor";

export const restaurantApi = setupInterceptor(
  axios.create({
    baseURL: import.meta.env.VITE_RESTAURANT_URL,
  })
);