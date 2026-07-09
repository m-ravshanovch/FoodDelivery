<script setup lang="ts">
import { Utensils, EllipsisVertical } from "lucide-vue-next";
import Cookies from "js-cookie";
import { ref } from "vue";
import { logOut } from "@/service/auth/AuthService";
import { useQueryService } from "@/service/unauthenticated/useQueryService";
import { useRouter } from "vue-router";
// const role = Cookies.get("role");



const router = useRouter()
const name = Cookies.get("name");
const avatar = Cookies.get("name")?.[0].toUpperCase() ?? "";
const restaurantId = localStorage.getItem("restaurantId")
const menuOpen = ref(false);
const { useRestaurantById } = useQueryService()
const { data: restaurantData } = useRestaurantById(restaurantId ?? '')
console.log(restaurantData.value)
const menus = [
  {
    name: "Mahsulotlar",
    to: "/admin",
  },
  {
    name: "Orders",
    to: "/admin/orders",
  },
  {
    name: "Restarant",
    to: "/admin/restaurant",
  },
];

const handleLogOut = () => {
  logOut();
  router.push('/staff-auth/login')
};

const handleCreateRestaurant = ()=>{
  localStorage.removeItem("restaurantId")
  router.push("/staff-auth/loginRestaurant")
}
</script>

<template>
  <div
    class="bg-white shadow-xl rounded-2xl shadow-slate-200 border border-slate-200 p-5 h-full flex flex-col justify-between">
    <div class="flex flex-col gap-y-5">
      <!-- Logo -->
      <div class="flex items-center gap-x-2 px-2 py-3">
        <div class="p-2 bg-orange-300 rounded-xl">
          <Utensils class="text-orange-700" />
        </div>
        <h1 class="font-bold text-lg">{{ restaurantData?.name }}</h1>
      </div>

      <div class="w-60 flex flex-col gap-y-2">
        <RouterLink v-for="menu in menus" :key="menu.name" :to="menu.to"
          class="rounded-xl border-l-4 border-transparent p-3 text-sm font-semibold transition-all duration-200 hover:bg-slate-50"
          active-class="bg-green-50 border-l-green-500 text-green-700 shadow-sm"
          exact-active-class="bg-green-50 border-l-green-500 text-green-700 shadow-sm">
          {{ menu.name }}
        </RouterLink>
      </div>
    </div>

    <div class="flex relative items-center justify-between">
      <div class="flex items-center gap-x-2">
        <div class="w-10 h-10 flex items-center justify-center rounded-full bg-green-200">
          <p class="font-bold">{{ avatar }}</p>
        </div>
        <p class="font-bold text-sm">{{ name }}</p>
      </div>

      <button @click="menuOpen = !menuOpen" class="p-2 cursor-pointer rounded-lg hover:bg-slate-100 transition-colors">
        <EllipsisVertical />
      </button>

      <div v-if="menuOpen" class="absolute -top-30 right-0 bg-white shadow-lg rounded-lg p-3 ">
        <button @click="handleCreateRestaurant"
          class="w-full flex cursor-pointer  items-center  transition hover:bg-slate-100 px-2 py-2  font-medium">
          <p class="text-sm">Restarant Yaratish</p>
        </button>
        <button @click="handleLogOut"
          class="w-full flex cursor-pointer  items-center   transition hover:bg-slate-100 px-2  py-2  font-medium">
          <p class="text-sm">Profildan Chiqish</p>
        </button>

      </div>
    </div>

  </div>
</template>

<style scoped></style>