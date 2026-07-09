<script setup lang="ts">
import { Check, Search } from 'lucide-vue-next';
import { ref} from 'vue';
import { useQueryService } from '@/service/unauthenticated/useQueryService';
import { useQueryServiceAuth } from '@/service/authenticated/useQueryServiceAuth';

const {useActivateUser}=useQueryServiceAuth()
const {mutateAsync}=useActivateUser()
const roleValue = ref("")
const searchValue = ref("")
const { useInActiveUsers } = useQueryService()
// const users = ref([])
const pages = {
    page: 1,
    limit: 15
}
const { data: inActiveUsersData } = useInActiveUsers(pages.page, pages.limit, roleValue,searchValue)

console.log("in active Users:", inActiveUsersData.value)

const handleAccept =async (id:number) =>{
    try{
        await mutateAsync(id)
    }catch(error){
        console.log("error")
    }
}
</script>

<template>
    <div class="border flex flex-col  border-slate-300 rounded-md  bg-white">
        <div class="flex justify-between rounded-t-md bg-slate-500 text-white items-center px-2 py-2">
            <div>
                <p class="font-bold">Requested Users</p>
            </div>
            <div class="flex gap-x-2">
                <select v-model="roleValue" name="" id="" class="outline-none">
                    <option class="text-black" value="">Roleni tanlang</option>
                    <option class="text-black" value="COURIER">Courier</option>
                    <option class="text-black" value="RESTAURANT_OWNER">Restaurant owner</option>
                </select>
                <div class="flex items-center border px-2 gap-x-2 rounded-md border-slate-300 ">
                    <Search :size="18" class="" />
                    <input v-model="searchValue" type="text" class="w-full outline-none py-1" placeholder="Search..">
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
                            <button @click="handleAccept(user.id)" class="bg-green-600 px-1 cursor-pointer py-1 rounded-2xl text-white">
                                <Check :size="18" />
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