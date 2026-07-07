<script setup lang="ts">
import { useQueryService } from '@/service/unauthenticated/useQueryService';
import { useQueryServiceAuth } from '@/service/authenticated/useQueryServiceAuth';
import { ref } from 'vue';
const name = ref('')
const { useCreateCategoryByResturant } = useQueryServiceAuth()
const { useDeleteCategory } = useQueryServiceAuth()
const { mutateAsync: deleteCategory } = useDeleteCategory();
const { mutateAsync } = useCreateCategoryByResturant()
const loading = ref(false)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const handleCreateCategory = async () => {
    loading.value = true
    try {
        const data = {
            restaurant: localStorage.getItem("restaurantId") ?? '',
            name: name.value
        }
        
        await delay(1000)
        await mutateAsync(data)
        name.value=""
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const handleDeleteCategory=(id:number)=>{
    try{
         deleteCategory(id)
    }catch(error){
        console.log(error)
    }
}
const restaurantId = localStorage.getItem("restaurantId")
const { useCategoriesByRestaurantId } = useQueryService()
const { data: categories } = useCategoriesByRestaurantId(restaurantId ?? '')
</script>

<template>
    <div class="bg-white p-4 shadow-xl shadow-slate-200 rounded-md border border-slate-200">
        <div class="flex flex-col gap-y-4">
            <label for="category" class="text-sm font-bold">Menu Category Name</label>
            <div class="flex gap-x-2">
                <input id="category" v-model="name" type="text" placeholder="Enter category name"
                    class="border rounded-md outline-green-700 border-slate-300 px-2">
                <button @click="handleCreateCategory"
                    class="bg-green-500 text-white cursor-pointer hover:bg-green-600 transition-all duration-300 px-4 py-1 rounded">
                    <p v-if="loading">Creating..</p>
                    <p v-else>Create Category</p>
                </button>
            </div>
        </div>
        <div class="flex flex-col mt-3">
            <div v-if="categories?.length > 0" class="flex gap-x-2">
                <div  v-for="category in categories" :key="category.id" class="text-green-600 px-3 flex items-center gap-x-2 rounded-md border border-green-700">
                    <p>{{ category.name }}</p> 
                    <button @click="handleDeleteCategory(category.id)" class="py-1 items-center text-red-700 cursor-pointer">X</button>
                </div>
            </div>
            <div v-else class="flex-1 flex flex-col items-center justify-center  text-gray-400">


                <p class="text-lg font-semibold">
                    Category qo'shilmadi
                </p>

                <p class="text-sm text-gray-400 mt-1">
                    Yuqoridan Category qo'shing
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>