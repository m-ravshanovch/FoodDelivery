<script setup lang="ts">
import { useCartStore } from '@/stores/card';
import { storeToRefs } from 'pinia';
import { useRestaurantStore } from "@/stores/restaurant";
import { useRouter } from "vue-router";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { ref } from 'vue';

const { value } = defineProps<{
    value: string;
}>();
console.log("ShopCart value:", value);

const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
const router = useRouter();
const cartStore = useCartStore()
const { cart, totalPrice, } = storeToRefs(cartStore)
const restaurantStore = useRestaurantStore();
const loading = ref(false)


const handleMove = async () => {
    if (cart.value.length === 0) {
        alert("Savat bo'sh, iltimos mahsulot qo'shing.");
        return;
    }
    loading.value = true

    restaurantStore.setRestaurantId(value);
    await delay(1000);
    router.push(`/orderPage`);
};
</script>

<template>
    <div class=" flex flex-col w-90 h-120 p-2 bg-white border border-slate-200 rounded-xl justify-between">
        <div class="flex h-full flex-col">
            <div class="p-2">
                <p class="font-bold text-xl">Shopping Cart</p>
            </div>
            <div v-if="cart.length > 0" class="p-2 flex flex-col gap-y-5 overflow-y-auto">
                <div v-for="item in cart"
                    class="flex bg-white border-b py-2 border-slate-200 justify-between items-center gap-x-2">
                    <div class="flex flex-col gap-x-2">
                        <img :src="item.img_product" :alt="item.name" class="w-15 h-15 object-cover rounded-xl">
                    </div>
                    <div>
                        <p>{{ item.name }}</p>

                        <p class="font-bold">{{ item.new_price ? item.new_price : item.price }}</p>
                    </div>

                    <div>
                        <button @click.prevent="cartStore.decrease(item.id)" class="px-4 py-2   cursor-pointer">
                            -
                        </button>

                        <span class="font-bold ">
                            {{ cartStore.quantity(item.id) }}
                        </span>

                        <button @click.prevent="cartStore.increase(item.id)" class="px-4 py-2   cursor-pointer">
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div v-else class="flex-1 flex flex-col items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mb-3 text-gray-300" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
                </svg>

                <p class="text-lg font-semibold">
                    Mahsulot qo'shilmadi
                </p>

                <p class="text-sm text-gray-400 mt-1">
                    Savatdan mahsulot tanlang
                </p>
            </div>
        </div>
        <div>
            <button @click="handleMove"
                class="bg-linear-to-tl flex cursor-pointer hover:opacity-80  transition-all duration-300 justify-center gap-x-2 from-green-900 to-green-500 rounded-md text-white w-full py-2">
                <div v-if="loading" class="">
                    <PulseLoader :loading="true" />
                </div>
                <div v-else class="flex gap-x-2">
                    <p>Keyingi</p>
                    <p>{{ totalPrice }} so'm</p>
                </div>
            </button>
        </div>
    </div>
</template>

<style scoped></style>