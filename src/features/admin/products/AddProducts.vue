<script setup lang="ts">
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { Upload, ImageIcon } from "lucide-vue-next";

const imagePreview = ref("");

const validationSchema = toTypedSchema(
    z.object({
        restaurantUniqueId: z
            .string()
            .min(1, "Restaurant ID kiritilishi kerak"),

        name: z
            .string()
            .min(2, "Mahsulot nomi kamida 2 ta harfdan iborat bo'lishi kerak"),

        price: z
            .string()
            .min(1, "Narx kiritilishi kerak"),

        newPrice: z.string().optional(),

        discount: z.string().optional(),

        promotion: z.string().optional(),

        description: z
            .string()
            .min(10, "Tavsif kamida 10 ta belgidan iborat bo'lishi kerak"),

        deliveryTime: z
            .string()
            .min(1, "Yetkazish vaqti kiritilishi kerak"),

        status: z.boolean().default(true),
    })
);

const selectedFile = ref<File | null>(null);

const handleImage = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (target.files?.[0]) {
        selectedFile.value = target.files[0];
        imagePreview.value = URL.createObjectURL(target.files[0]);
    }
};

const onSubmit = (values: any) => {
    const formData = {
        ...values,
        image: selectedFile.value,
    };

    console.log(formData);
};
</script>

<template>
    <div class="mx-auto ">
        <div class="bg-white rounded-3xl border border-slate-200 shadow-lg shadow-slate-100 p-6">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-slate-800">
                    Yangi Mahsulot Qo'shish
                </h1>

                <p class="text-slate-500 mt-1">
                    Menyuga yangi mahsulot qo'shing
                </p>
            </div>

            <Form :validation-schema="validationSchema" @submit="onSubmit"
                class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- LEFT SIDE -->
                <div class="space-y-5">
                    <div>
                        <label class="block mb-2 font-medium">
                            Restaurant Unique ID
                        </label>

                        <Field name="restaurantUniqueId" placeholder="maxway"
                            class="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-green-500" />

                        <ErrorMessage name="restaurantUniqueId" class="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label class="block mb-2 font-medium">
                            Mahsulot nomi
                        </label>

                        <Field name="name" placeholder="Burger"
                            class="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-green-500" />

                        <ErrorMessage name="name" class="text-red-500 text-sm" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block mb-2 font-medium">
                                Narxi
                            </label>

                            <Field name="price" placeholder="45000"
                                class="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-green-500" />

                            <ErrorMessage name="price" class="text-red-500 text-sm" />
                        </div>

                        <div>
                            <label class="block mb-2 font-medium">
                                Yangi narx
                            </label>

                            <Field name="newPrice" placeholder="39000"
                                class="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-green-500" />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block mb-2 font-medium">
                                Chegirma
                            </label>

                            <Field name="discount" placeholder="15%"
                                class="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-green-500" />
                        </div>

                        <div>
                            <label class="block mb-2 font-medium">
                                Aksiya
                            </label>

                            <Field name="promotion" placeholder="1+1"
                                class="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-green-500" />
                        </div>
                    </div>

                    <div>
                        <label class="block mb-2 font-medium">
                            Yetkazish vaqti
                        </label>

                        <Field name="deliveryTime" placeholder="20 min"
                            class="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-green-500" />

                        <ErrorMessage name="deliveryTime" class="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label class="block mb-2 font-medium">
                            Tavsif
                        </label>

                        <Field as="textarea" rows="5" name="description" placeholder="Mahsulot haqida ma'lumot..."
                            class="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none resize-none focus:border-green-500" />

                        <ErrorMessage name="description" class="text-red-500 text-sm" />
                    </div>

                    <div class="flex items-center gap-3">
                        <Field name="status" type="checkbox" :value="true" class="w-5 h-5" />

                        <label class="font-medium">
                            Mahsulot mavjud
                        </label>
                    </div>
                </div>

                <!-- RIGHT SIDE -->
                <div>
                    <label class="block mb-2 font-medium">
                        Mahsulot rasmi
                    </label>

                    <label
                        class="h-112 border-2 border-dashed border-slate-300 rounded-3xl flex items-center justify-center cursor-pointer overflow-hidden hover:border-green-500 transition-all">
                        <input type="file" accept="image/*" class="hidden" @change="handleImage" />

                        <div v-if="!imagePreview" class="flex flex-col items-center gap-4">
                            <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                <Upload class="w-8 h-8 text-green-600" />
                            </div>

                            <div class="text-center">
                                <p class="font-semibold">
                                    Rasm yuklash
                                </p>

                                <p class="text-sm text-slate-500">
                                    PNG, JPG yoki WEBP
                                </p>
                            </div>
                        </div>

                        <img v-else :src="imagePreview" alt="Preview" class="w-full h-full object-cover" />
                    </label>

                    <div v-if="selectedFile"
                        class="mt-4 p-4 bg-green-50 rounded-xl border border-green-200 flex items-center gap-3">
                        <ImageIcon class="text-green-600" />

                        <div>
                            <p class="font-medium text-green-700">
                                Rasm tanlandi
                            </p>

                            <p class="text-sm text-slate-500">
                                {{ selectedFile.name }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- BUTTON -->
                <div class="lg:col-span-2 flex justify-end">
                    <button type="submit"
                        class="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all">
                        Mahsulot qo'shish
                    </button>
                </div>
            </Form>
        </div>
    </div>
</template>

<style scoped></style>