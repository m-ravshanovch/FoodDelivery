<script setup lang="ts">
import { useCartStore } from '@/stores/card';
import { storeToRefs } from 'pinia';
import { useQueryService } from '@/service/unauthenticated/useQueryService';
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { computed, ref } from 'vue';
import { useQueryServiceAuth } from '@/service/authenticated/useQueryServiceAuth';
import { SkewLoader } from 'vue-spinner';
import type { LeafletMouseEvent } from 'leaflet';
import Cookies from 'js-cookie';
const { useCreateOrder } = useQueryServiceAuth();
const cartStore = useCartStore()
const mapUrl = ref("");
const restaurantId = localStorage.getItem('restaurantId');
const { useRestaurantById } = useQueryService();
const { cart, totalPrice, totalItems } = storeToRefs(cartStore)
const { data: restaurantData } = useRestaurantById(restaurantId ?? '');
const zoom = ref(13);

const center = ref<[number, number]>([
    41.3111,
    69.2797,
]);

const marker = ref<[number, number]>([
    41.3111,
    69.2797,
]);
const handleClick = (e: LeafletMouseEvent) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    marker.value = [lat, lng];

    console.log({
        latitude: lat,
        longitude: lng,
    });

    mapUrl.value = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=18/${lat}/${lng}`;

    console.log(mapUrl.value);
};


const { mutateAsync: createOrder } = useCreateOrder();
const orderItems = computed(() => {
    return cart.value.map(item => ({
        menuItemId: item.id,
        name: item.name,
        qty: cartStore.quantity(item.id),
        price: item.new_price ? item.new_price : item.price
    }));
});

const loading = ref(false);

const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));



const handleMove = async () => {
    loading.value = true;
    const payload = {
        restaurantName: restaurantData?.value.name,
        restaurantId: localStorage.getItem("restaurantId"),
        items: orderItems.value,
        deliveryAddress:mapUrl?.value,
        customerFullName: Cookies.get("name"),
        restaurantAddress : restaurantData?.value.address
    };

    console.log("Order payload:", payload);

    try {
        const [res] = await Promise.all([
            createOrder(payload),
            sleep(3000),
        ]);

        console.log(res);

        cartStore.clearCart();
        localStorage.removeItem("restaurantId");

        // router.push("/success");
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class=" flex flex-col items-center gap-y-2   rounded-xl justify-between p-2">
        <Transition name="fade">
            <div v-if="loading"
                class="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div class="bg-white rounded-2xl px-10 py-8 shadow-2xl flex flex-col items-center gap-5">
                    <SkewLoader color="#16a34a" />

                    <p class="text-lg font-semibold">
                        Buyurtma rasmiylashtirilmoqda...
                    </p>

                    <p class="text-sm text-zinc-500">
                        Iltimos, kuting.
                    </p>
                </div>
            </div>
        </Transition>
        <div
            class="w-full bg-white flex flex-col md:flex-row  items-center gap-x-3 rounded-xl shadow-xl shadow-slate-100 p-2">
            <p class=" flex gap-x-2">Savatchangiz,<span class="font-bold"> {{ totalItems }} mahsulot </span></p>

        </div>
        <div class="flex flex-col md:flex-row  w-full  justify-center md:justify-between gap-x-3 ">
            <div class="flex w-full h-120 flex-col ">
                <div v-if="cart.length > 0" class=" flex flex-col overflow-y-auto p-2 gap-y-5">
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
                <div v-else class="flex-1 flex flex-col items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mb-3 text-gray-300" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
                    </svg>

                    <p class="text-lg font-semibold">
                        Buyurtma qo'shilmagan
                    </p>

                    <p class="text-sm text-gray-400 mt-1">
                        Savatdan mahsulot tanlang
                    </p>
                </div>
            </div>
            <div class="bg-white w-80 h-fit flex shadow-xl shadow-slate-300 rounded-xl flex-col gap-y-5 p-4">
                <div class="flex flex-col gap-y-2">
                    <p class="text-md font-bold">Buyurtmangiz:</p>
                    <div class="flex justify-between text-zinc-500">
                        <p>{{ totalItems }} mahsulotlar</p>
                        <p class="font-bold">{{ totalPrice }} so'm</p>
                    </div>
                </div>
                <LMap style="height:200px" class="z-2" :zoom="zoom" :center="center" @click="handleClick">
                    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <LMarker :lat-lng="marker" />
                </LMap>
                <div class="flex flex-col gap-y-2">
                    <p class="text-md font-bold">Restoran:</p>
                    <div>
                        <p class="text-zinc-400 font-bold uppercase">{{ restaurantData?.name }}</p>
                    </div>
                </div>

                <div class="flex flex-col gap-y-2">
                    <p class="text-md font-bold">Karta Malumotlari:</p>
                    <div class="flex  gap-x-2">
                        <input type="text" placeholder="9999 9999 9999 9999"
                            class=" border p-1 w-80 rounded-md border-slate-300 outline-green-400">
                        <input type="text" placeholder="10/30"
                            class="w-20 border p-1 rounded-md border-slate-300 outline-green-400 ">
                    </div>
                </div>
                <button @click.prevent="handleMove"
                    class="w-full cursor-pointer bg-green-600 py-2 text-sm rounded-md font-bold text-white">
                    Rasmiylashtirishga o'tish
                </button>
            </div>
        </div>

    </div>
</template>

<style scoped></style>