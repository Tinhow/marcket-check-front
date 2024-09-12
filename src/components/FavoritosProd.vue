<template>
  <div class="shape bg-dark p-2">
    <div class="d-flex justify-center">
      <h2 class="mx-2 my-2 text-white">Meus Favoritos</h2>
    </div>
    <div class="d-flex product-details-container">
      <div
        v-for="produto in favoritos"
        :key="produto.id"
        class="product-details d-flex mt-2"
      >
        <v-card class="product-card d-flex">
          <div class="d-flex">
            <v-img :src="produto.imagem" class="product-image my-10" />
            <v-card-title class="d-flex flex-column p-0 m-0">
              <v-card-title>{{ produto.nome }}</v-card-title>
              <v-card-text>
                <p><strong>Descrição:</strong> {{ produto.descricao }}</p>
                <p><strong>Categoria:</strong> {{ produto.categoria }}</p>
                <p><strong>Marca:</strong> {{ produto.marca }}</p>
                <p>
                  <strong>Unidade de Medida:</strong>
                  {{ produto.unidade_de_medida }}
                </p>
                <p>
                  <strong>Disponibilidade:</strong>
                  {{ produto.disponibilidade ? "Disponível" : "Indisponível" }}
                </p>
                <p><strong>Avaliações:</strong> {{ produto.avaliacoes }}</p>
                <p>
                  <strong>Nome do Mercado:</strong> {{ produto.nome_mercado }}
                </p>
                <h2 class="text-red my-3">
                  <strong>Preço:</strong> {{ produto.preco }}
                </h2>
                <div class="mb-5">
                  <v-btn class="bg-red mr-2" @click="removeFavorite(produto)">
                    Remover
                  </v-btn>
                  <v-btn class="bg-green mx-2">Rotas</v-btn>
                  <v-btn class="bg-yellow mx-2">Compartilhar</v-btn>
                </div>
              </v-card-text>
            </v-card-title>
          </div>
        </v-card>
      </div>
    </div>
    <div v-if="!favoritos.length">
      <p class="text-center text-white">Nenhum produto favoritado</p>
      <div>
        <img class="img" src="@/assets/favorites.png" alt="Logo" />
      </div>
    </div>

    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      color="success"
      location="top"
    >
      {{ snackbarMessage }}
      <template #action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const favoritos = ref([]);
const snackbar = ref(false); // control visibility of snackbar
const snackbarMessage = ref(""); // holds the snackbar message

async function getFavoritos() {
  try {
    const response = await fetch("http://127.0.0.1:3000/favoritos.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      favoritos.value = data;
    } else {
      console.error("Erro ao buscar favoritos:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
  }
}

async function removeFavorite(produto) {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/favoritos/${produto.id}/remove`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      // Update the favoritos list to remove the deleted product
      favoritos.value = favoritos.value.filter((f) => f.id !== produto.id);

      // Show success message in snackbar
      snackbarMessage.value = `${produto.nome} foi removido dos favoritos.`;
      snackbar.value = true;
    } else {
      console.error("Erro ao remover favorito:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
  }
}

onMounted(() => {
  getFavoritos();
});
</script>

<style scoped>
.shape {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 8px;
  overflow-y: auto;
  border: 2px solid #acacac;
  margin-left: 10px;
  margin-right: 10px;
}
.bg-dark {
  background-color: #acacac;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-card {
  margin-right: 20px;
  margin-bottom: 16px;
  margin-top: 16px;
  min-width: 600px;
  height: 300px;
  border-radius: 8px;
}

.product-image {
  height: auto;
  max-height: 200px;
  width: 250px;
}

.product-details-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex: 1;
}

.shape::-webkit-scrollbar {
  width: 8px;
}

.shape::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.shape::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.img {
  height: 400px !important;
  width: auto !important;
  border-radius: 8px;
  background-color: transparent !important;
  margin-bottom: 200px;
}
</style>
