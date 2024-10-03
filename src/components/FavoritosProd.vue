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
          <div class="product-image py-9 px-2 mx-2 justify-center">
            <img :src="produto.image_url" style="height: 170px; width: auto" />
          </div>
          <div class="produto-info px-2 mt-5">
            <p class="text-h6">{{ produto.nome_produto }}</p>
            <p><strong>Categoria:</strong> {{ produto.categoria }}</p>
            <p>
              <strong>Marca:</strong> {{ produto.marca || "Não disponível" }}
            </p>
            <p>
              <strong>Disponibilidade:</strong>
              {{ produto.disponibilidade ? "Disponível" : "Indisponível" }}
            </p>
            <p>
              <strong>Avaliações:</strong>
              {{ produto.avaliacoes || "Não disponível" }}
            </p>
            <p>
              <strong>Nome do Mercado:</strong>
              {{ produto.nome_mercado || "Não disponível" }}
            </p>
            <p>
              <strong>Ordem na prateleira:</strong> {{ produto.indicacao_no_mercado }}
            </p>
            <p class="text-red my-2 text-h6">
              <strong>Preço:</strong> {{ produto.preco }}
            </p>
            <div class="mb-4 mt-auto">
              <v-btn class="bg-red mr-2 mt-2" @click="removeFavorite(produto)"
                >Remover</v-btn
              >
              <v-btn
                class="bg-blue mr-2 mt-2 text-white"
                @click="addCarrinho(produto)"
                >add CARRINHO</v-btn
              >
              <v-btn
                class="bg-green mr-2 mt-2"
                @click="navigateTo(produto.link_to_item)"
                >supermercado</v-btn
              >
            </div>
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
      <template #actions>
        <v-btn color="white" variant="text" @click="snackbar = false">X</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import api from "@/services/api"; // Importe a instância do axios configurado

const favoritos = ref([]);
const snackbar = ref(false);
const snackbarMessage = ref("");

async function getFavoritos() {
  try {
    // Realiza a requisição usando a instância do `api`
    const response = await api.get("/favoritos.json");

    if (response.status === 200) {
      favoritos.value = response.data;
    } else {
      console.error("Erro ao buscar favoritos:", response.statusText);
      snackbarMessage.value = "Erro ao carregar os favoritos.";
      snackbar.value = true;
    }
  } catch (error: any) {
    console.error("Erro ao buscar favoritos:", error.message);
    snackbarMessage.value = "Erro ao carregar os favoritos.";
    snackbar.value = true;
  }
}

async function removeFavorite(produto: { id: number; nome_produto: string }) {
  try {
    const response = await api.delete(`/favoritos/${produto.id}/remove`);

    if (response.status === 200) {
      favoritos.value = favoritos.value.filter((f) => f.id !== produto.id);
      snackbarMessage.value = `${produto.nome_produto} foi removido dos favoritos.`;
      snackbar.value = true;
    } else {
      console.error("Erro ao remover favorito:", response.statusText);
    }
  } catch (error: any) {
    console.error("Erro ao remover favorito:", error.message);
  }
}

async function addCarrinho(produto: any) {
  try {
    // Usando a instância do axios para adicionar ao carrinho
    const response = await api.post(
      `/produtos/${produto.id}/adicionar_ao_carrinho`,
    );

    if (response.status === 200) {
      favoritos.value = favoritos.value.filter((f) => f.id !== produto.id);
      snackbarMessage.value = `${produto.nome_produto} foi adicionado ao carrinho.`;
      snackbar.value = true;
    } else {
      console.error("Erro ao adicionar ao carrinho:", response.statusText);
    }
  } catch (error: any) {
    console.error("Erro ao adicionar ao carrinho:", error.message);
  }
}

onMounted(() => {
  getFavoritos();
});

const navigateTo = (link: string) => {
  if (link) {
    window.open(link, "_blank");
  } else {
    console.error("Link não fornecido");
  }
};
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
  min-width: 700px;
  max-width: 700px;
  height: auto;
  border-radius: 8px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 400px;
  min-height: 280px;
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
