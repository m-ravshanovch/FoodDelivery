<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Hamburger, Zap } from "lucide-vue-next";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import { computed, ref } from "vue";
import { useQueryService } from "@/service/unauthenticated/useQueryService";

const {
  useRestaurants,
  useRestaurantsByCategory,
  useCategories,
} = useQueryService();

const selectedCategory = ref("");

const { data: categoriesData } =
  useCategories();

const {
  data: allRestaurants,
  isLoading: loadingAll,
} = useRestaurants();

console.log("restaran:",allRestaurants.value)

const {
  data: categoryRestaurants,
  isLoading: loadingCategory,
} = useRestaurantsByCategory(
  selectedCategory
);

const restaurants = computed(() => {
  if (selectedCategory.value === "") {
    return allRestaurants.value ?? [];
  }

  return categoryRestaurants.value ?? [];
});

const isLoading = computed(() => {
  if (selectedCategory.value === "") {
    return loadingAll.value;
  }

  return loadingCategory.value;
});
</script>

<template>
  <div class="bg-white">


    <div class="pt-5">
      <div class="flex gap-2 overflow-x-auto px-2">

        <button
          @click="selectedCategory = ''"
          :class="[
            'px-4 py-2 rounded-md border font-semibold whitespace-nowrap transition',
            selectedCategory === ''
              ? 'bg-green-600 text-white'
              : 'border-green-600 text-green-600'
          ]"
        >
          All
        </button>

        <button
          v-for="category in categoriesData"
          :key="category.id"
          @click="selectedCategory = category.name"
          :class="[
            'px-4 py-2 rounded-md border font-semibold whitespace-nowrap transition',
            selectedCategory === category.name
              ? 'bg-green-600 text-white'
              : 'border-green-600 text-green-600'
          ]"
        >
          {{ category.name }}
        </button>

      </div>
    </div>


    <div class="py-5 px-2">
      <h1 class="flex items-center gap-2 text-2xl font-bold">
        <Hamburger />
        Restaranlar
      </h1>
    </div>


    <div
      v-if="isLoading"
      class="flex justify-center items-center h-[60vh]"
    >
      <ClipLoader
        :loading="true"
        color="#16a34a"
      />
    </div>


    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-2"
    >
      <RouterLink
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :to="`/restaurant/${restaurant.id}`"
        class="rounded-2xl shadow-md shadow-slate-200 overflow-hidden hover:shadow-lg transition"
      >
        <div class="h-40">
          <img
            :src="restaurant.restaurant_img"
            :alt="restaurant.name"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="p-3 flex flex-col gap-3">
          <h2 class="font-bold text-lg">
            {{ restaurant.name }}
          </h2>

          <div class="flex items-center gap-2 text-sm font-semibold">
            <Zap
              :size="18"
              class="text-yellow-500"
            />
            20-30 min
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>