<script setup lang="ts">

import { useQueryService } from "@/service/unauthenticated/useQueryService";
import Cookies from "js-cookie";
import { useRestaurantStore } from "@/stores/restaurant";
import { useRouter } from "vue-router";
import SkewLoader from "vue-spinner/src/SkewLoader.vue";
const router = useRouter()
const restaurantStore = useRestaurantStore();
const ownerId = Cookies.get("userId")
const { useRestaurantsByOwnerId } = useQueryService()
const { data: restaurants, isLoading } = useRestaurantsByOwnerId(Number(ownerId))


const handleNavigate = (restaurant_id: string) => {
    restaurantStore.setRestaurantId(restaurant_id)
    router.push('/admin')
}
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen gap-y-3">
        <div>
            <p class=" font-bold text-xl">Choose Restaurant</p>
        </div>
        <div class="flex flex-col gap-y-2">
            <div class="flex flex-col gap-y-2 h-40 overflow-y-auto">

                <div v-if="isLoading" class="flex justify-center py-5">
                    <SkewLoader :loading="true" color="#16a34a"  />
                </div>

                <template v-else-if="restaurants?.length">
                    <button v-for="restaurant in restaurants" :key="restaurant.id"
                        @click="handleNavigate(restaurant.id)"
                        class="px-10 text-black font-semibold rounded-md shadow-md border w-60 py-1 border-slate-200 shadow-slate-200 cursor-pointer">
                        {{ restaurant.name }}
                    </button>
                </template>

                <div v-else class="text-center py-5 text-gray-500">
                    Restaurant topilmadi
                </div>

            </div>
            <RouterLink to="/staff-auth/addRestaurant"
                class="flex justify-center gap-x-2 px-10 border py-1 border-gray-200 bg-green-700 text-white  font-semibold  rounded-md shadow-md shadow-slate-200 cursor-pointer">
                +
            </RouterLink>
        </div>
    </div>
</template>

<style scoped></style>