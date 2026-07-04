<script setup lang="ts">
import { useQueryService } from '@/service/unauthenticated/useQueryService';

const {} = useQueryService()
</script>

<template>
    <div class="bg-white p-4 shadow-xl shadow-slate-200 rounded-md border border-slate-200">
        <div class="flex flex-col gap-y-2">
            <label for="category" class="text-sm font-bold">Menu Category Name</label>
            <div class="flex gap-x-2">
                <input id="category"  type="text" placeholder="Enter category name"  class="border rounded-md outline-green-300 border-slate-300 px-2">
                <button class="bg-green-500 text-white cursor-pointer hover:bg-green-600 transition-all duration-300 px-4 py-1 rounded">Create Category</button>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<style scoped></style>