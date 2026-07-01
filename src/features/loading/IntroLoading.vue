<script setup lang="ts">
import  ClipLoader  from 'vue-spinner/src/ClipLoader.vue'

</script>

<template>
    <div class="relative flex items-center justify-center h-70 w-full animate-pulse bg-zinc-300 rounded-2xl">
        <ClipLoader :loading="true" color="green" />
    </div>
</template>



<style scoped></style>