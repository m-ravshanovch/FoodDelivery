<script setup lang="ts">
import { foods } from '@/fakeData/fakeFoods';
import { computed} from 'vue';
import { Plus } from 'lucide-vue-next';
const data = computed(()=>
  foods.filter((item)=>item.restaurantUniqueId==="maxway")
)
</script>

<template>
    <div class="px-2 shadow-md shadow-green-200 flex flex-col gap-y-4 ">
        <div class="bg-white py-2 shadow-md shadow-green-200 rounded-xl border border-slate-200 px-2 flex items-center justify-between">
            <select name="type" id="" class="outline-slate-200 px-2">
                <option value="">Toam Turi</option>
                <option value="FastFood" >Fast Food</option>
                <option value="FastFood" >Milliy Toam</option>
                <option value="FastFood" >Shirinlik</option>
                <option value="FastFood" >Ichimlik</option>
            </select>
            <RouterLink to="/admin/addProduct" class="bg-green-600 px-2 rounded-2xl cursor-pointer text-white py-1">
                 <Plus/>
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

                <tbody>
                    <tr v-for="food in data" :key="food.id"
                        class="border-b border-slate-100 hover:bg-slate-50 transition">
                        <td class="py-4 font-medium">
                            #{{ food.id }}
                        </td>

                        <td class="p-2">
                            <img :src="food.image" :alt="food.name" class="w-40 h-20 object-cover rounded-2xl">
                        </td>

                        <td>{{ food.name}}</td>

                        <td>{{ food.price }}</td>

                        <td>{{ food.newPrice }}</td>
                        <td>{{ food.promotion }}</td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>