import type { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import axios from "axios";
export const setupInterceptor = (
  api: AxiosInstance
) => {

  api.interceptors.request.use((config) => {
    const token =
      Cookies.get("accessToken");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,

    async (error) => {

      const originalRequest =
        error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {

        originalRequest._retry = true;

        try {

          const refreshToken =
            Cookies.get("refreshToken");

            
            const userId = Cookies.get("userId")
            console.log({
               "refreshToken":refreshToken,
               "user_id":userId
            })
            await new Promise((resolve) => setTimeout(resolve, 5000));
            const res = await axios.post(
              `${import.meta.env.VITE_AUTH_URL}/auth/refresh`,
              {
                user_id: Number(userId),
                refresh_token: refreshToken,
              }
            );
            console.log("reshresh so'rov yuborildi");

          const newAccessToken =
            res.data.access_token;

          Cookies.set(
            "accessToken",
            newAccessToken
          );

          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`;

          return api(originalRequest);

        } catch {

          Cookies.remove(
            "accessToken"
          );
          Cookies.remove(
            "role"
          );

          Cookies.remove(
            "refreshToken"
          );
          await new Promise((resolve) => setTimeout(resolve, 5000));
          const role = Cookies.get("role")
          if (role === 'ADMIN' || role === 'RESTAURANT_OWNER' || role === 'COURIER') {
            window.location.href = "/staff-auth/login";
          } else {
            window.location.href = "/auth/login";
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};