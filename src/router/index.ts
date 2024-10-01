import { createRouter, createWebHistory } from "vue-router/auto";
import HomePage from "@/pages/HomePage.vue";
import SearchPage from "@/pages/SearchPage.vue";
import ProductListPage from "@/pages/products/ProductListPage.vue";
import FavoritosPage from "@/pages/FavoritosPage.vue";
import ProductId from "@/pages/products/[id].vue";
import LoginPage from "@/pages/login/LoginPage.vue";
import RegisterPage from "@/pages/login/RegisterPage.vue";
import CarrinhoList from "@/pages/CarrinhoPage.vue";
import { useAuthStore } from "@/store/auth"; // Import the auth store

const routes = [
  { path: "/", component: HomePage },
  { path: "/search", component: SearchPage },
  { path: "/products", component: ProductListPage },
  { path: "/favorites", component: FavoritosPage },
  { path: "/products/:id", component: ProductId },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/cart", component: CarrinhoList, meta: { requiresAuth: true } }, // Add meta for auth requirement
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

// Workaround for dynamic import error
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
