<script setup lang="ts">
import { EllipsisVertical, Search } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import { useQueryService } from '@/service/unauthenticated/useQueryService';

const roleValue = ref("")
const searchValue = ref("")
const { useActiveUsers } = useQueryService()

const pages = ref({
    page: 1,
    limit: 15,
});
const { data: inActiveUsersData } = useActiveUsers(
    pages.value.page,
    pages.value.limit,
    roleValue,
    searchValue
);

console.log("in active Users:", inActiveUsersData.value)

const limits = [5, 10, 15, 20, 50];
const totalPages = computed(() => {
    return inActiveUsersData.value?.total_pages ?? 1;
});
const nextPage = () => {
    if (pages.value.page < totalPages.value) {
        pages.value.page++;
    }
};

const prevPage = () => {
    if (pages.value.page > 1) {
        pages.value.page--;
    }
};
</script>

<template>
    <div class="border flex flex-col   border-slate-300 rounded-md  bg-white">
        <div class="flex justify-between rounded-t-md  bg-slate-500 items-center px-2 py-2">
            <div class="flex gap-x-5 text-white">
                <p class="font-bold  text-lg">Users</p>
                <div class="flex items-center gap-2 ">
                    <button @click="prevPage" :disabled="pages.page === 1">
                        &lt;
                    </button>

                    <span>{{ pages.page }} / {{ totalPages }}</span>

                    <button @click="nextPage" :disabled="pages.page === totalPages">
                        &gt;
                    </button>

                    <select v-model="pages.limit">
                        <option v-for="item in limits" :key="item" :value="item">
                            {{ item }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="flex gap-x-5">
                <select v-model="roleValue" name="" id="" class="outline-none cursor-pointer text-white">
                    <option class="text-black cursor-pointer" value="">Roleni tanlang</option>
                    <option class="text-black cursor-pointer" value="COURIER">Courier</option>
                    <option class="text-black cursor-pointer" value="RESTAURANT_OWNER">Restaurant owner</option>
                </select>
                <div class="flex items-center border bg-white px-2 gap-x-2 rounded-md border-slate-300 ">
                    <Search :size="18" class="" />
                    <input v-model="searchValue" type="text" class="w-full  outline-none py-1" placeholder="Search..">
                </div>
            </div>
        </div>
        <div class=" overflow-x-auto">
            <table class="w-full text-sm">
                <thead class="bg-gray-100 border-b border-slate-300">
                    <tr>
                        <th class="px-4 py-3 text-left">Name</th>
                        <th class="px-4 py-3 text-left">Email</th>
                        <th class="px-4 py-3 text-left">Phone</th>
                        <th class="px-4 py-3 text-left">Role</th>
                        <th class="px-4 py-3 text-left"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="user in inActiveUsersData?.data" :key="user.id"
                        class="border-b border-slate-300 hover:bg-gray-50 transition">
                        <td class="px-4 py-3">{{ user.name }}</td>
                        <td class="px-4 py-3">{{ user.email }}</td>
                        <td class="px-4 py-3">{{ user.phone_number }}</td>
                        <td class="px-4 py-3">{{ user.role }}</td>
                        <td>
                            <button @click="" class=" px-1 cursor-pointer py-1 rounded-2xl text-black">
                                <EllipsisVertical />
                            </button>
                        </td>
                    </tr>

                    <tr v-if="inActiveUsersData?.length === 0">
                        <td colspan="6" class="py-8 text-center text-gray-500">
                            No users found
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>