<template>
<div class="list-product-container">
    <div v-for="product in paginatedProducts" class="list-product">
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
    <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
    <span>Página {{ currentPage }} de {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const products = ref([]);
const selectedProduct = ref(null);
const selectedProductData = ref(null);

// Configurações de paginação
const currentPage = ref(1);
const itemsPerPage = ref(9); // Número de produtos por página definido como 9

// Função para buscar produtos
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
.list-product-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  justify-items: center;
  margin-top: 20px;
}

.list-product {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  width: 100%;
  max-width: 250px; 
  box-sizing: border-box;
}

.product-details {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  max-width: 450px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
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
</style>