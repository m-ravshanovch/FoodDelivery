import { authApi } from "@/api/auth.api";
import Cookies from "js-cookie";
interface Login {
    email:string,
    password:string
}

interface Verification {
    email : string,
    vcode:number
}

interface Register {
    name:string,
    email:string,
    password:string,
    otpToken:string
}
export const loginUser = async (payload:Login)=>{
      try{
        const response = await authApi.post("/auth/login",payload);
        const token = response.data;
        Cookies.set("token",token,{expires:7});
        return response.data
      } catch(error){
        console.error("Login error:",error);
        throw error;
      }
}

export const register = async(payload:Verification)=>{

    try {
        const optToken = authApi.post("/auth/sent-otp",payload);
        return {
            email:payload.email,
            optToken
        }
    }catch(error){
        console.error("Register error:",error);
        throw error;
    }
  
}



export const registerNextStep = async(payload:Register)=>{
    try{
        return authApi.post("/auth/register",payload)
    }catch(error){
        console.log("Register Error:",error)
    }
}