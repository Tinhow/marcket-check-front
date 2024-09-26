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
      <p class="mt-4 text-white">
        Não possui uma conta?
        <router-link to="/register" class="text-white">Registre-se</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios"; // Importar axios para requisições HTTP
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post("http://127.0.0.1:3000/users/sign_in", {
      user: {
        email: email.value,
        password: password.value,
      },
    });

    // Se a autenticação for bem-sucedida, redireciona para a página inicial
    if (response.status === 200) {
      router.push("/");
    }
  } catch (err) {
    error.value = "Falha ao autenticar. Verifique suas credenciais."; // Exibir mensagem de erro
    console.error(err);
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
