<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { loginUser } from "@/service/auth/AuthService";
import { useRouter } from "vue-router";
import { ref } from "vue";

const loading = ref(false)
const validationSchema = toTypedSchema(
    z.object({
        email: z
            .string()
            .min(1, "Email required")
            .email("Invalid email"),

        password: z.string().min(6, "Password must be at least 6 characters")
    })

);
const router = useRouter()
const delay = (ms:number)=>new Promise((resolve)=>setTimeout(resolve,ms))
const onSubmit =async (values: any) => {
    loading.value=true
    await delay(1000)
    try {
        loginUser(values)
        router.push("/staff-auth/loginRestaurant")
    } catch (error) {
        console.log("Error:", error);

    }
}   
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen">

        <Form :validation-schema="validationSchema" @submit="onSubmit" class="flex flex-col gap-y-3 w-90 p-2">
            <div>
                <p class="font-bold text-2xl">Nice! Welcome back</p>
            </div>
            <div class="flex flex-col">
                <Field name="email" type="email" placeholder="email" class="py-1 px-2 outline-green-600 border border-slate-300" />
                <ErrorMessage name="email" class="text-red-500 text-sm" />
            </div>
            <div class="flex flex-col">
                <Field name="password" type="password" placeholder="password"
                    class="py-1 border border-slate-300 px-2 outline-green-600" />
                <ErrorMessage name="password" class="text-red-500 text-sm" />
            </div>
            <div>
                <p class="text-sm">you don't have a account ? <RouterLink to="/staff-auth/register"
                        class="underline text-blue-600">register</RouterLink>
                </p>
            </div>
            <div>
                <button type="submit"
                    class="cursor-pointer py-2 hover:bg-green-700 transition-all duration-300 bg-green-600 w-full text-white font-bold rounded-md">submit</button>
            </div>
        </Form>
    </div>
</template>

<style scoped></style>