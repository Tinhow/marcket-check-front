<template>
  <div class="bg-dark p-2 shape overflow-auto">
    <v-autocomplete
      class="autocomplete mb-10"
      density="comfortable"
      menu-icon=""
      placeholder="Pesquise por produtos"
      prepend-inner-icon="mdi-magnify"
      theme="light"
      variant="solo"
      auto-select-first
      item-title="nome"
      item-value="id"
      :items="uniqueProducts"
      v-model="selectedProduct"
      rounded
    ></v-autocomplete>

    <div v-if="selectedProductData" class="product-details d-flex">
      <div>
        <img :src="selectedProductData.imagem" class="product-image"> 
      </div>
      <div class="product-info"> 
        <h2>{{ selectedProductData.nome }}</h2>
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

    <div v-if="otherProducts.length" class="other-products">
      <h2 class="my-3">Outros produtos: {{ selectedProductData?.nome }}</h2>
      <div v-for="product in otherProducts" :key="product.id" class="other-product-item">
        <div class="mt-5">
          <img :src="product.imagem" class="product-image-small"> 
        </div>
        <div class="product-info-small"> 
          <h4>{{ product.nome }}</h4>
          <p><strong>Descrição:</strong> {{ product.descricao }}</p>
          <p><strong>Categoria:</strong> {{ product.categoria }}</p>
          <p><strong>Marca:</strong> {{ product.marca }}</p>
          <p><strong>Preço:</strong> {{ product.preco }}</p>
          <p><strong>Unidade de Medida:</strong> {{ product.unidade_de_medida }}</p>
          <p><strong>Disponibilidade:</strong> {{ product.disponibilidade ? 'Disponível' : 'Indisponível' }}</p>
          <p><strong>Nome do Mercado:</strong> {{ product.nome_mercado }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const products = ref([]);
const selectedProduct = ref(null);
const selectedProductData = ref(null);
const otherProducts = ref([]);

const uniqueProducts = computed(() => {
  const productMap = new Map();
  products.value.forEach(product => {
    if (!productMap.has(product.nome)) {
      productMap.set(product.nome, product);
    }
  });
  return Array.from(productMap.values());
});

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

    otherProducts.value = products.value
      .filter(product => 
        product.nome === selectedProductData.value?.nome &&
        product.id !== selectedProductData.value.id
      )
      .sort((a, b) => b.preco - a.preco);
  } else {
    selectedProductData.value = null;
    otherProducts.value = [];
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
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  max-width: 800px;
  font-size: 18px;
  width: 700px;
}

.product-info {
  margin-left: 20px;
}

.product-image {
  height: 320px;
  width: 320px;
}

.product-image-small {
  height: 100px;
  width: 100px;
}

.other-products {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  max-width: 800px;
  font-size: 16px;
  width: 700px;
}

.other-product-item {
  display: flex;
  margin-bottom: 20px;
}

.product-info-small {
  margin-left: 10px;
}

.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-items: center;
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
