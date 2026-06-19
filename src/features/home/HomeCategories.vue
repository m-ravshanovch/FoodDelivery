<script setup lang="ts">
import { categories } from '@/fakeData/fakeCategories';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const types = ref(categories)
</script>

<template>
    <div class="bg-white pt-5">
        
        <div class="flex overflow-x-auto bg-gray-900">
            <RouterLink to="" v-for="type in types" class="p-3  whitespace-nowrap text-white rounded-md w-fit">
                <p class="">{{ type.name }}</p>
            </RouterLink>
        </div>
    </div>
</template>



<style scoped></style>