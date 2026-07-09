<script setup lang="ts">
import { useQueryServiceAuth } from "@/service/authenticated/useQueryServiceAuth";
import Cookies from "js-cookie";
import { Clock } from "lucide-vue-next";
const { useGetMyOrdersByCustomerId } =
    useQueryServiceAuth();

const customer_id = Cookies.get("userId")
const { data: ordersData } = useGetMyOrdersByCustomerId(Number(customer_id));

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

const badgeClass = (status: string) => {
    switch (status) {
        case "CREATED":
            return "bg-green-100 text-green-700";

        case "CONFIRMED":
            return "bg-green-100 text-green-700";

        case "PREPARING":
            return "bg-orange-100 text-orange-700";

        case "READY":
            return "bg-blue-100 text-blue-700";

        case "DELIVERED":
            return "bg-gray-200 text-gray-700";

        default:
            return "bg-slate-100 text-slate-700";
    }
};
</script>

<template>
    <div class="flex flex-col gap-6 mt-4">
        <div>
            <p class="text-2xl">Buyurtmalarim</p>
        </div>
        <div v-if="ordersData?.length > 0" v-for="order in ordersData" :key="order.id"
            class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

            <div class="flex items-center gap-2 text-slate-500 mb-5">
                <Clock class="w-5 h-5" />
                <span>{{ formatDate(order.createdAt) }}</span>
            </div>

            <div class="flex flex-wrap gap-3">

                <div v-for="item in order.items" :key="item.id"
                    class="flex overflow-hidden rounded-xl border border-slate-200">
                    <img :src="item.imgUrl" class="w-24 h-24 object-cover" />

                    <div class="px-4 py-2">
                        <h3 class="font-bold">
                            {{ item.name }}
                        </h3>

                        <p class="text-green-600 font-bold">
                            {{ item.price }} so'm
                        </p>

                        <p class="text-slate-500">
                            {{ item.qty }} ta
                        </p>
                    </div>
                </div>

            </div>

            <div class="mt-5 flex items-center justify-between">

                <div>

                    <p :class="[
                        'px-3 py-1 rounded-full text-sm font-semibold w-fit',
                        badgeClass(order.status),
                    ]">
                        {{ order.status }}
                    </p>

                    <p class="text-2xl font-bold mt-3">
                        {{ order.totalPrice }} so'm
                    </p>

                </div>

            </div>

        </div>
        <div v-else class="flex-1 flex flex-col items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>

            <p class="text-lg font-semibold">
                Buyurtmalar Yo'q 
            </p>

            <p class="text-sm text-gray-400 mt-1">
                Buyurtmalar mavjud emas
            </p>
        </div>

    </div>
</template>

<style scoped></style>