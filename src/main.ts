/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { registerPlugins } from "@/plugins";

const app = createApp(App);

// Cria a instância do Pinia
const pinia = createPinia();

// Registra plugins adicionais (se houver)
registerPlugins(app);

// Usa o Pinia na aplicação
app.use(pinia);

app.mount("#app");
