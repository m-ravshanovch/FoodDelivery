<script setup lang="ts">
import { Utensils, EllipsisVertical } from "lucide-vue-next";

const menus = [
  {
    name: "Bosh Sahifa",
    to: "/admin",
  },
  {
    name: "Mahsulotlar",
    to: "/admin/products",
  },
  {
    name: "Statistika",
    to: "/admin/statistics",
  },
];
</script>

<template>
  <div
    class="bg-white shadow-xl rounded-2xl shadow-green-200 border border-slate-200 p-5 h-full flex flex-col justify-between"
  >
    <div class="flex flex-col gap-y-5">
      <!-- Logo -->
      <div class="flex items-center gap-x-2 px-2 py-3">
        <div class="p-2 bg-orange-300 rounded-xl">
          <Utensils class="text-orange-700" />
        </div>
        <h1 class="font-bold text-lg">Restaurant Name</h1>
      </div>

      <!-- Menu -->
      <div class="w-60 flex flex-col gap-y-2">
        <RouterLink
          v-for="menu in menus"
          :key="menu.name"
          :to="menu.to"
          class="rounded-xl border-l-4 border-transparent p-3 text-sm font-semibold transition-all duration-200 hover:bg-slate-50"
          active-class="bg-green-50 border-l-green-500 text-green-700 shadow-sm"
          exact-active-class="bg-green-50 border-l-green-500 text-green-700 shadow-sm"
        >
          {{ menu.name }}
        </RouterLink>
      </div>
    </div>

    <!-- User -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-2">
        <div
          class="w-10 h-10 flex items-center justify-center rounded-full bg-green-200"
        >
          <p class="font-bold">M</p>
        </div>

        <p class="font-bold text-sm">Owner Name</p>
      </div>

      <button
        class="p-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <EllipsisVertical />
      </button>
    </div>
  </div>
</template>

<style scoped></style>