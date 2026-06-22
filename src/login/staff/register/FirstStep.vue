<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { authApi } from "@/api/auth.api";
import { ref } from "vue";
import { verification } from "@/service/auth/AuthService";
import { useRouter } from "vue-router";
const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, "Email required")
      .email("Invalid email"),

    code: z
      .string()
      .min(5, "OTP must be 6 digits"),
  })
);


const router = useRouter()
const email = ref("");

const handleGetCode = async (email: string) => {
  try {
    const res = await authApi.post("/auth/sent-otpp", {
      email,
    });

    console.log("OTP sent:", res.data);
  } catch (error: any) {
    console.log(
      "Error in taking Verification Code:",
      error.response?.data || error
    );
  }
};

const handleSubmitCode = async (values: any) => {
  try {
    verification(values)
    console.log("Verificate Succesfully");
    router.push('/staff-auth/register/1')
  } catch (error) {
    console.log("Through:", error);
  }
};
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div>
      <p class="font-serif font-bold text-2xl">
        Register as Staff
      </p>
    </div>

    <Form
      :validation-schema="validationSchema"
      @submit="handleSubmitCode"
      class="flex flex-col gap-y-3 w-80 p-2"
    >
      <div class="flex flex-col">
        <div class="flex gap-x-2">
          <Field
            name="email"
            v-model="email"
            type="email"
            placeholder="Email"
            class="py-1 bg-slate-200 w-full px-2"
          />

          <button
            type="button"
            @click="handleGetCode(email)"
            class="bg-gray-900 text-white text-sm font-bold px-2 rounded-md cursor-pointer"
          >
            Send
          </button>
        </div>

        <ErrorMessage
          name="email"
          class="text-red-500 text-sm"
        />
      </div>

      <div class="flex flex-col">
        <Field
          name="code"
          type="text"
          placeholder="Verification Code"
          class="py-1 bg-slate-200 px-2"
        />

        <ErrorMessage
          name="otp"
          class="text-red-500 text-sm"
        />
      </div>

      <div>
        <p class="text-sm">
          Do you have an account ?
          <RouterLink
            to="/auth/login"
            class="underline text-blue-600"
          >
            login
          </RouterLink>
        </p>
      </div>

      <div>
        <button
          type="submit"
          class="cursor-pointer py-2 bg-green-600 w-full text-white font-bold rounded-md"
        >
          Next
        </button>
      </div>
    </Form>
  </div>
</template>