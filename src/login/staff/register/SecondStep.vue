<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useRouter } from "vue-router";
import { registerStaffNextStep } from "@/service/auth/AuthService";
import { useQueryRoles } from "@/service/unauthenticated/users/useQueryRoles";

const router = useRouter();

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Name required"),

    password: z
      .string()
      .min(3, "Eng kamida 3 ta belgi bo'lsin")
      .max(20, "Belgilar soni 20 tagacha"),

    role_id: z.number().min(1, "Role tanlang"),
  })
);

const { useRoles } = useQueryRoles();

const {
  data: roles,
  isLoading,
  error,
} = useRoles();

const onSubmit = async (values: any) => {
  try {
    console.log(values);

    await registerStaffNextStep(values);

    router.push("/");
  } catch (error) {
    console.log("Error:", error);
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
      @submit="onSubmit"
      class="flex flex-col gap-y-3 w-80 p-2"
    >
      <!-- Name -->
      <div class="flex flex-col">
        <Field
          name="name"
          type="text"
          placeholder="First Name"
          class="py-2 bg-slate-200 w-full px-2 rounded-md"
        />

        <ErrorMessage
          name="name"
          class="text-red-500 text-sm"
        />
      </div>

      <!-- Password -->
      <div class="flex flex-col">
        <Field
          name="password"
          type="password"
          placeholder="Password"
          class="py-2 bg-slate-200 px-2 rounded-md"
        />

        <ErrorMessage
          name="password"
          class="text-red-500 text-sm"
        />
      </div>

      <!-- Role -->
      <div class="flex flex-col">
        <Field
          name="role_id"
          as="select"
          class="py-2 bg-slate-200 px-2 rounded-md"
        >
          <option value="">
            {{ isLoading ? "Loading..." : "Select Role" }}
          </option>

          <option
            v-for="role in roles ?? []"
            :key="role.id"
            :value="role.id"
          >
            {{ role.name }}
          </option>
        </Field>

        <ErrorMessage
          name="role"
          class="text-red-500 text-sm"
        />

        <p
          v-if="error"
          class="text-red-500 text-sm mt-1"
        >
          Roles yuklanmadi
        </p>
      </div>

      <!-- Submit -->
      <div>
        <button
          type="submit"
          class="cursor-pointer py-2 bg-green-600 w-full text-white font-bold rounded-md"
        >
          Submit
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped></style>