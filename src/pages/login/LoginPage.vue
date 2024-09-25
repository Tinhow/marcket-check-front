<template>
    <div class="layout-container">
      <LoginPage class="body" />
    </div>
  </template>
  
  <script setup>
  import LoginPage from "@/components/login/LoginPage.vue"
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
  