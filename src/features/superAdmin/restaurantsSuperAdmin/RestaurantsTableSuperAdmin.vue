<script setup lang="ts">
import { EllipsisVertical,  MapPin, Trash, Pencil } from 'lucide-vue-next';
import { ref } from 'vue';
import { useQueryService } from '@/service/unauthenticated/useQueryService';
import { useQueryServiceAuth } from '@/service/authenticated/useQueryServiceAuth';

const { useRestaurants } = useQueryService()
const { useDeleteRestaurant } = useQueryServiceAuth()
const { mutateAsync } = useDeleteRestaurant()
const { data: restaurantsData } = useRestaurants();
console.log("restaurant:", restaurantsData?.value)
const openedMenu = ref<number | null>(null);
const handleOpen = (id: number) => {
    openedMenu.value = openedMenu.value === id ? null : id;
};

const handleDelete = async (uuid: string) => {
    try {
        alert("Bu Restarantni O'chirmoqchimsiz?")
        openedMenu.value = null
        await mutateAsync(uuid)
    } catch (error) {
        console.log("Error:", error)
    }
}



</script>

<template>
    <div class="border flex flex-col   border-slate-300 rounded-md  bg-white">
        <div class="flex  justify-between rounded-t-md  bg-slate-500 md:items-center px-2 py-2">
            <div class="flex gap-x-5 text-white">
                <p class="font-bold  text-lg">Restaurants</p>
            </div>
        </div>
        <div class=" overflow-x-auto">
            <table class="w-full text-sm">
                <thead class="bg-gray-100 border-b border-slate-300">
                    <tr>
                        <th class="px-4 py-3 text-left">Image</th>
                        <th class="px-4 py-3 text-left">Name</th>
                        <th class="px-4 py-3 text-left">Map</th>
                        <th class="px-4 py-3 text-left">Owner Id</th>
                        <th class="px-4 py-3 text-left"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr  v-for="restaurant in restaurantsData" :key="restaurant.id"
                        class="border-b cursor-pointer border-slate-300 hover:bg-gray-50 transition">
                        <td class="px-4 py-3 flex w-20 overflow-x-auto">
                            <img :src="restaurant.restaurant_img" :alt="restaurant.id" class="w-20 h-10 rounded-full">
                        </td>
                        <td class="px-4 py-3">{{ restaurant.name }}</td>

                        <td class="px-4 py-3 ">
                            <a :href="restaurant.address" target="_blank" class="flex gap-x-2 items-center">
                                <MapPin :size="18" class="text-red-500" />location
                            </a>
                        </td>
                        <td class="px-4 py-3">{{ restaurant.owner_user_id }}</td>
                        <td class="relative">
                            <button @click.stop="handleOpen(restaurant.id)"
                                class="p-1 rounded-full hover:bg-slate-100 transition cursor-pointer">
                                <EllipsisVertical :size="18" />
                            </button>
                            <Transition enter-active-class="transition-all duration-200 ease-out"
                                enter-from-class="opacity-0 scale-95 -translate-y-2"
                                enter-to-class="opacity-100 scale-100 translate-y-0"
                                leave-active-class="transition-all duration-150 ease-in"
                                leave-from-class="opacity-100 scale-100 translate-y-0"
                                leave-to-class="opacity-0 scale-95 -translate-y-2">
                                <div v-if="openedMenu === restaurant.id"
                                    class="absolute right-4 top-10 z-50 w-44 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                                    <button @click="handleDelete(restaurant.id)"
                                        class="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-sm hover:bg-red-50 hover:text-red-600 transition">
                                        <Trash :size="16" />
                                        Delete Restaurant
                                    </button>

                                    <button
                                        class="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 transition">
                                        <Pencil :size="16" />
                                        Edit Restaurant
                                    </button>
                                </div>
                            </Transition>
                        </td>
                    </tr>

                    <tr v-if="restaurantsData?.length === 0">
                        <td colspan="6" class="py-8 text-center text-gray-500">
                            No users found
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>