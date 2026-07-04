<script setup lang="ts">
import Header from '@/components/client/Header.vue';
import Footer from '@/components//client/Footer.vue';
import MobileHeader from '@/components/client/MobileHeader.vue';
</script>

<template>
    <div class="min-h-dvh flex flex-col gap-y-10 justify-between">
        <div >
            <Header class="hidden md:flex px-5 container lg:px-20 mx-auto" />
            <MobileHeader class="block md:hidden" />
            <RouterView class="container px-5 lg:px-20 mx-auto" />
        </div>
        <Footer />
    </div>
</template>

<style scoped></style>