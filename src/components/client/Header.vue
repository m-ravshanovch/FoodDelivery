<script setup lang="ts">
import { BellRing, ShoppingCart } from "lucide-vue-next";
import NotificationMenu from "@/features/notification/NotificationMenu.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import Cookies from "js-cookie";
import ProfileMenu from "@/features/profile/ProfileMenu.vue";
import { useCartStore } from "@/stores/card";
const visible = ref(false);
const profileVisible = ref(false)
const notificationRef = ref<HTMLElement | null>(null);
const clientLogin = ref(true)
const staffLogin = ref(true)
const role = Cookies.get("role")


const cartStore = useCartStore()
const name = ref(
  Cookies.get("name")?.[0].toUpperCase() ?? ""
);
if (role === "CUSTOMER") {
  clientLogin.value = false
} else {
  staffLogin.value = false
}


const handleOpen = () => {
  visible.value = !visible.value;
  profileVisible.value = false
};

const handleProfileMenu = () => {
  visible.value = false
  profileVisible.value = !profileVisible.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    notificationRef.value &&
    !notificationRef.value.contains(event.target as Node)
  ) {
    visible.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <header class="flex w-full sticky top-0 left-0 z-50 justify-between py-2 px-3 bg-white items-center">
    <div class="bg-white py-1 rounded-md">
      <a href="/" class="text-xl font-bold text-green-600 px-2 font-serif">
        Ishonch
        <span class="bg-orange-600 px-1 rounded-md italic text-white">
          EAT
        </span>
      </a>
    </div>

    <div class="flex gap-3 items-center">
      <div ref="notificationRef" class="flex relative items-center gap-x-3">
        <button @click.stop="handleOpen" class="text-black hover:text-orange-500 transition-colors cursor-pointer">
          <BellRing :size="18" />
        </button>

        <RouterLink to="/auth/login" class="bg-green-600 px-2 py-1 rounded-md font-bold text-sm text-white"
          v-if="clientLogin">
          Login
        </RouterLink>
        <RouterLink to="/orderPage" class="relative flex items-center justify-center">
          <ShoppingCart :size="22" />

          <span v-if="cartStore.totalItems > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
            {{ cartStore.totalItems }}
          </span>
        </RouterLink>
        <Transition enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in" leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2">
          <div v-if="visible" class="absolute right-0 top-12 z-50">
            <NotificationMenu />
          </div>
        </Transition>
        <Transition enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in" leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2">
          <div v-if="profileVisible" class="absolute right-0 top-12 z-50">
            <ProfileMenu />
          </div>
        </Transition>
        <button @click.stop="handleProfileMenu" class="bg-green-600 w-8 h-8 rounded-full cursor-pointer">
          <p class="font-bold text-white">{{ name }}</p>
        </button>
      </div>
    </div>
  </header>
</template>