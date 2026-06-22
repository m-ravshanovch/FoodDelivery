<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import { ref } from 'vue'

import 'swiper/css'
import 'swiper/css/pagination'

import { sliderData } from "@/fakeData/FakeSLiderData"

const sliders = ref(sliderData)
</script>
<template>
    <div class="rounded-2xl p-2">
        <Swiper :modules="[Autoplay, Pagination]" :slides-per-view="1" :loop="true" :autoplay="{ delay: 3000 }"
            :pagination="{ clickable: true }" class="md:rounded-2xl">
            <SwiperSlide v-for="item in sliders" :key="item.id" class="relative">
                <img :src="item.image" :alt="item.discount" class="w-full h-64 object-cover" />
                <p class="absolute font-bold text-white text-2xl rounded-br-3xl bg-gray-900 px-3 py-2 top-0 left-0">{{ item.discount }}</p>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<style scoped></style>