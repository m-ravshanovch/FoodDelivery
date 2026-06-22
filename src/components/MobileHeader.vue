<script setup lang="ts">
</script>

<template>
    <header class="flex sticky z-50 top-0 left-0 justify-between py-2 px-3 bg-white text-white items-center">
        <div class="bg-white py-1 rounded-md">
            <p class="text-xl font-bold text-green-600 px-2 font-serif ">Ishonch <span
                    class="bg-orange-600 px-1 rounded-md italic text-white">EAT</span></p>
        </div>
        <div class="flex items-center gap-x-3">
            <button class="text-black">
                <BellRing :size="18" />
            </button>
            <RouterLink to="/auth/login" class="bg-green-600 px-2 py-1 rounded-md font-bold text-sm cursor-pointer">
                Login
            </RouterLink>
            <button class="bg-slate-600 px-2 py-1 text-sm rounded-md cursor-pointer font-bold">
                ishlayman
            </button>
        </div>
    </header>
</template>

<style scoped></style>