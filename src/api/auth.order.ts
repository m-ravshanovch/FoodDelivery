import axios from "axios";
import { setupInterceptor } from "./interceptor";

export const orderApi = setupInterceptor(
  axios.create({
    baseURL: import.meta.env.VITE_ORDER_URL,
  })
);