import Cookies from "js-cookie";
import type { AxiosInstance } from "axios";

export const setupInterceptor = (
  api: AxiosInstance
) => {
  api.interceptors.request.use((config) => {
    const token = Cookies.get("accessToken");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  });

  return api;
};