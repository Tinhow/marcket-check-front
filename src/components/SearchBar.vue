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
      item-title="nome_produto"
      item-value="id"
      :items="uniqueProducts"
      rounded
    ></v-autocomplete>

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
          <img :src="selectedProductData.image_url" class="image" />
        </div>
        <div
          class="product-info px-2 my-2 d-flex flex-column justify-space-between"
        >
          <div>
            <p class="my-2 text-h4">{{ selectedProductData.nome_produto }}</p>
            <p class="mt-6 text-h6">
              <strong>Categoria:</strong> {{ selectedProductData.categoria }}
            </p>
            <p class="my-7 text-red text-h5">
              <strong>Preço:</strong> {{ selectedProductData.preco }}
            </p>
          </div>
          <div class="mb-5">
            <v-btn
              class="bg-primary mr-2"
              @click="addFavorite(selectedProductData)"
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

    <div class="my-3 text-white"><h2>Produtos Semalhantes</h2></div>
    <div v-if="selectedProduct && otherProducts.length">
      <v-card class="product-card px-5">
        <div
          v-for="product in otherProducts"
          :key="product.id"
          class="other-product-item"
        >
          <div class="mt-5">
            <img :src="product.image_url" class="product-image-small" />
          </div>
          <v-divider color="white" class="mr-5 ml-10" vertical></v-divider>
          <div class="product-info-small">
            <p class="my-2 text-h5">{{ product.nome_produto }}</p>
            <p class="text-h6">
              <strong>Categoria:</strong> {{ product.categoria }}
            </p>
            <p class="my-3 text-red text-h6">
              <strong>Preço:</strong> {{ product.preco }}
            </p>
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

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      location="top"
      position="fixed"
      :color="snackbarColor"
    >
      {{ snackbarText }}
      <template #actions>
        <v-btn color="white" variant="text" @click="snackbar = false">X</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import api, { Product } from "@/services/api"; // Importando o Axios configurado

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};

const products = ref<Product[]>([]);
const selectedProduct = ref<number | null>(null);
const selectedProductData = ref<Product | null>(null);
const otherProducts = ref<Product[]>([]);
const snackbar = ref<boolean>(false);
const snackbarText = ref<string>("");
const timeout = ref<number>(3000);
const snackbarColor = ref<string>("info");

const uniqueProducts = computed(() => {
  const productMap = new Map<string, Product>();
  products.value.forEach((product) => {
    if (!productMap.has(product.nome_produto)) {
      productMap.set(product.nome_produto, product);
    }
  });
  return Array.from(productMap.values());
});

const fetchProducts = async () => {
  try {
    const response = await api.get<Product[]>("/produtos.json"); // Usando Axios
    products.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

const addFavorite = async (product: Product) => {
  try {
    const response = await api.post(`/favoritos/${product.id}/add`, {
      id: product.id,
    });

    if (response.status !== 200) {
      throw new Error("Erro ao favoritar produto");
    }

    snackbarText.value = `Produto ${product.nome_produto} adicionado aos favoritos com sucesso`;
    snackbar.value = true;
    snackbarColor.value = "success";
  } catch (error) {
    console.error("Erro ao favoritar produto:", error);
    snackbarText.value = "Erro ao adicionar produto aos favoritos";
    snackbar.value = true;
    snackbarColor.value = "red";
  }
};

watch(selectedProduct, (newValue) => {
  if (newValue !== null) {
    selectedProductData.value = products.value.find(
      (product) => product.id === newValue,
    );

    const selectedProductName = selectedProductData.value?.nome_produto
      .toLowerCase()
      .split(" ")[0];
    const filteredProducts = products.value.filter((product) =>
      product.nome_produto.toLowerCase().startsWith(selectedProductName),
    );

    const sortedProducts = filteredProducts.sort((a, b) => a.preco - b.preco);
    selectedProductData.value = sortedProducts[0];
    otherProducts.value = sortedProducts.slice(1);
  } else {
    selectedProductData.value = null;
    otherProducts.value = [];
  }
});

// Chama a função para buscar os produtos ao iniciar o componente
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
  max-width: 700px;
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
