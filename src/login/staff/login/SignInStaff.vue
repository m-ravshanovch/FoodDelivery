<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { loginUser } from "@/service/auth/AuthService";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Cookies from "js-cookie";
const loading = ref(false)
const errorMessage = ref('')
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
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const onSubmit = async (values: any) => {
    loading.value = true
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("role");
    Cookies.remove("userId");
    Cookies.remove("name");
    localStorage.removeItem("restaurantId");
    try {
        await delay(1000)
        await loginUser(values)
        const role = Cookies.get("role");
        if (role === "RESTAURANT_OWNER") {
            router.push("/staff-auth/loginRestaurant")
        } else if (role === "COURIER") {
            router.push("/curier")
        } else if (role === "ADMIN") {
            router.push("/superAdmin")
        }else {
            errorMessage.value='',
            errorMessage.value = "Staff uchun avval ro'yhattan o'tin"
        }
    } catch (error: any) {
        errorMessage.value = error.message
        console.log("Error:", error);

    } finally {
        loading.value = false
    }
}   
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen">

        <Form :validation-schema="validationSchema" @submit="onSubmit" class="flex flex-col gap-y-3 w-full md:w-90 p-2">
            <div>
                <p class="font-bold text-2xl">Nice! Welcome back</p>
            </div>
            <div class="flex flex-col">
                <Field name="email" type="email" placeholder="email"
                    class="py-1 px-2 outline-green-600 border border-slate-300" />
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
            <p class="text-sm text-red-700">
                {{ errorMessage }}
            </p>
            <div>
                <button type="submit"
                    class="cursor-pointer py-2 hover:bg-green-700 transition-all duration-300 bg-green-600 w-full text-white font-bold rounded-md">
                    <p v-if="loading">Signin..</p>
                    <p v-else>submit</p>
                </button>
        <RouterLink to="/auth/login" class="text-sm text-blue-600 underline">Mijozlar uchun</RouterLink>

            </div>
        </Form>
    </div>
</template>

<style scoped></style>