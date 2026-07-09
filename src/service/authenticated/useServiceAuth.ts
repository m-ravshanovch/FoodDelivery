import { orderApi } from "@/api/auth.order"
import { notificationApi } from "@/api/auth.notif"
import { restaurantApi } from "@/api/resturant.api"
import { authApi } from "@/api/auth.api"
import type { createOrder } from "@/types/OrderTypes"
import type { getOrderByCurier } from "@/types/OrderTypes"
import type { createRestaurant } from "@/types/RestaurantTypes"
import type { createCategoryByRestaurant } from "@/types/createCategory"
import type { createProdcut } from "@/types/ProductTypes"
export const useServiceAuth = {
    //Orders
    getAllOrders:()=>orderApi.get("/orders"),
    getAllOrdersByCustomerId:(customer_id:number)=>orderApi.get(`/orders/customer/${customer_id}`),
    getOrderById:(id:number)=>orderApi.get(`/${id}`),
    getAllOrdersByRestaurantId:(restaurantId:string)=>orderApi.get(`/orders/restaurant/${restaurantId}`),
    createOrder:(payload:createOrder)=>orderApi.post("/orders",payload),
    changeStatusOrder:(status:string,id:string)=>orderApi.patch(`/orders/${id}/status`,{
        status:status
    }),


    //Notification
    getNotifications :()=>notificationApi.get("/notifications"),

    
    //Curiers
    getAvailableOrders:()=>orderApi.get("/courier/available-orders"),
    getOrderByCurier:(payload:getOrderByCurier)=>orderApi.post("/courier/assign-to-order",payload),

    //Restaurant
    createRestaurant:(payload:createRestaurant)=>restaurantApi.post("/api/restaurants",payload),
    deleteRestaurant:(uuid:string)=>restaurantApi.delete(`/api/restaurant/${uuid}`),

    //Categories
    createCategoriesByRestaurant:(payload:createCategoryByRestaurant)=>restaurantApi.post("/api/menu-category",payload),
    deleteCategory:(id:number)=>restaurantApi.delete(`/api/menu-category/${id}`),


    //product 
    createProduct:(payload:createProdcut)=>restaurantApi.post("/api/menu-items",payload),

    //users
    makeUserActiveById:(id:number)=> authApi.patch(`/users/activate/${id}`),
    getMyInformation:()=>authApi.get("/auth/me")
}