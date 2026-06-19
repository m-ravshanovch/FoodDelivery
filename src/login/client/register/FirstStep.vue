<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useRouter } from "vue-router";
import { authApi } from "@/api/auth.api";
import { ref } from "vue";

const router = useRouter()
const validationSchema = toTypedSchema(
    z.object({
        email: z
            .string()
            .min(1, "Email required")
            .email("Invalid email"),
    })

);

const onSubmit = (values: {}) => {
    console.log("pressed")
    console.log(values)
    router.push("/auth/register/1")
}
const email = ref("")
const handleGetCode = (email:string)=>{

    try{
        authApi.post("/auth/sent-otp",email)
    }catch(error){
        console.log("Error in taking Verification Code:",error)
    }
}
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <div>
            <p class="font-serif font-bold text-2xl">Register as Client</p>
        </div>
        <Form :validation-schema="validationSchema" @submit="onSubmit" class="flex flex-col gap-y-3 w-80 p-2">
            <div class="flex flex-col">
                <div class="flex gap-x-2">
                    <Field name="email" v-model="email" type="email" placeholder="Email" class="py-1 bg-slate-200 w-full px-2" />
                    <button type="button" @click="handleGetCode(email)" class="bg-gray-900 text-white text-sm font-bold px-2 rounded-md cursor-pointer">Send</button>
                </div>
                <ErrorMessage name="email" class="text-red-500 text-sm" />
            </div>
            <div class="flex flex-col">
                <Field name="otp" type="number" placeholder="Verication Code" class="py-1 bg-slate-200 px-2" />
            </div>
            <div>
               <p class="text-sm"> Do you have an acount ? <RouterLink to="/auth/login" class="underline text-blue-600">login</RouterLink></p>
            </div>
            <div>
                <button type="submit"
                    class="cursor-pointer py-2 bg-green-600 w-full text-white font-bold rounded-md">Next</button>
            </div>
        </Form>
    </div>
</template>

<style scoped></style>