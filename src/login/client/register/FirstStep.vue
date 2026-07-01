<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { authApi } from "@/api/auth.api";
import { ref, computed, onUnmounted } from "vue";
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
      .min(5, "OTP must be 5 digits")
  })
);

const router = useRouter();

const email = ref("");

// ================= Timer =================
const timeLeft = ref(0);
let timer: number | null = null;

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
});

const startTimer = () => {
  timeLeft.value = 180; // 3 minutes

  if (timer) {
    clearInterval(timer);
  }

  timer = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer!);
      timer = null;
    }
  }, 1000);
};

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
// =========================================

const handleGetCode = async (email: string) => {
  if (!email) {
    alert("Please enter your email first.");
    return;
  }

  try {
    const res = await authApi.post("/auth/sent-otp", {
      email,
    });

    console.log("OTP sent:", res.data);

    // Start countdown only after successful request
    startTimer();
  } catch (error: any) {
    console.log(
      "Error in taking Verification Code:",
      error.response?.data || error
    );
  }
};

const handleSubmitCode = async (values: any) => {
  try {
    await verification(values);

    console.log("Verified Successfully");
    console.log("values:", values);
    router.push("/auth/register/1");
  } catch (error) {
    console.log("Through:", error);
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-96 rounded-xl shadow-lg border border-gray-200 p-6">
      <h1 class="text-2xl font-bold text-center mb-6">
        Register as Client
      </h1>

      <Form :validation-schema="validationSchema" @submit="handleSubmitCode" class="flex flex-col gap-4">
        <!-- Email -->
        <div>
          <div class="flex gap-2">
            <Field name="email" v-model="email" type="email" placeholder="Email"
              class="flex-1 rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500" />

            <button type="button" @click="handleGetCode(email)" :disabled="timeLeft > 0"
              class="min-w-24 rounded-md bg-gray-900 text-white font-semibold px-3 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 transition">
              {{ timeLeft > 0 ? formattedTime : "Send" }}
            </button>
          </div>

          <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Verification Code -->
        <div>
          <Field name="code" type="text" maxlength="6" placeholder="Verification Code"
            class="w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500" />

          <ErrorMessage name="code" class="text-red-500 text-sm mt-1" />
        </div>

        <p class="text-sm">
          Do you have an account?
          <RouterLink to="/auth/login" class="text-blue-600 underline">
            Login
          </RouterLink>
        </p>

        <button type="submit" class="rounded-md bg-green-600 py-2 font-bold text-white hover:bg-green-700 transition">
          Next
        </button>
      </Form>
    </div>
  </div>
</template>

<style scoped></style>