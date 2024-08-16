<template>
  <div class="bg-dark p-2 shape">
    <div class="input-container d-flex">
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
        :items="products"
        v-model="selectedProduct"
        rounded
      ></v-autocomplete>

      <v-checkbox
        v-model="isAscending"
        label="Ordenar por preço crescente"
        @change="fetchProducts"
        class="mb-10 checkbox"
      ></v-checkbox>
    </div>

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
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const products = ref([]);
const selectedProduct = ref(null);
const selectedProductData = ref(null);
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

watch(isAscending, () => {
  fetchProducts();
});


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

.mb-10 {
  margin-bottom: 10px;
}

.bg-dark {
  background-color: #ACACAC;
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
}

.autocomplete {
  max-width: 450px;
  width: 100%;
  max-height: 50px;
}

.checkbox {
  margin-left: 5px;
  display: flex;
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

.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-items: center;
}

</style>