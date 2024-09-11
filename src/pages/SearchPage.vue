<template>
  <div class="layout-container">
    <search class="body" />
  </div>
</template>

<script setup>
import search from "@/components/SearchBar.vue"
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
  overflow: hidden;
}
</style>
