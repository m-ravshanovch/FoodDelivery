<script setup lang="ts">
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { loginUser } from "@/service/auth/AuthService";
import { useRouter } from "vue-router";

const router = useRouter();

const isLoading = ref(false);
const delay = (ms:number)=>new Promise((resolve)=>setTimeout(resolve,ms))
const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, "Email required")
      .email("Invalid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
);

const onSubmit = async (values: any) => {
  try {
    isLoading.value = true;

    await loginUser(values);

    await delay(1000)
    router.push("/");
  } catch (error) {
    console.log("Error:", error);
    console.log("massage")
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">


    <Form :validation-schema="validationSchema" @submit="onSubmit" class="flex flex-col gap-y-3 w-90 ">
      <div>
        <p class=" text-black font-bold text-2xl ">
          Hello! Welcome  Back
        </p>
        
      </div>
      <div class="flex flex-col">
        <Field name="email" type="email" placeholder="Email"
          class="py-2 px-3 border  outline-none border-slate-300 focus:ring-2 focus:ring-green-500" />
        <ErrorMessage name="email" class="text-red-500 text-sm" />
      </div>

      <div class="flex flex-col">
        <Field name="password" type="password" placeholder="Password"
          class="py-2 px-3 border text-sm outline-none border-slate-300 focus:ring-2 focus:ring-green-500" />
        <ErrorMessage name="password" class="text-red-500 text-sm" />
      </div>

      <div>
        <p class="text-sm">
          You don't have an account?
          <RouterLink to="/auth/register" class="underline text-blue-600 ml-1">
            Register
          </RouterLink>
        </p>
      </div>

      <button type="submit" :disabled="isLoading"
        class="cursor-pointer py-2 bg-green-600 w-full text-white font-bold rounded-md flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed">

        <span>
          {{ isLoading ? "Signing in..." : "Submit" }}
        </span>
      </button>
    </Form>
  </div>
</template>

<style scoped></style>