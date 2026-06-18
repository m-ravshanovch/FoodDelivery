import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history:createWebHistory(),
    routes :[
        {
            path:"/",
            name:"Home",
            component:() => import("@/pages/HomePage.vue")
        },
        {
            path:"/orders",
            name:"Orders",
            component:() => import("@/pages/OrdersPage.vue")
        },
    ]
})

export default router;