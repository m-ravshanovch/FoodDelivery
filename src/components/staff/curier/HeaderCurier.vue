<script setup lang="ts">
import Cookies from 'js-cookie';
import { User } from 'lucide-vue-next';
import { ref } from 'vue';
import { logOut } from '@/service/auth/AuthService';
import { useRouter } from 'vue-router';
const name = Cookies.get("name")
const isOpen = ref(false)
const router = useRouter()
console.log(isOpen.value)
const menus = [
    {
        name: "Home",
        to: "/curier"
    },
    {
        name: "Orders",
        to: "/curier/orders"
    },
    {
        name: "History",
        to: "/curier/history"
    },

]

const handleLogOut = () =>{
    logOut()
    router.push("/staff-auth/login")
}

</script>

<template>
    <div>
        <div
            class="flex justify-between items-center bg-white gap-x-10 p-4 border-b shadow-md rounded-2xl border-slate-300">

            <ul class="flex gap-x-3">
                <li v-for="menu in menus" :key="menu.name">
                    <RouterLink :to="menu.to">{{ menu.name }}</RouterLink>
                </li>
            </ul>
            <div class="flex gap-x-3 relative items-center">
                <p class="font-bold relative">{{ name }} </p>
                <button @click="isOpen = !isOpen" class="p-2 border rounded-full">
                    <User class="" />
                </button>
                <Transition enter-active-class="transition-all duration-200 ease-out"
                    enter-from-class="opacity-0 scale-95 -translate-y-2"
                    enter-to-class="opacity-100 scale-100 translate-y-0"
                    leave-active-class="transition-all duration-150 ease-in"
                    leave-from-class="opacity-100 scale-100 translate-y-0"
                    leave-to-class="opacity-0 scale-95 -translate-y-2">
                    <div v-if="isOpen"
                        class="absolute right-4 top-10 z-50 w-44 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">

                        <button @click="handleLogOut"
                            class="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 transition">
                            Profildan chiqish
                        </button>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>


<style scoped></style>