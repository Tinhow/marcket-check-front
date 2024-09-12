<template>
  <div class="shape bg-dark p-2">
    <h1 class="title text-white">Lista de Produtos</h1>
    <div class="product-details-container mx-2">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="d-flex mt-2"
      >
        <v-card class="product-card d-flex">
          <div class="product-image py-9 px-2 mx-2 justify-center">
            <img :src="product.image_url" style="height: 170px; width: auto" />
          </div>
          <div class="product-info px-2 mt-5">
            <h4>{{ product.nome_produto }}</h4>
            <p><strong>Categoria:</strong> {{ product.categoria }}</p>
            <p>
              <strong>Marca:</strong> {{ product.marca || "Não disponível" }}
            </p>
            <p>
              <strong>Disponibilidade:</strong>
              {{ product.disponibilidade ? "Disponível" : "Indisponível" }}
            </p>
            <p>
              <strong>Avaliações:</strong>
              {{ product.avaliacoes || "Não disponível" }}
            </p>
            <p>
              <strong>Nome do Mercado:</strong>
              {{ product.nome_mercado || "Não disponível" }}
            </p>
            <p class="text-red my-2 text-h6">
              <strong>Preço:</strong> {{ product.preco }}
            </p>
            <div class="mb-4 mt-auto">
              <v-btn class="bg-primary mr-2" @click="addFavorite(product)"
                >Favoritar</v-btn
              >
              <v-btn class="bg-green" @click="navigateTo(product.link_to_item)"
                >Detalhes</v-btn
              >
            </div>
          </div>
        </v-card>
      </div>
    </div>
    <div class="pagination">
      <span class="text-white mx-1"
        >Página {{ currentPage }} de {{ totalPages }}</span
      >
      <button
        :disabled="currentPage === 1"
        :class="{ 'enabled-button': currentPage > 1 }"
        class="mx-1 bt"
        @click="prevPage"
      >
        Anterior
      </button>
      <button :disabled="currentPage === totalPages" @click="nextPage">
        Próxima
      </button>
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

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const navigateTo = (path) => {
  router.push(path);
};

const products = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(8);
const snackbar = ref(false);
const snackbarText = ref("");
const timeout = ref(3000);
const snackbarColor = ref("info");

const fetchProducts = async () => {
  try {
    const response = await fetch("http://127.0.0.1:3000/produtos.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const uniqueProducts = getLowestPricedProducts(data);
    products.value = uniqueProducts;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

const getLowestPricedProducts = (products) => {
  const productMap = new Map();

  products.forEach((product) => {
    if (!productMap.has(product.nome_produto)) {
      productMap.set(product.nome_produto, product);
    } else {
      const currentLowest = productMap.get(product.nome_produto);
      if (product.preco < currentLowest.preco) {
        productMap.set(product.nome_produto, product);
      }
    }
  });

  return Array.from(productMap.values());
};

const addFavorite = async (product) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/favoritos/${product.id}/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id: product.id }),
      },
    );

    if (!response.ok) {
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

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return products.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(products.value.length / itemsPerPage.value);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

onMounted(fetchProducts);
</script>
<style scoped>
.shape {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  overflow-y: auto;
  border: 2px solid #acacac;
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
  background-color: #acacac;
}

.enabled-button {
  background-color: #da0707 !important;
}

.product-card {
  margin-right: 20px;
  margin-bottom: 16px;
  margin-top: 16px;
  min-width: 600px;
  max-width: 600px;
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
