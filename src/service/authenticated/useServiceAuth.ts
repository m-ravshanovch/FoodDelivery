import { orderApi } from "@/api/auth.order"
import { notificationApi } from "@/api/auth.notif"
export const useServiceAuth = {
    //Orders
    getAllOrders:()=>orderApi.get(""),
    getAllOrdersByUserId:(userId:string)=>orderApi.get(`/${userId}`),
    getOrderById:(id:number)=>orderApi.get(`/${id}`),


    //Notification
    getNotifications :()=>notificationApi.get("/notifications")
}