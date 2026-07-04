import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { authApi } from "@/api/auth.api";

interface Login {
  email: string;
  password: string;
}

interface Verification {
  email: string;
  code: string;
}

interface RegisterForm {
  name: string;
  password: string;
  phone_number: string;
}

interface RegisterStaffForm extends RegisterForm {
  role_id: number;
}

const getVerificationData = () => {
  const data = sessionStorage.getItem("verificationData");

  if (!data) {
    throw new Error("Verification data not found");
  }

  return JSON.parse(data);
};

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    console.error("Status:", error.response?.status);
    console.error("Backend:", error.response?.data);

    throw error.response?.data ?? error.message;
  }

  console.error(error);
  throw error;
};


export const loginUser = async (payload: Login) => {
  try {
    const { data } = await authApi.post("/auth/login", payload);

    Cookies.set("accessToken", data.access_token, { expires: 1 });
    Cookies.set("refreshToken", data.refresh_token, { expires: 30 });
    Cookies.set("role", data.role);
    Cookies.set("userId", data.user_id);
    Cookies.set("name", data.name);

    return data;
  } catch (error) {
    handleError(error);
  }
};


export const verification = async (payload: Verification) => {
  try {
    const { data } = await authApi.post("/auth/verify-otp", payload);

    const verificationData = {
      email: payload.email,
      otpToken: data.otpToken,
    };

    sessionStorage.setItem(
      "verificationData",
      JSON.stringify(verificationData)
    );

    return verificationData;
  } catch (error) {
    handleError(error);
  }
};


export const registerNextStep = async (payload: RegisterForm) => {
  try {
    const verification = getVerificationData();

    const { data } = await authApi.post("/auth/register", {
      name: payload.name,
      password: payload.password,
      phone_number: payload.phone_number,
      email: verification.email,
      otpToken: verification.otpToken,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};


export const registerStaffNextStep = async (
  payload: RegisterStaffForm
) => {
  try {
    const verification = getVerificationData();

    const { data } = await authApi.post("/auth/register", {
      name: payload.name,
      password: payload.password,
      phone_number: payload.phone_number,
      role_id: payload.role_id,
      email: verification.email,
      otpToken: verification.otpToken,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};


export const logOut = async () => {
  try {
    await authApi.post("/auth/logout");

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("role");
    Cookies.remove("userId");
    Cookies.remove("name");
  } catch (error) {
    handleError(error);
  }
};