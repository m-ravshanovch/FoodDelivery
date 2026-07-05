<script setup lang="ts">

</script>

<template>
    <div class="flex">
        <div class="hidden md:flex h-screen w-full  items-center justify-center bg-green-600">
            <img src="/ishonchEat.png" class="h-full w-full object-cover" alt="">
        </div>
        <div class="w-full">
            <RouterView/>
        </div>
    </div>
</template>

<style scoped>

</style>