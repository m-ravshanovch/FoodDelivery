<script setup lang="ts">
import {
  ShoppingCart,
  User,
  CircleDollarSign,
} from "lucide-vue-next";

const data = [
  {
    name: "Mahsulotlar Soni",
    value: "50",
    icon: ShoppingCart,
  },
  {
    name: "Kunlik Auditoriya",
    value: "10",
    icon: User,
  },
  {
    name: "Aborot Oqimi",
    value: "10 million",
    icon: CircleDollarSign,
  },
];
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 w-full  gap-4 ">
    <div
      v-for="card in data"
      :key="card.name"
      class="shadow-lg shadow-slate-200 rounded-xl p-4 border border-slate-200 bg-white "
    >
      <div class="flex items-center justify-between">
        <h3 class="text-gray-500">
          {{ card.name }}
        </h3>

        <component
          :is="card.icon"
          class="w-6 h-6 text-orange-500"
        />
      </div>

      <p class="text-2xl font-bold mt-2">
        {{ card.value }}
      </p>
    </div>
  </div>
</template>