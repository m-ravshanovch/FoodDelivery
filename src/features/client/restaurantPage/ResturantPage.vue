<script setup lang="ts">
import { useRoute } from "vue-router";
import { ArrowLeft, ShoppingCart, Earth, Heart } from "lucide-vue-next";
import { useQueryService } from "@/service/unauthenticated/useQueryService";
import { useCartStore } from "@/stores/card";
import ShopCart from "./ShopCart.vue";
import { ref, computed } from "vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
const cartStore = useCartStore()
const route = useRoute();

const id = String(route.params.id);




const { useProductsByRestaurantId, useRestaurantById, useCategoriesByRestaurantId, useAllProductsByCategoryAndRestaurantId } = useQueryService()
const selectedCategory = ref("");
const {
    data: productsData,
    isLoading: loadingProducts,
} = useProductsByRestaurantId(id);
const {
    data: productsDataByCategory,
    isLoading: loadingProductsByCategory,
} = useAllProductsByCategoryAndRestaurantId(selectedCategory, id);
const {
    data: categoriesData,
} = useCategoriesByRestaurantId(id);

const {
    data: restaurantsData
} = useRestaurantById(id);



const products = computed(() => {
    if (selectedCategory.value === "") {
        return productsData.value ?? [];
    }

    return productsDataByCategory.value ?? [];
});

const isLoading = computed(() => {
    if (selectedCategory.value === "") {
        return loadingProducts.value;
    }

    return loadingProductsByCategory.value;
});





console.log("Resturant data:", restaurantsData.value)

console.log("Restaurant page:", productsData.value)




</script>

<template>
    <div class="flex gap-x-4  mt-3 p-2 h-full justify-center   rounded-md">

        <div class="h-dvh w-full flex flex-col gap-y-3">
            <div class="bg-white border border-green-100 flex items-center justify-between py-2 px-2 rounded-md">
                <div class="flex items-center gap-x-1">
                    <RouterLink to="/">
                        <ArrowLeft :size="18" />
                    </RouterLink>
                    <h1 class="font-bold text-md md:text-xl ">{{ restaurantsData?.name }}</h1>
                </div>
                <div>
                    <h1 class="font-semibold flex items-center gap-2">
                        <Earth :size="18" />
                        <a :href="restaurantsData?.address" target="_blank">website</a>
                    </h1>
                </div>
            </div>
            <div class="pt-5">
                <div class="flex gap-2 overflow-x-auto px-2">

                    <button @click="selectedCategory = ''" :class="[
                        'px-4 py-2 rounded-md border font-semibold cursor-pointer whitespace-nowrap transition',
                        selectedCategory === ''
                            ? 'bg-green-600 text-white'
                            : 'border-green-600 text-green-600'
                    ]">
                        All
                    </button>

                    <button v-for="category in categoriesData" :key="category.id"
                        @click="selectedCategory = category.name" :class="[
                            'px-4 py-2 rounded-md border font-semibold cursor-pointer whitespace-nowrap transition',
                            selectedCategory === category.name
                                ? 'bg-green-600 text-white'
                                : 'border-green-600 text-green-600'
                        ]">
                        {{ category.name }}
                    </button>

                </div>
            </div>
            <div v-if="isLoading" class="flex justify-center items-center h-[60vh]">
                <ClipLoader :loading="true" color="#16a34a" />
            </div>

            <div v-else class="overflow-y-auto h-full no-scrollbar border border-green-100 py-3 rounded-xl bg-white px-2">
                <div class="flex flex-col overflow-y-auto">
                    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-10">
                        <RouterLink to="" v-for="food in products" :key="food.id"
                            class="shadow-md shadow-slate-100 rounded-2xl flex flex-col justify-between">
                            <div class="w-full relative  h-40 rounded-2xl">
                                <img :src="food.img_product" :alt="food.name"
                                    class="w-full h-full rounded-2xl object-cover">
                                <button class="absolute top-0 right-0 p-2">
                                    <Heart class="text-white" />
                                </button>
                            </div>
                            <div class="flex flex-col gap-3 p-2">
                                <h1 class="font-bold text-md">{{ food.name }}</h1>

                                <div v-if="food.discount" class="bg-green-600 w-fit px-3 rounded-2xl">
                                    <p class="text-sm font-bold text-white">discount {{ food.discount }}</p>
                                </div>
                                <div>
                                    <p class="text-xl text-emerald-400 font-bold">{{ food.price }}</p>
                                </div>
                                <div>
                                    <p class="text-sm">{{ food.delivery_time }}</p>
                                </div>
                                <div v-if="cartStore.quantity(food.id) === 0">
                                    <button @click.prevent="cartStore.addToCart(food)"
                                        class="bg-linear-to-tl from-purple-900 to-purple-500 cursor-pointer flex items-center justify-center py-2 gap-2 rounded-md text-white font-bold w-full">
                                        <ShoppingCart :size="18" />
                                        Savatcha
                                    </button>
                                </div>

                                <div v-else
                                    class="flex items-center justify-between bg-purple-700 rounded-md overflow-hidden text-white">
                                    <button @click.prevent="cartStore.decrease(food.id)"
                                        class="px-4 py-2 hover:bg-purple-800 transition cursor-pointer">
                                        -
                                    </button>

                                    <span class="font-bold text-lg">
                                        {{ cartStore.quantity(food.id) }}
                                    </span>

                                    <button @click.prevent="cartStore.increase(food.id)"
                                        class="px-4 py-2 hover:bg-purple-800 transition cursor-pointer">
                                        +
                                    </button>
                                </div>
                            </div>
                        </RouterLink>
                    </div>

                </div>
            </div>
        </div>
        <div class="hidden lg:block">
            <ShopCart 
            :value="id"  />
        </div>
    </div>
</template>
