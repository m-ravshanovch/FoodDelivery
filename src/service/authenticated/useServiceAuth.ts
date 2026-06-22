import { orderApi } from "@/api/auth.order"

export const useServiceAuth = {
    //Orders
    getAllOrders:()=>orderApi.get(""),
    getAllOrdersByUserId:(userId:string)=>orderApi.get(`/${userId}`),
    getOrderById:(id:number)=>orderApi.get(`/${id}`)
}