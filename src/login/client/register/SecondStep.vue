<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useRouter } from "vue-router";
import { registerNextStep } from "@/service/auth/AuthService";
const router = useRouter()

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
    })

);

const onSubmit = async (values: any) => {

    console.log("values:", values)
    try {
        await registerNextStep(values)
        router.push("/auth/login")

        
    } catch (error) {
        console.log("Error:", error);
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
                    <Field name="name" type="text" placeholder="First Name" class="py-1 bg-slate-200 w-full px-2" />
                </div>
                <ErrorMessage name="name" class="text-red-500 text-sm" />
            </div>
            <div class="flex flex-col">
                <div class="flex gap-x-2">
                    <Field name="phone_number" type="text" placeholder="Phone Number" class="py-1 bg-slate-200 w-full px-2" />
                </div>
                <ErrorMessage name="phone_number" class="text-red-500 text-sm" />
            </div>
            <div class="flex flex-col">
                <Field name="password" type="password" placeholder="password" class="py-1 bg-slate-200 px-2" />
                <ErrorMessage name="password" class="text-red-500 text-sm" />
            </div>
            
            <div>
                <button type="submit"
                    class="cursor-pointer py-2 bg-green-600 w-full text-white font-bold rounded-md">submit</button>
            </div>
        </Form>
    </div>
</template>

<style scoped></style>