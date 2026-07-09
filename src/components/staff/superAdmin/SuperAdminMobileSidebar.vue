<script setup lang="ts">
import { ref } from "vue";
import {
    Menu,
    X,
    EllipsisVertical,
} from "lucide-vue-next";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { logOut } from "@/service/auth/AuthService";

const router = useRouter();

const isOpen = ref(false);
const menuOpen = ref(false);

const name = Cookies.get("name");
const avatar = Cookies.get("name")?.[0].toUpperCase() ?? "";

const menus = [
    {
        name: "Restaurants",
        to: "/superAdmin",
    },
    {
        name: "Users",
        to: "/superAdmin/users",
    },
    {
        name: "Activate",
        to: "/superAdmin/usersManagement",
    },
];

const closeSidebar = () => {
    isOpen.value = false;
};

const handleLogOut = () => {
    logOut();
    router.push("/staff-auth/login");
};

</script>

<template>
    <div class="lg:hidden h-16 bg-white  flex items-center justify-between px-4">
        <button @click="isOpen = true" class="p-2 rounded-lg hover:bg-slate-100">
            <Menu class="w-6 h-6" />
        </button>

        <div class="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center font-bold">
            {{ avatar }}
        </div>
    </div>

    <Transition enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300" enter-from-class="opacity-0" leave-to-class="opacity-0">
        <div v-if="isOpen" @click="closeSidebar" class="fixed inset-0 bg-black/40 z-40" />
    </Transition>

    <aside
        class="fixed top-0 left-0 z-50 h-screen w-72 bg-white shadow-xl flex flex-col justify-between transition-transform duration-300 ease-in-out"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
        <div>
            <div class="flex items-center justify-end px-2 border-b border-slate-300  ">
                <button @click="closeSidebar" class="p-2 rounded-lg hover:bg-slate-100">
                    <X />
                </button>
            </div>

            <div class="p-4 flex flex-col gap-2">
                <RouterLink v-for="menu in menus" :key="menu.name" :to="menu.to" @click="closeSidebar"
                    class="rounded-xl border-l-4 border-transparent p-3 font-semibold transition hover:bg-slate-100"
                    active-class="bg-green-50 border-l-green-500 text-green-700">
                    {{ menu.name }}
                </RouterLink>
            </div>
        </div>

        <div class="     p-4 relative">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center font-bold">
                        {{ avatar }}
                    </div>

                    <span class="font-semibold">
                        {{ name }}
                    </span>
                </div>

                <button @click="menuOpen = !menuOpen" class="p-2 rounded-lg hover:bg-slate-100">
                    <EllipsisVertical />
                </button>
            </div>

            <Transition enter-active-class="transition-all duration-200"
                leave-active-class="transition-all duration-200" enter-from-class="opacity-0 translate-y-2"
                leave-to-class="opacity-0 translate-y-2">
                <div v-if="menuOpen" class="absolute bottom-16 right-4 bg-white rounded-xl shadow-xl  overflow-hidden">
                    <button @click="handleLogOut" class="w-full px-5 py-3 text-left hover:bg-slate-100 text-red-500">
                        Profildan chiqish
                    </button>
                </div>
            </Transition>
        </div>
    </aside>
</template>