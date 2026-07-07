<script setup lang="ts">
import { useQueryServiceAuth } from '@/service/authenticated/useQueryServiceAuth';
import { Clock } from 'lucide-vue-next';
const { useOrdersByRestaurantId,useChangeOrderStatus } = useQueryServiceAuth()
const restaurantId = localStorage.getItem("restaurantId")
const { data: ordersData } = useOrdersByRestaurantId(restaurantId ?? '')
const {mutateAsync} = useChangeOrderStatus()
console.log(ordersData?.value)
function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long", // January
    day: "numeric", // 16
    hour: "2-digit", // 17
    minute: "2-digit", // 00
  });
}

const handelChangeStatus = async (status:string,id:string)=>{
   try{
    await mutateAsync({status,id})
   }catch(error){
    console.log("Error:",error)
   }
}
</script>

<template>
    <div class="flex flex-col gap-5">
        <div v-for="order in ordersData"
            class="bg-white border flex flex-col gap-y-3  border-slate-200 p-3 rounded-2xl">
            <div class="flex flex-col gap-5">
                <div class="flex gap-x-2">
                   <Clock/> <p>{{ formatDate(order.createdAt) }}</p>
                </div>
                <div class="flex gap-x-2">
                    <div v-for="item in order.items" class="flex border border-slate-200 rounded-2xl">
                        <img :src="item.imgUrl" :alt="item.id" class="w-20 h-20 rounded-l-2xl">
                        <div class="py-2 px-5">
                            <p class="font-bold">{{ item.name }}</p>
                            <p class="font-bold text-green-500">{{ item.price }}</p>
                            <p class="font-bold ">{{ item.qty }} ta</p>
                        </div>
                    </div>
                </div>
                <div>
                   <p class="text-xl font-mono bg-green-300 w-fit px-2 rounded-2xl">{{ order.status }}</p> 
                </div>
                <div>
                   <p class="text-2xl font-mono">{{ order.totalPrice }} so'm</p> 
                </div>
            </div>
            <div class="flex gap-x-2">
                <div>
                    <button @click="handelChangeStatus('CONFIRMED',order.id)"
                        class="bg-green-600 px-3 py-1 rounded-2xl text-white text-sm cursor-pointer">Confirmed</button>
                </div>
                <div>
                    <button @click="handelChangeStatus('PREPARING',order.id)"
                        class="bg-orange-600 px-3 py-1 rounded-2xl text-white text-sm cursor-pointer">Preparing</button>
                </div>
                <div> 
                    <button @click="handelChangeStatus('READY',order.id)" class="bg-blue-600 px-3 py-1 rounded-2xl text-white text-sm cursor-pointer">Ready</button>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped></style>