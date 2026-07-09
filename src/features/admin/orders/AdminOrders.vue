<script setup lang="ts">
import { useQueryServiceAuth } from "@/service/authenticated/useQueryServiceAuth";
import { Clock } from "lucide-vue-next";

const { useOrdersByRestaurantId, useChangeOrderStatus } =
    useQueryServiceAuth();

const restaurantId = localStorage.getItem("restaurantId");

const { data: ordersData } = useOrdersByRestaurantId(restaurantId ?? "");

const { mutateAsync, isPending } = useChangeOrderStatus();

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

const handleChangeStatus = async (status: string, id: string) => {
    try {
        await mutateAsync({
            status,
            id,
        });
    } catch (error) {
        console.log(error);
    }
};

const nextStatus = (status: string) => {
    switch (status) {
        case "CREATED":
            return {
                value: "CONFIRMED",
                text: "✅ Confirm Order",
                buttonClass: "bg-green-600 hover:bg-green-700",
            };

        case "CONFIRMED":
            return {
                value: "PREPARING",
                text: "👨‍🍳 Start Preparing",
                buttonClass: "bg-orange-500 hover:bg-orange-600",
            };

        case "PREPARING":
            return {
                value: "READY",
                text: "📦 Mark as Ready",
                buttonClass: "bg-blue-600 hover:bg-blue-700",
            };

        default:
            return null;
    }
};

const badgeClass = (status: string) => {
    switch (status) {
        case "PENDING":
            return "bg-yellow-100 text-yellow-700";

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
    <div class="flex flex-col gap-6">

        <div v-if="ordersData?.length > 0" v-for="order in ordersData" :key="order.id"
            class="bg-white rounded-2xl border flex flex-col  gap-5 border-slate-200 shadow-sm p-5">

            <div class="flex items-center gap-2 text-slate-500 ">
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
            <div class=" flex flex-col gap-5 md:flex-row  justify-between">
                <div class="flex flex-row gap-3 md:flex-col items-center md:items-start">
                    <p :class="[
                        'px-3 py-1 rounded-full text-sm font-semibold w-fit',
                        badgeClass(order.status),
                    ]">
                        {{ order.status }}
                    </p>

                    <p class="text-2xl font-bold ">
                        {{ order.totalPrice }} so'm
                    </p>

                </div>
                <div class="w-full md:w-fit">
                    <button v-if="nextStatus(order.status)" :disabled="isPending" @click="
                        handleChangeStatus(
                            nextStatus(order.status)!.value,
                            order.id
                        )
                        ":class="[nextStatus(order.status)!.buttonClass,'text-white w-full px-5 py-2 rounded-xl transition cursor-pointer font-semibold']">
                        {{ nextStatus(order.status)!.text }}
                    </button>

                    <div v-else class="bg-green-100 text-green-700 px-5 py-2 rounded-xl font-semibold">
                        ✅ Delivered
                    </div>
                </div>

            </div>

        </div>

        <div v-else class=" flex flex-col  h-screen items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>

            <p class="text-lg font-semibold">
                Buyurtma yo'q
            </p>

            <p class="text-sm text-gray-400 mt-1">
                Buyurtmalar Mavjud Emas
            </p>
        </div>

    </div>
</template>

<style scoped></style>