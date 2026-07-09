<script setup lang="ts">
import MobileSidebar from "@/components/staff/admin/MobileSidebar.vue";
import SidebarAdmin from "@/components/staff/admin/SidebarAdmin.vue";
</script>

<template>
  <div class="h-dvh flex flex-col overflow-hidden">
    <div class="block md:hidden">
      <MobileSidebar/>
    </div>
    <div class="flex flex-1 overflow-hidden gap-x-2 p-2">
      <aside class="hidden md:block h-full shrink-0">
        <SidebarAdmin />
      </aside>

      <main class="flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>