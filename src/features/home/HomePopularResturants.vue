<script setup lang="ts">
import { data } from "@/fakeData/fakeResturants"
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Zap } from "lucide-vue-next";
const brands = ref(data)
</script>

<template>
    <div class="bg-white p-5">
        <div class="py-5 flex items-center justify-between">
            <h1 class="font-bold text-2xl">Popular restaurats</h1>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 ">
            <RouterLink :to="`/${brand.id}`" v-for="brand in brands" :key="brand.id" class="shadow-md shadow-slate-100 rounded-2xl">
                <div class="w-full h-60 rounded-2xl">
                    <img :src="brand.brandImage" :alt="brand.name" class="w-full h-full rounded-2xl object-cover">
                </div>
                <div class="flex flex-col gap-3 p-2">
                    <h1 class="font-serif font-bold text-2xl">{{ brand.name }}</h1>
                    <p class="flex gap-x-1 text-sm"><Zap :size="18"/>{{ brand.deliveryTime }}</p>
                    <div class="bg-green-600 w-fit px-3 rounded-2xl">
                        <p class="text-sm font-bold text-white">discount {{ brand.popularDiscount }}</p>
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped></style>