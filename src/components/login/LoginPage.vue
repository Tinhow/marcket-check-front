<template>
  <div class="bg-dark p-2 shape">
    <div class="div1">
      <img class="img" src="@/assets/login.svg" alt="Logo" />
    </div>
    <div class="div2 d-flex flex-column justify-center align-center">
      <div>
        <h1>Login</h1>
        <h3 class="mb-7 text-white form">Faça o Login com sua conta</h3>
      </div>
      <form @submit.prevent="login">
        <v-text-field
          v-model="email"
          class="form"
          label="Email"
          variant="outlined"
          base-color="black"
          bg-color="white"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Senha"
          variant="outlined"
          base-color="black"
          bg-color="white"
          type="password"
          required
        ></v-text-field>
        <v-btn type="submit" color="white" class="mt-4">Login</v-btn>
      </form>
      <p v-if="error" class="mt-4 text-red">{{ error }}</p>
      <p class="mt-4 text-white">
        Não possui uma conta?
        <router-link to="/register" class="text-white">Registre-se</router-link>
      </p>
    </div>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      location="top"
      position="fixed"
      :color="snackbarColor"
    >
      {{ snackbarText }}

      <template #actions>
        <v-btn color="white" variant="text" @click="snackbar = false">X</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const email = ref("");
const password = ref("");
const error = ref("");

const snackbar = ref(false);
const snackbarText = ref("");
const timeout = 3000;
const snackbarColor = ref("info");

const router = useRouter();
const authStore = useAuthStore();
const login = async () => {
  try {
    const response = await axios.post("http://127.0.0.1:3000/users/sign_in", {
      user: {
        email: email.value,
        password: password.value,
      },
    });
    console.log("Resposta da API:", response.data);
    if (response.status === 200) {
      snackbarText.value = "Logado com Sucesso";
      snackbar.value = true;
      snackbarColor.value = "green";
      const token = response.data.token;
      const user = response.data.user;
      authStore.login(token, user);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      snackbarText.value = "Falha ao autenticar. Verifique suas credenciais.";
      snackbar.value = true;
      snackbarColor.value = "red";
      throw new Error("Autenticação falhou. Sem token.");
    }
  } catch (err: any) {
    error.value = "Falha ao autenticar. Verifique suas credenciais.";
    console.error("Erro de autenticação:", err.message || err);
    snackbarText.value = "Falha ao autenticar. Verifique suas credenciais.";
    snackbar.value = true;
    snackbarColor.value = "red";
  }
};
</script>

<style scoped>
.shape {
  height: 100%;
  border-radius: 8px;
  margin-left: 10px !important;
  margin-right: 10px !important;
  display: flex;
}

.div1 {
  height: 100%;
  width: 70%;
  justify-content: center;
  align-items: center;
  display: flex;
}

.div2 {
  height: 100%;
  width: 30%;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  display: flex;
  flex-direction: column;
}

.bg-dark {
  background-color: #acacac;
}

h1,
h3,
p {
  color: #fff;
}

.p-2 {
  padding-left: 8px !important;
}

.img {
  height: 100%;
  width: auto;
  border-radius: 8px;
  background-color: transparent !important;
}
.form {
  width: 217px !important;
}
</style>
