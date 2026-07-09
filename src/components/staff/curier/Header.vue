<script setup lang="ts">
import Cookies from "js-cookie";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  Menu,
  X,
  User,
  LogOut,
  House,
  Package,
  History,
} from "lucide-vue-next";
import { logOut } from "@/service/auth/AuthService";

const router = useRouter();

const sidebarOpen = ref(false);
const profileOpen = ref(false);

const name = Cookies.get("name");

const menus = [
  {
    name: "Home",
    to: "/curier",
    icon: House,
  },
  {
    name: "Orders",
    to: "/curier/orders",
    icon: Package,
  },
  {
    name: "History",
    to: "/curier/history",
    icon: History,
  },
];

const handleLogOut = () => {
  logOut();
  router.push("/staff-auth/login");
};
</script>

<template>
  <div
    class=" h-16 bg-white shadow-sm flex rounded-2xl items-center justify-between px-4"
  >
    <button
      @click="sidebarOpen = true"
      class="p-2 rounded-lg cursor-pointer hover:bg-slate-100"
    >
      <Menu />
    </button>

    <h2 class="font-bold">Courier Panel</h2>

    <button
      @click="profileOpen = !profileOpen"
      class="p-2 cursor-pointer border border-slate-400 rounded-full"
    >
      <User />
    </button>

    <Transition
      enter-active-class="transition-all duration-200"
      leave-active-class="transition-all duration-200"
      enter-from-class="opacity-0 scale-95"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="profileOpen"
        class="absolute top-16 right-4 bg-white rounded-xl shadow-xl  w-44 overflow-hidden z-50"
      >
        <button
          @click="handleLogOut"
          class="flex items-center gap-2 w-full px-4 py-3 hover:bg-slate-100"
        >
          <LogOut class="w-4 h-4" />
          Profildan chiqish
        </button>
      </div>
    </Transition>
  </div>

  <Transition
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/40 z-40"
    />
  </Transition>

  <aside
    class="fixed top-0 left-0 w-72 h-screen bg-white shadow-2xl z-50 transition-transform duration-300"
    :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="h-16 border-b border-slate-300 flex items-center justify-between px-5">
      <h2 class="font-bold">Courier</h2>

      <button
        @click="sidebarOpen = false"
        class="p-2 rounded-lg cursor-pointer hover:bg-slate-100"
      >
        <X />
      </button>
    </div>

    <div class="p-4 flex flex-col gap-2">
      <RouterLink
        v-for="menu in menus"
        :key="menu.name"
        :to="menu.to"
        @click="sidebarOpen = false"
        class="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-100 transition"
        active-class="bg-blue-50 text-blue-600"
      >
        <component :is="menu.icon" class="w-5 h-5" />
        {{ menu.name }}
      </RouterLink>
    </div>

    <div class="absolute bottom-0 left-0 w-full border-t border-slate-300 p-5">
      <div class="flex items-center gap-3">
        <div
          class="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center"
        >
          <User class="w-5 h-5" />
        </div>

        <div>
          <p class="font-semibold">{{ name }}</p>
          <p class="text-xs text-slate-500">Courier</p>
        </div>
      </div>
    </div>
  </aside>
</template>