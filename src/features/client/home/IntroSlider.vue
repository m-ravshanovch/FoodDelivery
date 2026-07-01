<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import { useQueryService } from '@/service/unauthenticated/useQueryService'
import 'swiper/css'
import 'swiper/css/pagination'
import IntroLoading from '@/features/loading/IntroLoading.vue'

const {useAds} = useQueryService()
const {data,isLoading}= useAds()
console.log(data.value)
</script>
<template>
    <div v-if="isLoading" class="flex justify-center md:p-3 items-center w-full">
        <div class="relative flex items-center justify-center h-70 w-full animate-pulse bg-green-600 rounded-2xl">
              <IntroLoading/>
        </div>
    </div>
    <div  class="rounded-2xl ">
        <Swiper :modules="[Autoplay, Pagination]" :slides-per-view="1" :loop="true" :autoplay="{ delay: 3000 }"
            :pagination="{ clickable: true }" class="md:rounded-2xl">
            <SwiperSlide v-for="item in data" :key="item.id" class="relative">
                <img :src="item.image_ads" :alt="item.discount" class="w-full h-70  object-cover " />
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<style scoped></style>