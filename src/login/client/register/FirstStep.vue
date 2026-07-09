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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const router = useRouter();
const loadingGetVerificationCode = ref(false)
const loadingMove = ref(false)
const email = ref("");
const errorMessage = ref('')
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
  timeLeft.value = 180;

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
const handleGetCode = async (email: string) => {

  if (!email) {
    alert("Please enter your email first.");
    return;
  }

  loadingGetVerificationCode.value = true
  await delay(1000)
  try {
    const res = await authApi.post("/auth/sent-otp", {
      email,
    });

    console.log("OTP sent:", res.data);

    startTimer();
  } catch (error: any) {
    console.log(
      "Error in taking Verification Code:",
      error.response?.data || error
    );
    errorMessage.value = error.response?.data.message
  } finally {
    loadingGetVerificationCode.value = false;
  }
};

const handleSubmitCode = async (values: any) => {
  errorMessage.value=''
  await delay(1000)
  loadingMove.value = true
  try {
    await verification(values);

    console.log("Verified Successfully");
    console.log("values:", values);
    router.push("/auth/register/1");
  } catch (error:any) {
    console.log("Through:", error.message);
    errorMessage.value = error.response?.data.message
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-96  p-6">


      <Form :validation-schema="validationSchema" @submit="handleSubmitCode" class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold ">
          Register
        </h1>
        <div class="flex items-center gap-x-2">
          <div
            class="w-10 h-10  flex items-center justify-center border border-green-700 rounded-full bg-green-600 text-white">
            1</div>
          {{ '--->' }}
          <div class="w-10 h-10  flex items-center justify-center border border-green-700 rounded-full ">
            2</div>
        </div>
        <div>
          <div class="flex gap-2">
            <Field name="email" v-model="email" type="email" placeholder="Email"
              class="flex-1 border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500" />

            <button type="button" @click="handleGetCode(email)" :disabled="timeLeft > 0"
              class="w-fit rounded-md  bg-green-700 text-white cursor-pointer font-semibold px-3 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 transition">
              <p v-if="loadingGetVerificationCode"> Send..</p>
              <p v-else> {{ timeLeft > 0 ? formattedTime : "Get" }}</p>
            </button>
          </div>
            
          <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <Field name="code" type="text" maxlength="6" placeholder="Verification Code"
            class="w-full border border-slate-300 px-3  py-2 outline-none focus:ring-2 focus:ring-green-500" />

          <ErrorMessage name="code" class="text-red-500 text-sm mt-1" />
        </div>

        <p class="text-sm">
          Do you have an account?
          <RouterLink to="/auth/login" class="text-blue-600 underline">
            Login
          </RouterLink>
        </p>
        <p class="text-sm text-red-700">
           {{ errorMessage }}
        </p>
        <button type="submit"
          class="rounded-md cursor-pointer bg-green-600 py-2 font-bold text-white hover:bg-green-700 transition">
          <p v-if="loadingMove">Moving..</p>
          <p v-else>Next</p>
        </button>
      </Form>
    </div>
  </div>
</template>

<style scoped></style>