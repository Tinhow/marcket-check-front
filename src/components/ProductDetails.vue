<template>
    <div class="bg-dark p-2 shape overflow-auto">
        <div>
            <h1 class="text-white">Detalhes do produto</h1>
        </div>
      <div v-if="product">
        <div class="product-info"> 
          <div class="product-details-container">
            <img :src="product.imagem" class="product-image" alt="Imagem do produto">
            <div class="product-description">
              <h2 class="my-3">{{ product.nome }}</h2>
                <p><strong>Descrição:</strong> {{ product.descricao }}</p>
                <p><strong>Categoria:</strong> {{ product.categoria }}</p>
                <p><strong>Marca:</strong> {{ product.marca }}</p>
                <p><strong>Preço:</strong> {{ product.preco }}</p>
                <p><strong>Unidade de Medida:</strong> {{ product.unidade_de_medida }}</p>
                <p><strong>Disponibilidade:</strong> {{ product.disponibilidade ? 'Disponível' : 'Indisponível' }}</p>
                <p><strong>Avaliações:</strong> {{ product.avaliacoes }}</p>
                <p><strong>Nome do Mercado:</strong> {{ product.nome_mercado }}</p>
                <h2 class="text-red my-2"><strong>Preço:</strong> {{ product.preco }}</h2>
                <div class="my-1">
                    <v-btn class="bg-primary" @click="addFavorite" >Favoritar</v-btn>
                </div>
            </div>
          </div>
        </div>
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
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const product = ref(null);
  const route = useRoute();
  const productId = Number(route.params.id);
  
  async function fetchProduct() {
    try {
      const response = await fetch('http://127.0.0.1:3000/produtos.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      product.value = products.find(p => p.id === productId);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
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
    background-color: #ACACAC;
  }
  
  .product-info {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    max-width: 800px;
    width: 100%;
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
  </style>
  