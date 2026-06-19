<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";


const validationSchema = toTypedSchema(
    z.object({
        email: z
            .string()
            .min(1, "Email required")
            .email("Invalid email"),

        password: z.string().min(6, "Password must be at least 6 characters")
    })

);

const onSubmit = (values: {}) => {
    console.log(values)
}
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <div>
            <p class="font-serif font-bold text-2xl">Login as Client</p>
        </div>
        <Form :validation-schema="validationSchema" @submit="onSubmit" class="flex flex-col gap-y-3 w-80 p-2">
            <div class="flex flex-col">
                <Field name="email" type="email" placeholder="email" class="py-1 px-2"/>
                <ErrorMessage name="email" class="text-red-500 text-sm" />
            </div>
            <div class="flex flex-col">
                <Field name="password" type="password" placeholder="password" class="py-1 px-2"/>
                <ErrorMessage name="password" class="text-red-500 text-sm" />
            </div>
            <div>
                <p class="text-sm">you don't have a account ? <RouterLink to="/auth/register" class="underline text-blue-600">register</RouterLink></p>
            </div>
            <div>
                <button type="submit" class="cursor-pointer py-2 bg-green-600 w-full text-white font-bold rounded-md">submit</button>
            </div>
        </Form>
    </div>
</template>

<style scoped></style>