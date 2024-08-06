<template>
    <div class="bg-dark p-2 shape">
          <v-autocomplete
            append-inner-icon="mdi-microphone"
            class="autocomplete"
            density="comfortable"
            menu-icon=""
            placeholder="Search Google or type a URL"
            prepend-inner-icon="mdi-magnify"
            theme="light"
            variant="solo"
            auto-select-first
            item-props
            rounded
          ></v-autocomplete>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .shape {
    border-radius: 8px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px; /* Adiciona algum padding se necessário */
  }
  
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  .bg-dark {
    background-color: #ACACAC;
  }
  
  .autocomplete {
    max-width: 450px;
    width: 100%;
    max-height: 50px;
  }
  </style>
  