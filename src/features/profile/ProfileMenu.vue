<script setup lang="ts">
import { LogOut, ClockArrowUp ,UserRound, ChefHat} from "lucide-vue-next";
import { useQueryUsersData } from "@/service/unauthenticated/users/useQueryUsersData"
import Cookies from "js-cookie";
import { logOut } from "@/service/auth/AuthService";
import { useRouter } from "vue-router";
const name = Cookies.get("name")
const role = Cookies.get("role")

const { useUser } = useQueryUsersData()
const { data } = useUser()
const router= useRouter()

const menuList = [
    {
        "name": "Buyurtmalarim",
        "to": "/orderPage",
        "icon": ClockArrowUp
    },
    {
        "name": "Curier Bo'lish",
        "to": "/staff-auth/login",
        "icon": UserRound
    },
    {
        "name": "Restaurant qo'shish",
        "to": "/staff-auth/login",
        "icon": ChefHat
    },
]
console.log("auth/me", data.value)


const handleLogout = async () => {
  try {
    await logOut();
    if (role === "CUSTOMER") {
      router.push("/auth/login");
    } else {
      router.push("/staff-auth/login");
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

</script>

<template>
    <div class="w-60 max-h-96 overflow-y-auto rounded-2xl bg-white shadow-xl border border-slate-100 p-3">
        <div class="flex flex-col gap-y-5 justify-between mb-4">
            <h2 class="font-bold text-lg text-slate-800">
                {{ name }}
            </h2>

            <div class="flex flex-col gap-y-4">
                <RouterLink :to="menu.to" v-for="menu in menuList" :key="menu.name" class=" text-black flex items-center gap-x-2   text-md   rounded-full">
                  <component :is="menu.icon" :size="18" /> {{ menu?.name }}
                </RouterLink>
            </div>
        </div>

        <button
            @click.prevent="handleLogout"
            class="w-full flex cursor-pointer justify-center gap-x-2  items-center mt-4 bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-xl font-medium">
            <p class="text-sm">Profildan Chiqish</p>
            <LogOut :size="18" />
        </button>
    </div>
</template>