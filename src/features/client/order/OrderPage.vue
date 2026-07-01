<script setup lang="ts">
import { useCartStore } from '@/stores/card';
import { storeToRefs } from 'pinia';
import { useQueryService } from '@/service/unauthenticated/useQueryService';
import { ChefHat } from 'lucide-vue-next';
const cartStore = useCartStore()
const { useRestaurantById } = useQueryService();
const { cart, totalPrice, totalItems } = storeToRefs(cartStore)
const { data: restaurantData } = useRestaurantById(localStorage.getItem('restaurantId') || '');
</script>

<template>
    <div class=" flex flex-col items-center gap-y-2   rounded-xl justify-between p-2">
        <div class="w-full bg-white flex flex-col md:flex-row  items-center gap-x-3 rounded-xl shadow-xl shadow-slate-100 p-2">
            <p class="text-xl flex gap-x-2">Savatchangiz,<span class="font-bold"> {{ totalItems }} mahsulot </span></p>
            <div class="flex  items-center ">
                /
                <ChefHat class="ml-2"/>
                <p class="text-orange-400">{{ restaurantData?.name }}</p>
            </div>
        </div>
        <div class="flex flex-col md:flex-row  w-full  justify-center md:justify-between gap-x-3 ">
            <div class="flex w-full h-120 flex-col ">
                <div class=" flex flex-col overflow-y-auto p-2 gap-y-5">
                    <div v-for="item in cart"
                        class="flex bg-white shadow-md py-2 rounded-xl justify-between items-center px-2 gap-x-2">
                        <div class="flex  gap-x-2">
                            <div class="flex flex-col gap-x-2">
                                <img :src="item.img_product" :alt="item.name" class="w-15 h-15 object-cover rounded-xl">
                            </div>
                            <div>
                                <p>{{ item.name }}</p>

                                <p class="font-bold">{{ item.new_price ? item.new_price : item.price }}</p>
                            </div>
                        </div>

                        <div>
                            <button @click.prevent="cartStore.decrease(item.id)" class="px-4 py-2  cursor-pointer">
                                -
                            </button>

                            <span class="font-bold ">
                                {{ cartStore.quantity(item.id) }}
                            </span>

                            <button @click.prevent="cartStore.increase(item.id)" class="px-4 py-2  cursor-pointer">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white w-80 h-fit flex shadow-xl shadow-slate-300 rounded-xl flex-col gap-y-5 p-2">
                <div class="flex flex-col gap-y-2">
                    <p>Buyurtmangiz:</p>
                    <div class="flex justify-between text-zinc-500">
                        <p>{{ totalItems }} mahsulotlar</p>
                        <p class="font-bold">{{ totalPrice }} so'm</p>
                    </div>
                </div>
                <div class="flex flex-col gap-y-2">
                    <p>Karta Malumotlari:</p>
                    <div class="flex  gap-x-2">
                        <input type="text" placeholder="9999 9999 9999 9999" class=" border p-1 w-80 rounded-md border-slate-300 outline-green-400">
                        <input type="text" placeholder="10/30" class="w-20 border p-1 rounded-md border-slate-300 outline-green-400 ">
                    </div>
                </div>
                <button class="w-full bg-green-600 py-2 text-sm rounded-md font-bold text-white">
                    Rasmiylashtirishga o'tish
                </button>
            </div>
        </div>

    </div>
</template>

<style scoped></style>