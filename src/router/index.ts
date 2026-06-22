import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Client auth
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

    // Staff auth
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
          path: "register",
          name: "StaffRegister",
          component: () => import("@/login/staff/register/FirstStep.vue"),
        },
        {
          path: "register/1",
          name: "StaffLoginStep1",
          component: () => import("@/login/staff/register/SecondStep.vue"),
        }
      ],
    },

    // Client pages
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
          path:"/:id",
          name:"Resturant page",
          component:()=>import("@/features/home/ResturantPage.vue")
        }
      ],
    },

    // Staff pages
    {
      path: "/admin",
      component: () => import("@/layouts/staff/admin/MainAdminLayout.vue"),
      children: [
        {
          path: "",
          name: "Dashboard",
          component: () => import("@/pages/admin/AdminHomePage.vue"),
        }
      ],
    },
  ],
});

export default router;