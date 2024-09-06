<template>
  <div class="shape bg-dark p-2">
    <h1 class="title text-white">Lista de Produtos</h1>
    <div class="product-details-container mx-2">
      <div :key="product.id" v-for="product in paginatedProducts" class="d-flex mt-2">
        <v-card class="product-card d-flex">
        <div class="product-image py-6 px-2 justify-center">
          <img :src="product.imagem"> 
        </div>
        <div class="product-info px-2 my-2">
          <h3>{{ product.nome }}</h3>
          <p><strong>Descrição:</strong> {{ product.descricao }}</p>
          <p><strong>Categoria:</strong> {{ product.categoria }}</p>
          <p><strong>Marca:</strong> {{ product.marca }}</p>
          <p><strong>Preço:</strong> {{ product.preco }}</p>
          <p><strong>Unidade de Medida:</strong> {{ product.unidade_de_medida }}</p>
          <p><strong>Disponibilidade:</strong> {{ product.disponibilidade ? 'Disponível' : 'Indisponível' }}</p>
          <p><strong>Avaliações:</strong> {{ product.avaliacoes }}</p>
          <p><strong>Nome do Mercado:</strong> {{ product.nome_mercado }}</p>
          <div class="my-1">
            <v-btn class="bg-primary mr-2" @click="addFavorite(product)">Favoritar</v-btn>
            <v-btn class="bg-green" @click="navigateTo(`/products/${product.id}`)"
            >vizualizar
            </v-btn>
          </div>
        </div>
        </v-card>
      </div>
    </div>
    <div class="pagination">
      <span class="text-white mx-1">Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        :class="{ 'enabled-button': currentPage > 1 }"
        class="mx-1 bt"
      >Anterior</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const navigateTo = (path) => {
  router.push(path);
};
const products = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(8); 

async function fetchProducts() {
  try {
    const response = await fetch('http://127.0.0.1:3000/produtos.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    products.value = await response.json();
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
}

async function addFavorite(product) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/favoritos/${product.id}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ id: product.id }),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao favoritar produto');
    }
    
    console.log(`Produto ${product.nome} adicionado aos favoritos com sucesso`);
  } catch (error) {
    console.error('Erro ao favoritar produto:', error);
  }
}

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return products.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(products.value.length / itemsPerPage.value);
});

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

fetchProducts();
</script>

<style scoped>
.shape {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  overflow-y: auto;
  border: 2px solid #ACACAC;
  margin-left: 10px;
  margin-right: 10px;

}

.product-details-container {
  display: flex;
  flex-wrap: wrap; 
  justify-content: center;
  flex: 1;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}

.pagination button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 1rem;
}

.bg-dark {
  background-color: #ACACAC;
}

.enabled-button {
  background-color: #da0707 !important; 
}

.product-image {
  height: auto;
  max-height: 200px;
  width: 250px;
  justify-content: center;
  justify-items: center;
}

.product-card {
  margin-right: 20px;
  margin-bottom: 16px;
  margin-top: 16px; 
  min-width: 600px; 
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
</style>
