<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div class="shape bg-dark p-2">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="mx-2 my-2 text-white">Meu Carrinho</h2>
      <v-btn
        class="bg-blue text-white"
        @click="organizarCaminho"
        icon
      >
        <v-icon>mdi-sort-ascending</v-icon> <!-- Você pode usar um ícone de sua preferência -->
      </v-btn>
    </div>

    <div class="d-flex product-details-container">
      <div
        v-for="produto in produtos"
        v-if="produtos.length"
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
              <strong>Ordem na prateleira:</strong> {{ produto.indicacao_no_mercado }}
            </p>
            <p class="text-red my-2 text-h6">
              <strong>Preço:</strong> {{ produto.preco }}
            </p>
            <div class="mb-4 mt-auto">
              <v-btn
                class="bg-red mr-2 mt-2"
                @click="removeProdCarrinho(produto)"
                >Remover</v-btn
              >
              <v-btn
                class="bg-green mr-2 mt-2"
                @click="navigateTo(produto.link_to_item)"
                >Supermercado</v-btn
              >
            </div>
          </div>
        </v-card>
      </div>

      <!-- Se não houver produtos, exibe mensagem -->
      <div v-else>
        <p class="text-center text-white">Nenhum produto no carrinho.</p>
        <div>
          <img class="img" src="@/assets/favorites.png" alt="Logo" />
        </div>
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
import { ref, watch } from "vue";
import api from "@/services/api"; // Importe a instância do axios configurado com cache e token
import { useAuthStore } from "@/store/auth";

const produtos = ref([]);
const snackbar = ref(false);
const snackbarMessage = ref("");

const authStore = useAuthStore();

// Função para organizar o caminho
async function organizarCaminho() { 
  try {
    const response = await api.get("/carrinhos/organizar_caminho", {
      withCredentials: true, // Adicione isso se necessário para autenticação
    });

    if (response.status === 200) {
      // Ordena os produtos pela fileira antes de atualizar a lista
      produtos.value = response.data.itens.sort((a, b) => a.fileira_numero - b.fileira_numero);
      
      console.log("Produtos organizados:", produtos.value);

      // Exibe mensagem de sucesso
      snackbarMessage.value = "Caminho organizado com sucesso!";
      snackbar.value = true;
    } else {
      snackbarMessage.value = "Erro ao organizar o caminho.";
      snackbar.value = true;
    }
  } catch (error) {
    console.error("Erro ao organizar o caminho:", error);
    snackbarMessage.value = "Erro ao organizar o caminho.";
    snackbar.value = true;
  }
}



async function getCarrinho() {
  try {
    const userId = authStore.user?.id;
    console.log(authStore.user?.id);
    const response = await api.get(`/carrinhos/${userId}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      produtos.value = response.data.itens;
      snackbarMessage.value = "Carrinho carregado com sucesso!";
      snackbar.value = true;
      console.log("Produtos no carrinho:", produtos.value);
    } else {
      console.error("Erro ao buscar produtos:", response.statusText);
      snackbarMessage.value = "Erro ao carregar o carrinho.";
      snackbar.value = true;
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.error("Usuário não autorizado. Faça login novamente.");
      snackbarMessage.value = "Usuário não autorizado. Faça login novamente.";
    } else {
      console.error("Erro ao buscar produtos:", error.message);
      snackbarMessage.value = "Erro ao carregar o carrinho.";
    }
    snackbar.value = true;
  }
}

import { nextTick } from 'vue';

async function removeProdCarrinho(produto: any) {
  try {
    const response = await api.delete(`/carrinho/remover_produto/${produto.id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // Encontrar o índice do produto a ser removido
      const index = produtos.value.findIndex((p: any) => p.id === produto.id);
      if (index !== -1) {
        produtos.value.splice(index, 1); // Remove o produto do array
        snackbarMessage.value = `${produto.nome_produto} foi removido dos produtos.`;
        snackbar.value = true;
      }
    } else {
      console.error("Erro ao remover produto:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao remover produto:", error);
  }
}





function initialize() {
  getCarrinho();
}

initialize();

watch(produtos, (newValue, oldValue) => {
  // Verifica se newValue e oldValue estão definidos e têm a propriedade length
  if (Array.isArray(newValue) && Array.isArray(oldValue)) {
    if (newValue.length !== oldValue.length) {
      getCarrinho();
    }
  }
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
