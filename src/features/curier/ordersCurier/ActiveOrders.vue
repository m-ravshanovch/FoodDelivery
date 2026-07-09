<script setup lang="ts">
import { useQueryServiceAuth } from '@/service/authenticated/useQueryServiceAuth';
import { Clock } from 'lucide-vue-next';
const {useAvailableOrders,useMyInformation,useGetOrderByCourier} = useQueryServiceAuth()
const {data:AvailableOrders} = useAvailableOrders()
console.log("Av Orders",AvailableOrders?.value)
const {mutateAsync} = useGetOrderByCourier()


function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long", 
    day: "numeric", 
    hour: "2-digit", 
    minute: "2-digit", 
  });
}
const {data:myInformation} = useMyInformation()
const handelTakeOrder = async (id:number) =>{

    try{
        const payload = {
            courierId:myInformation?.value.user_id,
            orderId:id,
            courierName:myInformation?.value.name,
            phoneNumber:myInformation?.value.phone_number
        }
        console.log("Payload:",payload)
        await mutateAsync(payload)
    }catch(error){
        console.log("Error:",error)
    }
}
</script>

<template>
    <div class="flex flex-col gap-5">
        <div  v-for="order in AvailableOrders"
            class="bg-white border flex flex-col gap-y-3  border-slate-200 p-3 rounded-2xl">
            <div class="flex flex-col  gap-5">

                <div class="flex gap-x-2">
                   <Clock/> <p>{{ formatDate(order.createdAt) }}</p>
                </div>
                <div>
                    <p class="text-xl font-bold">{{ order.restaurantName }} Restaurant</p>
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
                   <p class="text-xl font-mono">{{ order.totalPrice }} so'm</p> 
                </div>
            </div>
            <div class="flex gap-x-2 justify-end">
                    <button @click="handelTakeOrder(order.orderId)" class="bg-green-600 px-3 py-1 w-full rounded-2xl text-white text-sm cursor-pointer">
                        Buyurtmani Olish
                    </button>
            </div>
        </div>

    </div>
</template>



<style scoped>

</style>