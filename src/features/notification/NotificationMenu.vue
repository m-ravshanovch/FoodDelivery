<script setup lang="ts">
import { ref } from "vue";
import { CheckCircle, Bike, MapPin } from "lucide-vue-next";
import { useQueryServiceAuth } from "@/service/authenticated/useQueryServiceAuth";

const {useNotifications} = useQueryServiceAuth()
const {data,isLoading,error} = useNotifications()
console.log("notifications",data.value);



const orders = data

const getStatusColor = (status: string) => {
  switch (status) {
    case "Tasdiqlandi":
      return "bg-green-100 text-green-600";
    case "Curierga Berildi":
      return "bg-orange-100 text-orange-600";
    case "Curier Yetib Keldi":
      return "bg-blue-100 text-blue-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getIcon = (status: string) => {
  switch (status) {
    case "Tasdiqlandi":
      return CheckCircle;
    case "Curierga Berildi":
      return Bike;
    case "Curier Yetib Keldi":
      return MapPin;
    default:
      return CheckCircle;
  }
};
</script>

<template>
  <div
    class="w-80 max-h-96 overflow-y-auto rounded-2xl bg-white shadow-xl border border-slate-100 p-3"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-bold text-lg text-slate-800">
        Notifications
      </h2>

      <span
        class="bg-orange-500 text-white text-xs px-2 py-1 rounded-full"
      >
        {{ orders?.length }}
      </span>
    </div>

    <div class="space-y-3 h-40 overflow-y-auto">
      <div
        v-for="order in orders"
        :key="order.orderStatus"
        class="bg-slate-50 hover:bg-slate-100 transition-all duration-200 rounded-xl p-3 cursor-pointer"
      >
        <div class="flex items-start gap-3">
          <div
            class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center"
          >
            <component
              :is="getIcon(order?.orderStatus)"
              :size="18"
              class="text-orange-600"
            />
          </div>

          <div class="flex-1">
            <div class="flex justify-between items-center">
              <p class="font-semibold text-slate-800">
                {{ order?.title }}
              </p>

              <span class="text-xs text-slate-500">
                {{ order?.realTime }}
              </span>
            </div>

            <div
              class="inline-flex mt-2 px-2 py-1 rounded-full text-xs font-medium"
              :class="getStatusColor(order.orderStatus)"
            >
              {{ order?.orderStatus }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      class="w-full mt-4 bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-xl font-medium"
    >
      Barchasini ko'rish
    </button>
  </div>
</template>