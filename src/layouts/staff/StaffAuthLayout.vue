<script setup lang="ts">

</script>

<template>
    <div class="flex md:flex-row flex-col">
        <div class="h-screen w-full hidden lg:flex items-center justify-center border-r border-white bg-green-600">
               <p class="text-white text-3xl font-bold">Ishonch Staff</p>
        </div>
        <div class="w-full">
            <RouterView/>
        </div>
    </div>
</template>

<style scoped>

</style>