import { api } from "@/api/api"
import { publicAuthApi } from "@/api/authApi"
import { authApi } from "@/api/auth.api"
export const useService = {
    // Products
    getAllProducts: () => api.get("/api/menu-items"),
    getProductById: (id: number) => api.get(`/${id}`),
    getAllProductsByResturantId: (restaurant_id: string) => api.get(`/api/restaurants/${restaurant_id}/menu`),
    getAllProductsByCategoryAndRestaurantId: (restaurant_id: string, category_menu_name: string) => api.get(`/api/restaurants/${restaurant_id}/menu_categories/${category_menu_name}/items`),


    //Resturants
    getAllResturants: () => api.get("/api/restaurants"),
    getResturantById: (uuid: string) => api.get(`/api/restaurant/${uuid}`),
    getResturantByCategory: (name: string) => api.get(`/api/category/restaurants/${name}`),
    getRestaurantsByOwnerId: (owner_id: number) =>
        api.get("/api/restaurants-by-owner-id", {
            params: {
                owner_id,
            },
        }),

    //Advertize
    getAllAdvertize: () => api.get("/api/ads"),

    //Roles
    getAllRoles: () => publicAuthApi.get("/roles/for-client"),

    //Categories
    getAllCategories: () => api.get("/api/general-category"),

    //Users
    getUserById: () => authApi.get(`/auth/me`),

    //LogOut 


    //Categories
    getCategoriesByResturantId: (restaurant_id: string) => api.get(`/api/restaurants/${restaurant_id}/menucategory`),

}