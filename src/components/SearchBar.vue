<template>
    <div class="bg-dark p-2 shape">
          <v-autocomplete
            class="autocomplete"
            density="comfortable"
            menu-icon=""
            placeholder="Pequise por produtos"
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
    padding: 15px;
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
  