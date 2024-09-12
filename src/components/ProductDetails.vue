<template>
  <div class="bg-dark p-2 shape overflow-auto">
    <div>
      <h1 class="text-white">Detalhes do produto</h1>
    </div>
    <div v-if="product">
      <v-card class="product-card px-5">
        <div class="product-info">
          <div class="product-details-container">
            <div class="product-image pt-5 px-10 mt-5 justify-center">
              <img
                :src="product.image_url"
                class="image"
                alt="Imagem do produto"
              />
            </div>
            <div class="product-description">
              <h2 class="my-3">{{ product.nome_produto }}</h2>
              <p><strong>Categoria:</strong> {{ product.categoria }}</p>
              <p><strong>Marca:</strong> {{ product.marca }}</p>
              <p>
                <strong>Unidade de Medida:</strong>
                {{ product.unidade_de_medida }}
              </p>
              <p>
                <strong>Disponibilidade:</strong>
                {{ product.disponibilidade ? "Disponível" : "Indisponível" }}
              </p>
              <p><strong>Avaliações:</strong> {{ product.avaliacoes }}</p>
              <p>
                <strong>Nome do Mercado:</strong> {{ product.nome_mercado }}
              </p>
              <h2 class="text-red my-2">
                <strong>Preço:</strong> {{ product.preco }}
              </h2>
              <div class="mb-5">
                <v-btn class="bg-primary mr-2" @click="addFavorite(product)"
                  >Favoritar</v-btn
                >
                <v-btn class="bg-green mx-2">Rotas</v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    <div v-else class="not-found-container">
      <div class="not-found-content">
        <h1 class="text-white">Produto não encontrado</h1>
        <img class="not-found-image" src="@/assets/favorites.png" alt="Logo" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const product = ref(null);
const route = useRoute();
const productId = Number(route.params.id);
const similarProducts = ref([]);

async function fetchProduct() {
  try {
    const response = await fetch("http://127.0.0.1:3000/produtos.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();
    product.value = products.find((p) => p.id === productId);

    if (product.value) {
      similarProducts.value = products.filter(
        (p) => p.id !== productId && p.nome === product.value.nome,
      );
    }
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
  }
}

async function addFavorite(product) {
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

    console.log(`Produto ${product.nome} adicionado aos favoritos com sucesso`);
  } catch (error) {
    console.error("Erro ao favoritar produto:", error);
  }
}

onMounted(() => {
  fetchProduct();
});
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

.product-info {
  display: flex;
  flex-direction: column;
  min-height: 280px;
}

.product-card {
  margin-right: 20px;
  margin-bottom: 16px;
  margin-top: 16px;
  min-width: 700px;
  max-width: 800px;
  height: auto;
  border-radius: 8px;
}

.product-details-container {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.product-image {
  height: 320px;
  width: 320px;
  object-fit: cover;
}

.product-description {
  flex: 1;
}

.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.not-found-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.not-found-image {
  margin-top: 10px;
  height: 500px;
}

.product-image {
  height: 100%;
  max-height: 250px;
  justify-content: center;
  justify-items: center;
}

.image {
  height: 270px;
  width: 220px;
}
</style>
