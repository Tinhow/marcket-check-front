<template>
  <div class="bg-dark p-2 shape">
    <div class="div1">
      <img class="img" src="@/assets/login.svg
      " alt="Logo" />
    </div>
    <div class="div2 d-flex flex-column">
      <div>
        <div cols="12"> 
          <h1>Login</h1>
          <h3 class="mb-7 text-white">Faça o Login com sua conta</h3>
        </div>
      </div>
      <div>
        <v-text-field 
        label="Email" 
        variant="outlined"
        base-color="black"
        bg-color="white"
        ></v-text-field>
        <v-text-field 
        label="Senha"
        variant="outlined"
        base-color="black"
        bg-color="white">
        </v-text-field>
        <p>Não possui uma conta? <router-link to="/register">Registre-se</router-link></p>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.shape {
  height: 100%;
  border-radius: 8px;
  margin-left: 10px !important;
  margin-right: 10px !important;
  display: flex;
}

.div1 {
  height: 100% !important;
  width: 70% !important;
  justify-content: center;
  align-items: center;
  display: flex;
}

.div2 {
  height: 100% !important;
  width: 30% !important;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  display: flex;
}

.bg-dark {
  background-color: #acacac;
}

h1,
h2,
p {
  color: #fff;
}

.p-2 {
  padding-left: 8px !important;
}

.img {
  height: 100% !important;
  width: auto !important;
  border-radius: 8px;
  background-color: transparent !important;
}
</style>
