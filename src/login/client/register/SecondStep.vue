<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useRouter } from "vue-router";
import { registerNextStep } from "@/service/auth/AuthService";
import { ref } from "vue";
const router = useRouter()
const errorMessage = ref('')
const validationSchema = toTypedSchema(
    z.object({
        name: z
            .string()
            .min(1, "Name required"),
        password: z
            .string()
            .min(6, "Eng kamida 6ta belgi bo'lsin")
            .max(20, "Belgilar soni 20 tagacha"),
        phone_number: z
            .string()
            .min(1, "Phone number required")
            .max(13,"Phone number's length must be less than 13")
    })

);

const onSubmit = async (values: any) => {

    console.log("values:", values)
    try {
        await registerNextStep(values)
        router.push("/auth/login")


    } catch (error:any) {
        errorMessage.value = error.message
        console.log("Error:",error.message);
    }
}
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen">

        <Form :validation-schema="validationSchema" @submit="onSubmit" class="flex flex-col gap-y-3 w-90 p-2">
            <h1 class="text-2xl font-bold ">
                Register
            </h1>
            <div class="flex items-center gap-x-2">
                <div class="w-10 h-10  flex items-center justify-center border border-green-700 rounded-full">1</div>
                {{ '--->' }}
                <div
                    class="w-10 h-10  flex items-center justify-center border border-green-700 rounded-full bg-green-600 text-white">
                    2</div>
            </div>
            <div class="flex flex-col">
                <div class="flex gap-x-2">
                    <Field name="name" type="text" placeholder="First Name"
                        class="py-1 border outline-green-600 border-slate-300 w-full px-2" />
                </div>
                <ErrorMessage name="name" class="text-red-500 text-sm" />
            </div>
            <div class="flex flex-col">
                <div class="flex gap-x-2">
                    <Field name="phone_number" type="text" placeholder="Phone Number"
                        class="py-1 border outline-green-600  border-slate-300 w-full px-2" />
                </div>
                <ErrorMessage name="phone_number" class="text-red-500 text-sm" />
            </div>
            <div class="flex flex-col">
                <Field name="password" type="password" placeholder="password"
                    class="py-1 outline-green-600 border border-slate-300 px-2" />
                <ErrorMessage name="password" class="text-red-500 text-sm" />
                <p class="text-xs">Password must contain at least one uppercase letter, one number, and one special
                    character. exp: Password_25</p>
            </div>
            <p class="text-sm text-red-700">
                {{ errorMessage }}
            </p>
            <div class="flex gap-x-2">
                <RouterLink to="/auth/register" type="submit"
                    class="cursor-pointer  flex justify-center transition-all duration-300 py-2 text-green-600 w-full border border-green-600 font-bold rounded-md">Back</RouterLink>
                <button type="submit"
                    class="cursor-pointer hover:bg-green-700 transition-all duration-300 py-2 bg-green-600 w-full text-white font-bold rounded-md">Finish</button>
            </div>
        </Form>
    </div>
</template>

<style scoped></style>