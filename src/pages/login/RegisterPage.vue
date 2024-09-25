<template>
    <div class="layout-container">
      <RegisterPage class="body" />
    </div>
  </template>
  
  <script setup>
  import RegisterPage from "@/components/login/RegisterPage.vue"
  </script>
  
  <style scoped>
  .layout-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  .body {
    flex-grow: 1;
    overflow: hidden;
  }
  </style>
  