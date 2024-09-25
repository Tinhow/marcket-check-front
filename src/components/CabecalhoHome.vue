<template>
  <header>
    <div>
      <h2>Marcket Check</h2>
    </div>
    <v-divider inset vertical />
    <div class="d-flex links">
      <v-hover v-slot="{ isHovering, props }">
        <router-link
          class="link mr-4"
          to="/"
          v-bind="props"
          :style="{
            backgroundColor: isHovering ? '#007bff' : 'transparent',
            borderRadius: '8px',
            padding: '5px 10px',
            color: isHovering ? 'white' : '#007bff',
          }"
        >
          <p>HOME</p>
        </router-link>
      </v-hover>

      <v-divider class="link mr-4" inset vertical />
      <v-hover v-slot="{ isHovering, props }">
        <router-link
          class="link mr-3"
          to="/search"
          v-bind="props"
          :style="{
            backgroundColor: isHovering ? '#007bff' : 'transparent',
            borderRadius: '8px',
            padding: '5px 10px',
            color: isHovering ? 'white' : '#007bff',
          }"
        >
          <p>PESQUISAR</p>
        </router-link>
      </v-hover>

      <v-divider class="link mr-4" inset vertical />
      <v-hover v-slot="{ isHovering, props }">
        <router-link
          class="link mr-3"
          to="/products"
          v-bind="props"
          :style="{
            backgroundColor: isHovering ? '#007bff' : 'transparent',
            borderRadius: '8px',
            padding: '5px 10px',
            color: isHovering ? 'white' : '#007bff',
          }"
        >
          <p>PRODUTOS</p>
        </router-link>
      </v-hover>
      <v-divider class="link mr-4" inset vertical />
      <v-hover v-slot="{ isHovering, props }">
        <router-link
          class="link mr-3"
          to="/favorites"
          v-bind="props"
          :style="{
            backgroundColor: isHovering ? '#007bff' : 'transparent',
            borderRadius: '8px',
            padding: '5px 10px',
            color: isHovering ? 'white' : '#007bff',
          }"
        >
          <p>FAVORITOS</p>
        </router-link>
      </v-hover>
      <v-divider class="link mr-4" inset vertical />
      <v-hover v-slot="{ isHovering, props }">
        <router-link
          class="link mr-3"
          to="/login"
          v-bind="props"
          :style="{
            backgroundColor: isHovering ? '#007bff' : 'transparent',
            borderRadius: '8px',
            padding: '5px 10px',
            color: isHovering ? 'white' : '#007bff',
          }"
        >
          <p>LOGIN</p>
        </router-link>
      </v-hover>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
header {
  padding: 0px !important;
  margin: 0px !important;
  display: flex;
  align-items: center;
}

div {
  padding: 0px !important;
  margin-right: 15px !important;
}

h2 {
  color: #007bff;
  margin-left: 15px !important;
}

.links {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.link {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.link p {
  margin: 0;
  text-align: center;
}
</style>
