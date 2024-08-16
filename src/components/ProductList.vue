<template>
  <div class="shape bg-dark p-2">
    <h1 class="title text-white">Listagem de Produtos</h1>
    <div class="D-flex" style="flex-direction: row;">
    <v-checkbox
        v-model="isAscending"
        label="Ordenar por preço crescente"
        @change="fetchProducts"
        class="mb-10 checkbox"
      ></v-checkbox>
    </div>
    <div class="product-details-container mx-2">
      <div :key="product.id" v-for="product in paginatedProducts" class="product-details d-flex mt-2">
        <div class="product-image py-8 px-2">
          <img :src="product.imagem"> 
        </div>
        <div class="product-info px-2">
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

const products = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(8); 

const isAscending = ref(false);

async function fetchProducts() {
  const orderQuery = isAscending.value ? 'preco_crescente' : 'preco_decrescente';
  const url = `http://localhost:3000/produtos.json?order=${orderQuery}&commit=Search`;

  try {
    const response = await fetch(url);
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

.product-details {
  margin-top: 20px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  font-size: 18px;
  width: 600px;
  max-height: 350px;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.product-info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  
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

.product-image {
  height: 320px;
  width: 320px;
}

.product-info {
  flex: 1; 
  display: flex;
  flex-direction: column; 
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
