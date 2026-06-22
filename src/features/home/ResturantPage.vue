<script setup lang="ts">
import { useRoute } from "vue-router";
import { data } from "@/fakeData/fakeResturants";
import { computed} from "vue";
import { foods } from "@/fakeData/fakeFoods";
import { ArrowLeft, Phone, Zap, ChevronRight, ShoppingCart } from "lucide-vue-next";
import {shoppingCart} from "@/fakeData/fakeShoppingCart"
const route = useRoute();

const id = String(route.params.id);

const restaurant = computed(() =>
    data.find(
        (item) => String(item.id) === id
    )
);


const resturantFoods = computed(() =>
    foods.filter(food => food.restaurantUniqueId === restaurant.value?.uniqueId)
)
const resturantDfFoods = computed(() =>
    foods.filter(food => food.restaurantUniqueId === restaurant.value?.uniqueId && food.status===false)
)
const promotionFoods = computed(() =>
    resturantFoods.value.filter(food => food.status)
)
const handleCartClick = (id:number) =>{
    try{
        const food =foods.find((item)=>item.id===id)
        shoppingCart.value.push(food)
    }catch(error){
        console.log("Hato");
    }
}
console.log(shoppingCart.value)
</script>

<template>
    <div class="flex flex-col gap-y-10 mt-3 p-2 bg-white rounded-md">
        <div class="bg-white flex items-center justify-between py-2 px-2 rounded-md">
            <div class="flex items-center gap-x-1">
                <RouterLink to="/">
                    <ArrowLeft :size="18" />
                </RouterLink>
                <h1 class="font-bold text-fuchsia-900 text-2xl font-serif">{{ restaurant?.name }}</h1>
            </div>
            <div>
                <h1 class="font-semibold flex items-center gap-2">
                    <Phone :size="18" />{{ restaurant?.phone }}
                </h1>
            </div>
        </div>
        <div class=" relative flex items-center justify-center">
            <img :src="restaurant?.brandImage" :alt="restaurant?.name" class="w-full h-80 object-cover  rounded-2xl">
            <p class="absolute text-5xl md:text-8xl font-serif font-bold text-white">{{ restaurant?.name }}</p>
        </div>
        <div class="flex flex-col gap-y-2">
            <div class=" p-2 rounded-md">
                <h1 class="text-2xl font-bold flex items-center text-black">WOW Aksiyalar
                    <ChevronRight />
                </h1>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-10">
                <RouterLink to="" v-for="food in promotionFoods" :key="food.id"
                    class="shadow-md shadow-slate-100 rounded-2xl">
                    <div class="w-full h-60 rounded-2xl">
                        <img :src="food.image" :alt="food.name" class="w-full h-full rounded-2xl object-cover">
                    </div>
                    <div class="flex flex-col gap-3 p-2">
                        <h1 class="font-serif font-bold text-2xl">{{ food.name }} </h1>
                        <div class="flex gap-x-2">
                            <p class="font-mvboli line-through">{{ food.price }}</p>
                            <p>{{ food.newPrice }} so'm </p>
                        </div>
                        <p class="flex gap-x-1 text-sm">
                            <Zap :size="18" />{{ food.description }}
                        </p>
                        <div class="flex gap-x-2">
                            <div class="bg-green-600 w-fit px-3 rounded-2xl">
                                <p class="text-sm font-bold text-white">discount {{ food.discount }}</p>
                            </div>
                            <div class="bg-yellow-600 w-fit px-3 rounded-2xl">
                                <p class="text-sm font-bold text-white"> {{ food.promotion }}</p>
                            </div>
                        </div>
                        <button @click.prevent="handleCartClick(food.id)" class="bg-linear-to-tl from-purple-900 to-purple-500 cursor-pointer flex items-center justify-center py-1 gap-2 rounded-md text-white font-bold">
                            <ShoppingCart /> Savatcha
                        </button>
                    </div>
                </RouterLink>
            </div>
        </div>
        <div class="flex flex-col">
            <div class="p-2 rounded-md">
                <h1 class="text-2xl font-bold flex items-center text-black">Mahsulotlar
                    <ChevronRight />
                </h1>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-10">
                <RouterLink to="" v-for="food in resturantDfFoods" :key="food.id"
                    class="shadow-md shadow-slate-100 rounded-2xl flex flex-col justify-between">
                    <div class="w-full h-60 rounded-2xl">
                        <img :src="food.image" :alt="food.name" class="w-full h-full rounded-2xl object-cover">
                    </div>
                    <div class="flex flex-col gap-3 p-2">
                        <h1 class="font-serif font-bold text-2xl">{{ food.name }}</h1>
                        <p class="flex gap-x-1 text-sm">
                            <Zap :size="18" />{{ food.description }}
                        </p>
                        <div v-if="food.discount" class="bg-green-600 w-fit px-3 rounded-2xl">
                            <p class="text-sm font-bold text-white">discount {{ food.discount }}</p>
                        </div>
                        <button @click.prevent="handleCartClick(food.id)"s class="bg-linear-to-tl from-purple-900 to-purple-500 cursor-pointer flex items-center justify-center py-1 gap-2 rounded-md text-white font-bold">
                            <ShoppingCart /> Savatcha
                        </button>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
