import { authApi } from "@/api/auth.api";
import Cookies from "js-cookie";

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
}
interface RegisterStaffForm {
    name: string;
    password: string;
    role_id:number
}

export const loginUser = async (payload: Login) => {
    try {
        console.log("payload:",payload);
        
        const response = await authApi.post("/auth/login", payload);

        Cookies.set("token", response.data, {
            expires: 7,
        });

        console.log("response data:",response.data);
        
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const verification = async (payload: Verification) => {
    try {
        const response = await authApi.post(
            "/auth/verify-otp",
            payload
        );

        const verificationData = {
            email: payload.email,
            otpToken: response.data.otpToken,
        };
        console.log("otptoken:",response.data.otpToken);
        

        sessionStorage.setItem(
            "verificationData",
            JSON.stringify(verificationData)
        );

        return verificationData;
    } catch (error) {
        console.error("Verification error:", error);
        throw error;
    }
};

export const registerNextStep = async (
    payload: RegisterForm
) => {
    try {
        const verificationData = JSON.parse(
            sessionStorage.getItem("verificationData") || "{}"
        );
        console.log({
            name: payload.name,
            password: payload.password,
            email: verificationData.email,
            otpToken: verificationData.otpToken,
        });

        return await authApi.post("/auth/register", {
            name: payload.name,
            password: payload.password,
            email: verificationData.email,
            otpToken: verificationData.otpToken,
        });
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
};
export const registerStaffNextStep = async (
    payload: RegisterStaffForm
) => {
    try {
        const verificationData = JSON.parse(
            sessionStorage.getItem("verificationData") || "{}"
        );
        console.log({
            name: payload.name,
            password: payload.password,
            email: verificationData.email,
            otpToken: verificationData.otpToken,
            role_id:payload.role_id
        });

        console.log(verificationData);
        
        return await authApi.post("/auth/register", {
            name: payload.name,
            password: payload.password,
            email: verificationData.email,
            otpToken: verificationData.otpToken,
            role_id:payload.role_id
        });
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
};