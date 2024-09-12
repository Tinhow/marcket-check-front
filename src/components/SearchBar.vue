<template>
  <div class="bg-dark p-2 shape overflow-auto">
    <v-autocomplete
      v-model="selectedProduct"
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
      rounded
    ></v-autocomplete>

    <!-- Exibe uma imagem quando nenhum produto está selecionado -->
    <div v-if="!selectedProduct">
      <div class="justify-center align-center">
        <h2 class="text-center text-white">Faça sua pesquisa!</h2>
        <img
          src="@/assets/search.png"
          alt="Nenhum produto selecionado"
          class="img"
        />
      </div>
    </div>

    <div v-if="selectedProduct && selectedProductData" class="d-flex">
      <v-card class="product-card d-flex">
        <div class="product-image pt-5 px-10 mt-5 justify-center">
          <img :src="selectedProductData.imagem" class="image" />
        </div>
        <div class="product-info px-2 my-2">
          <h3>{{ selectedProductData.descricao }}</h3>
          <p><strong>Descrição:</strong> {{ selectedProductData.descricao }}</p>
          <p><strong>Categoria:</strong> {{ selectedProductData.categoria }}</p>
          <p><strong>Marca:</strong> {{ selectedProductData.marca }}</p>
          <p><strong>Preço:</strong> {{ selectedProductData.preco }}</p>
          <p>
            <strong>Unidade de Medida:</strong>
            {{ selectedProductData.unidade_de_medida }}
          </p>
          <p>
            <strong>Disponibilidade:</strong>
            {{
              selectedProductData.disponibilidade
                ? "Disponível"
                : "Indisponível"
            }}
          </p>
          <p>
            <strong>Avaliações:</strong> {{ selectedProductData.avaliacoes }}
          </p>
          <p>
            <strong>Nome do Mercado:</strong>
            {{ selectedProductData.nome_mercado }}
          </p>
          <div class="my-1">
            <v-btn class="bg-primary mr-2" @click="addFavorite(product)"
              >Favoritar</v-btn
            >
            <v-btn
              class="bg-green"
              @click="navigateTo(`/products/${selectedProductData.id}`)"
              >Visualizar</v-btn
            >
          </div>
        </div>
      </v-card>
    </div>

    <div v-if="selectedProduct && otherProducts.length">
      <v-card class="product-card px-5">
        <h2 class="my-3">Outros produtos: {{ selectedProductData?.nome }}</h2>
        <div
          v-for="product in otherProducts"
          :key="product.id"
          class="other-product-item"
        >
          <div class="mt-5">
            <img :src="product.imagem" class="product-image-small" />
          </div>
          <v-divider color="white" class="mr-5 ml-10" vertical></v-divider>
          <div class="product-info-small">
            <h4>{{ product.nome }}</h4>
            <p><strong>Descrição:</strong> {{ product.descricao }}</p>
            <p><strong>Categoria:</strong> {{ product.categoria }}</p>
            <p><strong>Marca:</strong> {{ product.marca }}</p>
            <p><strong>Preço:</strong> {{ product.preco }}</p>
            <p>
              <strong>Unidade de Medida:</strong>
              {{ product.unidade_de_medida }}
            </p>
            <p>
              <strong>Disponibilidade:</strong>
              {{ product.disponibilidade ? "Disponível" : "Indisponível" }}
            </p>
            <p><strong>Nome do Mercado:</strong> {{ product.nome_mercado }}</p>
            <div class="my-2">
              <v-btn class="bg-primary mr-2" @click="addFavorite(product)"
                >Favoritar</v-btn
              >
              <v-btn
                class="bg-green"
                @click="navigateTo(`/products/${product.id}`)"
                >Visualizar</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
const products = ref([]);
const selectedProduct = ref(null);
const selectedProductData = ref(null);
const otherProducts = ref([]);

const uniqueProducts = computed(() => {
  const productMap = new Map();
  products.value.forEach((product) => {
    if (!productMap.has(product.nome)) {
      productMap.set(product.nome, product);
    }
  });
  return Array.from(productMap.values());
});

async function fetchProducts() {
  try {
    const response = await fetch("http://127.0.0.1:3000/produtos.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    products.value = await response.json();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}

watch(selectedProduct, (newValue) => {
  if (newValue !== null) {
    selectedProductData.value = products.value.find(
      (product) => product.id === newValue,
    );
    const filteredProducts = products.value.filter(
      (product) => product.nome === selectedProductData.value?.nome,
    );
    const sortedProducts = filteredProducts.sort((a, b) => a.preco - b.preco);
    selectedProductData.value = sortedProducts[0];
    otherProducts.value = sortedProducts.slice(1);
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
  background-color: #acacac;
}

.autocomplete {
  max-width: 450px;
  width: 100%;
  max-height: 50px;
}

.product-image {
  height: 100%;
  max-height: 250px;
  justify-content: center;
  justify-items: center;
}

.image {
  height: 220px;
  width: 200px;
}
.product-card {
  margin-right: 20px;
  margin-bottom: 16px;
  margin-top: 16px;
  min-width: 700px;
  height: auto;
  border-radius: 8px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 280px;
}

.product-image-small {
  height: 150px;
  width: 130px;
}

.other-products {
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  max-width: 800px;
  font-size: 16px;
  width: 700px;
  min-width: 450px;
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

.img {
  height: 400px !important;
  width: auto !important;
  border-radius: 8px;
  background-color: transparent !important;
  margin-bottom: 200px;
}
</style>
