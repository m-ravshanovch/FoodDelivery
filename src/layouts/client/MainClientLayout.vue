<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import MobileHeader from '@/components/MobileHeader.vue';
</script>

<template>
    <div class="min-h-dvh flex flex-col gap-y-10 justify-between">
        <div>
            <Header class="hidden md:flex" />
            <MobileHeader class="block md:hidden" />
            <RouterView class="container mx-auto" />
        </div>
        <Footer />
    </div>
</template>

<style scoped></style>