import { createApp } from "vue";
import { createPinia } from "pinia";

import "./style.css";
import App from "./App.vue";
import router from "@/router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import 'leaflet/dist/leaflet.css';
const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .use(VueQueryPlugin)
  .mount("#app");