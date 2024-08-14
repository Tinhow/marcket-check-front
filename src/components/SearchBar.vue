<template>
  <div class="bg-dark p-2 shape">
    <v-autocomplete
      class="autocomplete"
      density="comfortable"
      menu-icon=""
      placeholder="Pesquise por produtos"
      prepend-inner-icon="mdi-magnify"
      theme="light"
      variant="solo"
      auto-select-first
      item-title="nome"
      item-value="id"
      :items="products"
      v-model="selectedProduct"
      rounded
    ></v-autocomplete>

    <div v-if="selectedProductData" class="product-details">
      <h3>{{ selectedProductData.nome }}</h3>
      <p><strong>Descrição:</strong> {{ selectedProductData.descricao }}</p>
      <p><strong>Categoria:</strong> {{ selectedProductData.categoria }}</p>
      <p><strong>Marca:</strong> {{ selectedProductData.marca }}</p>
      <p><strong>Preço:</strong> {{ selectedProductData.preco }}</p>
      <p><strong>Unidade de Medida:</strong> {{ selectedProductData.unidade_de_medida }}</p>
      <p><strong>Disponibilidade:</strong> {{ selectedProductData.disponibilidade ? 'Disponível' : 'Indisponível' }}</p>
      <p><strong>Avaliações:</strong> {{ selectedProductData.avaliacoes }}</p>
      <p><strong>Nome do Mercado:</strong> {{ selectedProductData.nome_mercado }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const products = ref([]);
const selectedProduct = ref(null);
const selectedProductData = ref(null);

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

watch(selectedProduct, (newValue) => {
  if (newValue !== null) {
    selectedProductData.value = products.value.find(product => product.id === newValue);
  } else {
    selectedProductData.value = null;
  }
});

fetchProducts();
</script>

<style scoped>
.shape {
  border-radius: 8px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}

.bg-dark {
  background-color: #ACACAC;
}

.autocomplete {
  max-width: 450px;
  width: 100%;
  max-height: 50px;
}

.product-details {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}
</style>