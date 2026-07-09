import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/auth",
      component: () => import("@/layouts/client/ClientAuthLayout.vue"),
      children: [
        {
          path: "login",
          name: "ClientLogin",
          component: () => import("@/login/client/login/SignInClient.vue"),
        },
        {
          path: "register",
          name: "ClientRegister",
          component: () => import("@/login/client/register/FirstStep.vue"),
        },
        {
          path: "register/1",
          name: "ClientRegisterStep1",
          component: () => import("@/login/client/register/SecondStep.vue"),
        }
      ],
    },

    {
      path: "/staff-auth",
      component: () => import("@/layouts/staff/StaffAuthLayout.vue"),
      children: [
        {
          path: "login",
          name: "StaffLogin",
          component: () => import("@/login/staff/login/SignInStaff.vue"),
        },
        {
          path: "loginRestaurant",
          name: "loginRestaurant",
          component: () => import("@/login/staff/login/LogInRestaurant.vue"),
          meta: {
            requiresAuth: true,
            role: "RESTAURANT_OWNER",
            authType: "staff",
            loginPath: "/staff-auth/login"
          }
        },
        {
          path: "addRestaurant",
          name: "addRestaurant",
          component: () => import("@/login/staff/login/AddRestaurant.vue"),
          meta: {
            requiresAuth: true,
            role: "RESTAURANT_OWNER",
            authType: "staff",
            loginPath: "/staff-auth/login"
          }
        },
        {
          path: "register",
          name: "StaffRegister",
          component: () => import("@/login/staff/register/FirstStep.vue"),
        },
        {
          path: "register/1",
          name: "StaffLoginStep1",
          component: () => import("@/login/staff/register/SecondStep.vue"),
        },

      ],
    },

    {
      path: "/",
      component: () => import("@/layouts/client/MainClientLayout.vue"),
      
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/pages/client/HomePage.vue"),
        },
        {
          path: "restaurant/:id",
          name: "Resturant page",
          component: () => import("@/features/client/restaurantPage/ResturantPage.vue")
        },
        {
          path: "orderPage",
          name: "Order Page",
          component: () => import("@/features/client/order/OrderPage.vue"),
          meta: {
            requiresAuth: true,
            role: "CUSTOMER",
            authType: "client",
            loginPath: "/auth/login"
          }
        },
        {
          path: "myOrders",
          name: "My Orders",
          component: () => import("@/features/client/order/MyOrders.vue"),
          meta: {
            requiresAuth: true,
            role: "CUSTOMER",
            authType: "client",
            loginPath: "/auth/login"
          }
        },
      ],
    },

    {
      path: "/admin",
      component: () => import("@/layouts/staff/admin/MainAdminLayout.vue"),
      meta: {
        requiresAuth: true,
        role: "RESTAURANT_OWNER",
        authType: "staff",
        loginPath: "/staff-auth/login"
      },
      children: [
      
        {
          path: "",
          name: "Products",
          component: () => import("@/pages/admin/AdminProductsPage.vue"),
        },
        {
          path: "orders",
          name: "AdminOrders",
          component: () => import("@/pages/admin/AdminOrdersPage.vue"),
        },
        {
          path: "addProduct",
          name: "Add Products",
          component: () => import("@/features/admin/products/AddProducts.vue"),
        },
        {
          path: "restaurant",
          name: "Restaurant",
          component: () => import("@/features/admin/restaurant/Restaurant.vue"),
        },
      ],
    },
    {
      path: "/curier",
      component: () => import("@/layouts/staff/curier/MainCurierLayout.vue"),
      meta: {
        requiresAuth: true,
        role: "COURIER",
        authType: "staff",
        loginPath: "/staff-auth/login"
      },
      children: [
        {
          path: "",
          name: "HomeCurier",
          component: () => import("@/pages/curier/HomeCurier.vue"),
        },
        {
          path: "orders",
          name: "OrdersCurier",
          component: () => import("@/pages/curier/OrdersCurier.vue"),
        },
        {
          path: "history",
          name: "history",
          component: () => import("@/pages/curier/HistoryCurier.vue"),
        },
      ],
    },
    {
      path: "/superAdmin",
      component: () => import("@/layouts/staff/superAdmin/MainSuperAdminLayout.vue"),
      meta: {
        requiresAuth: true,
        role: "ADMIN",
        authType: "staff",
        loginPath: "/staff-auth/login"
      },
      children: [
       
        {
          path: "",
          name: "SuperAdminRestaurants",
          component: () => import("@/pages/superAdmin/SuperAdminRestaurants.vue"),
        },
        {
          path: "users",
          name: "UsersSuperAdmin",
          component: () => import("@/pages/superAdmin/SuperAdminUsers.vue"),
        },
        {
          path: "usersManagement",
          name: "usersManagementSuperAdmin",
          component: () => import("@/pages/superAdmin/SuperUsersManagement.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const token = Cookies.get("accessToken");
  const role = Cookies.get("role");



  if (to.meta.requiresAuth && !token) {
    if (to.meta.authType === "staff") {
      return String(to.meta.loginPath)
    } else {
      return String(to.meta.loginPath)
    }
  }
  if (to.meta.guestOnly && token) {
    return "/";
  }

  if (to.meta.role && role !== to.meta.role) {
    return "/"
  }

})

export default router;