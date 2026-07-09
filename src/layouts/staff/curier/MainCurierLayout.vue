<script setup lang="ts">
import ActiveDelivery from '@/components/staff/curier/ActiveDelivery.vue';
import Header from '@/components/staff/curier/Header.vue';
</script>

<template>
    <div>
        <div class="container mt-3 p-2 md:px-40 flex flex-col gap-y-3">
            <div class="sticky flex flex-col gap-y-1 top-3">
                <Header />
                <ActiveDelivery />
            </div>
            <RouterView />
        </div>
    </div>
</template>

<style scoped></style>