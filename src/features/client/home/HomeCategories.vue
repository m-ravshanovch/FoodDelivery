<script setup lang="ts">
// import { categories } from '@/fakeData/fakeCategories';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useQueryService } from '@/service/unauthenticated/useQueryService';
// const types = ref(categories)


const {useCategories}=useQueryService()

const {data} = useCategories()
const types = ref(data)
</script>

<template>
    <div class="bg-white pt-5">
        
        <div class="flex overflow-x-auto gap-x-2  px-2">
            <RouterLink to="" v-for="type in types" class="p-2 border border-green-600 text-green-600 font-bold  whitespace-nowrap  rounded-md w-fit">
                <p class="">{{ type.name }}</p>
            </RouterLink>
        </div>
    </div>
</template>



<style scoped></style>