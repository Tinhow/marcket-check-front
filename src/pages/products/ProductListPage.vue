<template>
  <div class="layout-container">
    <productsList class="body" />
  </div>
</template>

<script setup>
import productsList from "@/components/ProductList.vue"
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  height: auto;
  margin: 0;
  padding: 0;
}

.body {
  flex-grow: 1;
}
</style>
