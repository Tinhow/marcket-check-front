<template>
  <div class="shape bg-dark p-2">
    <h1 class="title text-white">Listagem de Produtos</h1>
    <div class="product-container">
      <div :key="product.id" v-for="product in paginatedProducts" class="list-product mx-4 mt-2">
        <h3>{{ product.nome }}</h3>
        <p><strong>Descrição:</strong> {{ product.descricao }}</p>
        <p><strong>Categoria:</strong> {{ product.categoria }}</p>
        <p><strong>Marca:</strong> {{ product.marca }}</p>
        <p><strong>Preço:</strong> {{ product.preco }}</p>
        <p><strong>Unidade de Medida:</strong> {{ product.unidade_de_medida }}</p>
        <p><strong>Disponibilidade:</strong> {{ product.disponibilidade ? 'Disponível' : 'Indisponível' }}</p>
        <p><strong>Avaliações:</strong> {{ product.avaliacoes }}</p>
        <p><strong>Nome do Mercado:</strong> {{ product.nome_mercado }}</p>
      </div>
    </div>
    <div class="pagination">
      <span class="text-white mx-1">Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        :class="{ 'enabled-button': currentPage > 1 }"
        class="mx-1 bt"
      >Anterior
    </button>
    <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

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
  margin: 0 10px;
  border: 2px solid #ACACAC;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex: 1;
}

.list-product {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 250px;
  height: 270px;
  background-color: white;
  margin-bottom: 10px;
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
