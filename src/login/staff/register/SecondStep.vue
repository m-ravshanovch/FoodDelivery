<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useRouter } from "vue-router";
import { registerStaffNextStep } from "@/service/auth/AuthService";
import { useQueryUsersData } from "@/service/unauthenticated/users/useQueryUsersData";
import { ref } from "vue";
const router = useRouter();
const errorMessage = ref('')
const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Name required"),

    password: z
      .string()
      .min(6, "Eng kamida 6 ta belgi bo'lsin")
      .max(20, "Belgilar soni 20 tagacha"),
    phone_number: z
      .string()
      .min(1, "Phone number required")
      .max(13,"Phone number's length should be less than 13"),
    role_id: z.number().min(1, "Role tanlang"),
  })
);

const delay = (ms:number)=>new Promise((resolve)=>setTimeout(resolve,ms))
const loading = ref(false)
const { useRoles } = useQueryUsersData();

const {
  data: roles,
  isLoading,
  error,
} = useRoles();

const onSubmit = async (values: any) => {
  loading.value=true
  await delay(1000)
  try {
    console.log(values);

    await registerStaffNextStep(values);

    router.push("/staff-auth/login");
  } catch (error:any) {
    errorMessage.value = error.message
    console.log("Error:", error);
  } finally{
    loading.value=false
  }
};
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
        <Field name="name" type="text" maxlength="13" placeholder="First Name"
          class="py-2 border outline-green-600 border-slate-300 w-full px-2 " />

        <ErrorMessage name="name" class="text-red-500 text-sm" />
      </div>
      <div class="flex flex-col">
        <Field name="phone_number"  type="text" maxlength="13" placeholder="Phone Number"
          class="py-2 border border-slate-300 outline-green-600 w-full px-2   " />

        <ErrorMessage name="phone_number" class="text-red-500 text-sm" />
      </div>

      <div class="flex flex-col">
        <Field name="password" type="password" placeholder="Password" class="py-2 border border-slate-300 px-2 " />
        <ErrorMessage name="password" class="text-red-500 text-sm" />
        <p class="text-xs text-blue-600">Password must contain at least one uppercase letter, one number, and one special
          character. exp: Password_25</p>
      </div>

      <div class="flex flex-col">
        <Field name="role_id" as="select" class="py-2 border border-slate-300 px-2 ">
          <option value="">
            {{ isLoading ? "Loading..." : "Role tanlang" }}
          </option>

          <option v-for="role in roles ?? []" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </Field>

        <ErrorMessage name="role" class="text-red-500 text-sm" />

        <p v-if="error" class="text-red-500 text-sm mt-1">
          Roles yuklanmadi
        </p>
      </div>
      <p class="text-sm text-red-700">
        {{ errorMessage }}
      </p>

      <!-- Submit -->
      <div class="flex gap-x-2">
        <RouterLink to="/staff-auth/register" type="submit" class="cursor-pointer flex justify-center py-2 text-green-600 w-full border border-green-700 font-bold rounded-md">
          <p >Orqaga</p>
        </RouterLink>
        <button type="submit" class="cursor-pointer py-2 bg-green-600 w-full text-white font-bold rounded-md">
          <p v-if="loading">Finishing...</p>
          <p v-else>Finish</p>
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped></style>