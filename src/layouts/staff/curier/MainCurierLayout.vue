<script setup lang="ts">
import HeaderCurier from '@/components/staff/curier/HeaderCurier.vue';
import ActiveDelivery from '@/components/staff/curier/ActiveDelivery.vue';
</script>

<template>
    <div>
        <div class="container mt-3 md:px-40 flex flex-col gap-y-3">
            <div class="sticky flex flex-col gap-y-1 top-3">
                <ActiveDelivery />
                <HeaderCurier />
            </div>
            <RouterView />
        </div>
    </div>
</template>

<style scoped></style>