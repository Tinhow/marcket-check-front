<template>
  <div id="app" class="bg-white">
    <cabecalhoHome class="header" />
    <router-view class="router-view" />
    <rodaPe class="footer" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/store/auth";

import cabecalhoHome from "@/components/CabecalhoHome.vue";
import rodaPe from "@/components/RodaPe.vue";
const authStore = useAuthStore();

onMounted(() => {
  authStore.checkAuth();

  if (!authStore.isAuthenticated) {
    console.log("Usuário não autenticado");
  } else {
    console.log("Usuário autenticado");
  }
});
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.header {
  flex-shrink: 0;
}

.router-view {
  flex-grow: 1;
  overflow: auto;
  margin: 0;
  padding: 0;
}

.footer {
  flex-shrink: 0;
}
</style>
