import { api } from "@/api/api"
import {publicAuthApi} from "@/api/authApi"
export const useService = {
    // Products
    getAllProducts:()=>api.get(""),
    getProductById:(id:number)=>api.get(`/${id}`),
    getAllProductsByResturantId:(id:number)=>api.get(`/${id}`),


    //Resturants
    getAllResturants:()=>api.get(""),
    getResturantById:(id:number)=>api.get(`/${id}`),


    //Roles
    getAllRoles:()=>publicAuthApi.get("/roles")
}