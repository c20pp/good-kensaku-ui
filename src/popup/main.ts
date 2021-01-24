import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Button from "primevue/button";

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import "primeflex/primeflex.css";

const app = createApp(App);
app.use(PrimeVue);
app.component("Button", Button);

app.mount("#app");
