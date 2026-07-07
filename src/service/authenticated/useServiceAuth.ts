import { orderApi } from "@/api/auth.order"
import { notificationApi } from "@/api/auth.notif"
import { restaurantApi } from "@/api/resturant.api"
import { authApi } from "@/api/auth.api"
export const useServiceAuth = {
    //Orders
    getAllOrders:()=>orderApi.get("/orders"),
    getAllOrdersByUserId:(userId:string)=>orderApi.get(`/${userId}`),
    getOrderById:(id:number)=>orderApi.get(`/${id}`),
    getAllOrdersByRestaurantId:(restaurantId:string)=>orderApi.get(`/orders/restaurant/${restaurantId}`),
    createOrder:(payload:any)=>orderApi.post("/orders",payload),
    changeStatusOrder:(status:string,id:string)=>orderApi.patch(`/orders/${id}/status`,{
        status:status
    }),


    //Notification
    getNotifications :()=>notificationApi.get("/notifications"),

    
    //Curiers
    getAvailableOrders:()=>orderApi.get("/courier/available-orders"),
    getOrderByCurier:(payload:any)=>orderApi.get("/courier/assign-to-order",payload),

    //Restaurant
    createRestaurant:(payload:any)=>restaurantApi.post("/api/restaurants",payload),
    deleteRestaurant:(uuid:string)=>restaurantApi.delete(`/api/restaurant/${uuid}`),

    //Categories
    createCategoriesByRestaurant:(payload:any)=>restaurantApi.post("/api/menu-category",payload),
    deleteCategory:(id:number)=>restaurantApi.delete(`/api/menu-category/${id}`),


    //product 
    createProduct:(payload:any)=>restaurantApi.post("/api/menu-items",payload),

    //users
    makeUserActiveById:(id:number)=> authApi.patch(`/users/activate/${id}`),
    getMyInformation:()=>authApi.get("/auth/me")
}