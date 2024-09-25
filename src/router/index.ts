import { createRouter, createWebHistory } from "vue-router/auto";
import HomePage from "@/pages/HomePage.vue";
import SearchPage from "@/pages/SearchPage.vue";
import ProductListPage from "@/pages/products/ProductListPage.vue";
import FavoritosPage from "@/pages/FavoritosPage.vue";
import ProductId from "@/pages/products/[id].vue";
import LoginPage from "@/pages/login/LoginPage.vue";
import RegisterPage from "@/components/Login/RegisterPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/search", component: SearchPage },
  { path: "/products", component: ProductListPage },
  { path: "/favorites", component: FavoritosPage },
  { path: "/products/:id", component: ProductId },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
