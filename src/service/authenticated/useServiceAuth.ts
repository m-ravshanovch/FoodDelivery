import { orderApi } from "@/api/auth.order"
import { notificationApi } from "@/api/auth.notif"
import { restaurantApi } from "@/api/resturant.api"
export const useServiceAuth = {
    //Orders
    getAllOrders:()=>orderApi.get(""),
    getAllOrdersByUserId:(userId:string)=>orderApi.get(`/${userId}`),
    getOrderById:(id:number)=>orderApi.get(`/${id}`),

    createOrder:(payload:any)=>orderApi.post("/orders",payload),

    //Notification
    getNotifications :()=>notificationApi.get("/notifications"),




    //Restaurant
    createRestaurant:(payload:any)=>restaurantApi.post("/api/restaurants",payload),
}