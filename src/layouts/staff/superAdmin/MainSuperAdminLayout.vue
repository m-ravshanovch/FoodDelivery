<script setup lang="ts">
import SidebarSuperAdmin from "@/components/staff/superAdmin/SidebarSuperAdmin.vue";
import SuperAdminMobileSidebar from "@/components/staff/superAdmin/SuperAdminMobileSidebar.vue";
</script>

<template>
  <div class="h-dvh flex flex-col overflow-hidden">
    <div class="md:hidden">
      <SuperAdminMobileSidebar/>
    </div>
    <div class="flex flex-1 overflow-hidden gap-x-2 p-2">
      <aside class="hidden md:block h-full shrink-0">
        <SidebarSuperAdmin />
      </aside>

      <main class="flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>