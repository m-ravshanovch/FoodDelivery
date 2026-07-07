<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import { useQueryService } from '@/service/unauthenticated/useQueryService';


const { useProductsByRestaurantId } = useQueryService()
const restaurantId = localStorage.getItem("restaurantId")


const { data: productsData } = useProductsByRestaurantId(restaurantId ?? '')

console.log(productsData.value)
</script>

<template>
    <div class="px-2 shadow-md shadow-green-200 flex flex-col gap-y-4 ">
        <div
            class="bg-white py-2 shadow-md shadow-green-200 rounded-xl border border-slate-200 px-2 flex items-center justify-between">
            <select name="type" id="" class="outline-slate-200 px-2">
                <option value="">Toam Turi</option>
                <option value="FastFood">Fast Food</option>
                <option value="FastFood">Milliy Toam</option>
                <option value="FastFood">Shirinlik</option>
                <option value="FastFood">Ichimlik</option>
            </select>
            <RouterLink to="/admin/addProduct" class="bg-green-600 px-2 rounded-2xl cursor-pointer text-white py-1">
                <Plus />
            </RouterLink>
        </div>
        <div class="overflow-x-auto bg-white rounded-2xl border border-slate-200 p-5">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-slate-200 text-slate-600">
                        <th class="text-left py-3">ID</th>
                        <th class="text-left py-3">Image</th>
                        <th class="text-left py-3">Name</th>
                        <th class="text-left py-3">Price</th>
                        <th class="text-left py-3">New Price</th>
                        <th class="text-left py-3">Promotion</th>
                    </tr>
                </thead>


                <tbody v-if="productsData && productsData.length > 0">
                    <tr v-for="food in productsData" :key="food.id"
                        class="border-b border-slate-100 hover:bg-slate-50 transition">
                        <td class="py-4 font-medium">
                            #{{ food.id }}
                        </td>

                        <td class="p-2">
                            <img :src="food.img_product" :alt="food.name" class="w-40 h-20 object-cover rounded-2xl">
                        </td>

                        <td>{{ food.name }}</td>

                        <td>{{ food.price }}</td>

                        <td>{{ food.newPrice }}</td>

                        <td>{{ food.promotion }}</td>
                    </tr>
                </tbody>

                <tbody v-else>
                    <tr>
                        <td colspan="6" class="py-12">
                            <div class="flex flex-col items-center justify-center text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 mb-4 text-slate-300"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M20 13V7a2 2 0 00-2-2h-3V3H9v2H6a2 2 0 00-2 2v6m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" />

                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M9 10h6" />
                                </svg>

                                <p class="text-lg font-semibold text-slate-500">
                                    Mahsulot mavjud emas
                                </p>

                                <p class="text-sm text-slate-400 mt-1">
                                    Hozircha ushbu restoran uchun mahsulot qo'shilmagan.
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>