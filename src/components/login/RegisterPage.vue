<template>
  <div class="bg-dark p-2 shape">
    <div class="div1">
      <img class="img" src="@/assets/login.svg" alt="Logo" />
    </div>
    <div class="div2 d-flex flex-column">
      <div>
        <div cols="12">
          <h1>Registro</h1>
          <h3 class="mb-7 text-white">Faça o Registro com sua conta!</h3>
        </div>
      </div>
      <div>
        <v-text-field
          v-model="email"
          label="Email"
          variant="outlined"
          base-color="black"
          bg-color="white"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Senha"
          type="password"
          variant="outlined"
          base-color="black"
          bg-color="white"
          required
        ></v-text-field>
        <v-text-field
          v-model="passwordConfirmation"
          label="Confirme a Senha"
          type="password"
          variant="outlined"
          base-color="black"
          bg-color="white"
          required
        ></v-text-field>
        <v-btn class="bg-white" @click="registerUser">Registrar</v-btn>
        <p>
          Possui uma conta? <router-link to="/login">Faça Login</router-link>
        </p>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const router = useRouter();

const registerUser = async () => {
  try {
    const response = await axios.post("http://127.0.0.1:3000/users", {
      user: {
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      },
    });

    if (response.status === 200) {
      router.push("/login");
    }
  } catch (error) {
    console.error("Erro ao registrar o usuário:", error);
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
h3,
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
