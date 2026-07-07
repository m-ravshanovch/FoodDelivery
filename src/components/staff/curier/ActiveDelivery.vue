<script setup lang="ts">
import { useQueryServiceAuth } from '@/service/authenticated/useQueryServiceAuth';
const {useOrders} = useQueryServiceAuth()

const {data:ordersData} = useOrders()
console.log("orders",ordersData.value)
</script>

<template>
    <div class="py-5 bg-amber-500 rounded-2xl">
        <div class="flex justify-center">
            <p>Active Delivery</p>
        </div>
    </div>
</template>

<style scoped>

</style>