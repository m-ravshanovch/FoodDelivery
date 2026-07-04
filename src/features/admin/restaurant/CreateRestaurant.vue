<script setup lang="ts">
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { Upload} from "lucide-vue-next";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import type { LeafletMouseEvent } from "leaflet";
import { useQueryServiceAuth } from "@/service/authenticated/useQueryServiceAuth";
import { useQueryService } from "@/service/unauthenticated/useQueryService";

const { useCategories } = useQueryService()
const { data: categoryData } = useCategories()
const imagePreview = ref("");
const mapUrl = ref("");

const { useCreateRestaurant } = useQueryServiceAuth();
const { mutateAsync: createRestaurant } = useCreateRestaurant();
const validationSchema = toTypedSchema(
    z.object({
        name: z
            .string()
            .min(2, "Restaurant nomi kamida 2 ta harfdan iborat bo'lishi kerak"),

        description: z
            .string()
            .min(10, "Restaurant tavsifi kamida 10 ta belgidan iborat bo'lishi kerak"),

        categories: z
            .array(z.number())
            .min(1, "Kamida bitta kategoriya tanlang"),
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



const zoom = ref(13);

const center = ref<[number, number]>([
    41.3111,
    69.2797,
]);

const marker = ref<[number, number]>([
    41.3111,
    69.2797,
]);


const handleClick = (e: LeafletMouseEvent) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    marker.value = [lat, lng];

    console.log({
        latitude: lat,
        longitude: lng,
    });

    mapUrl.value = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=18/${lat}/${lng}`;

    console.log(mapUrl.value);
};



const onSubmit = async (values: any) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("address", mapUrl.value);

    values.categories.forEach((id: number) => {
        formData.append("categories", String(id));
    });

    if (selectedFile.value) {
        formData.append("restaurant_img", selectedFile.value);
    }

    console.log(formData);

    await createRestaurant(formData);
};



</script>

<template>
    <div class="p-5 bg-green-500">
        <p class="font-serif text-xl font-bold text-white">Restaurant Yaratish</p>
    </div>
    <Form :validation-schema="validationSchema" @submit="onSubmit"
        class=" border border-slate-200 p-5 rounded-xl ">
        <div class="grid grid-cols-1  gap-4">
            <div class="flex flex-col gap-y-2 justify-between">
                <div class="w-full">
                    <label class="block text-sm mb-2 font-medium">
                        Restaurant Name
                    </label>

                    <Field name="name" placeholder="maxway"
                        class="w-full border border-slate-300 rounded-md px-4 py-3 outline-none focus:border-green-500" />

                    <ErrorMessage name="name" class="text-red-500 text-sm" />
                </div>
                <div class="flex flex-col md:flex-row gap-x-2">
                    <div class="w-full">
                        <label class="block text-sm mb-2 font-medium">
                            Restaurant Description
                        </label>

                        <Field as="textarea" name="description" placeholder="Enter restaurant description..." rows="5"
                            class="w-full resize-none border border-slate-300 rounded-md px-4 py-3 outline-none focus:border-green-500" />

                        <ErrorMessage name="description" class="text-red-500 text-sm" />
                    </div>

                    <div class=" w-full flex  flex-col  border-dashed border-green-600 p-2 rounded-2xl">
                         <label class="block text-sm mb-2 font-medium">
                            Restaurant image
                        </label>
                        <label
                            class="order-2  border-dashed border-slate-300 rounded-3xl flex items-center justify-center cursor-pointer overflow-hidden hover:border-green-500 transition-all">
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
                    </div>
                </div>

                <div class="flex flex-col md:flex-row  gap-x-2">
                    <div class="w-full ">
                        <label class="block mb-2 text-sm font-medium">
                            Categories
                        </label>

                        <div class="flex flex-col h-40 overflow-y-auto gap-3">
                            <label v-for="category in categoryData" :key="category.id"
                                class="flex items-center gap-2  rounded-lg px-3 py-2 cursor-pointer">
                                <Field type="checkbox" name="categories" :value="category.id" />

                                {{ category.name }}
                            </label>
                        </div>

                        <ErrorMessage name="categories" class="text-red-500 text-sm" />
                    </div>
                    <LMap style="height:200px" :zoom="zoom" :center="center" @click="handleClick">
                        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        <LMarker :lat-lng="marker" />
                    </LMap>
                    <Field name="mapUrl" type="hidden" />
                    <ErrorMessage name="mapUrl" class="text-red-500 text-sm" />
                </div>

            </div>

        </div>
        <div class="mt-5 flex justify-between">
            <RouterLink to="/staff-auth/loginRestaurant" type="submit"
                class="bg-blue-500 text-sm text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors">
                Orqaga
            </RouterLink>
            <button type="submit"
                class="bg-green-500 text-sm text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors">
                Restaurant yaratish
            </button>
        </div>
    </Form>
</template>

<style scoped></style>