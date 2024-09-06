<template>
    <div class="bg-dark p-2 shape">
        <div class="div1">
            <v-row>
            <v-col cols="12" md="6">
                <div class="d-flex">
                    <h2 class="mx-2 my-2">Meus Favoritos</h2>
             </div>     
            </v-col>
        </v-row>
    </div>
        <div class="div2">
            <img class="img" src="@/assets/favorites.png" alt="Logo" />
        </div>
        
    </div>

</template>
<script lang="ts" setup>


async function getFavoritos() {
    try {
        const response = await fetch('http://127.0.0.1:3000/favoritos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
    }

}
getFavoritos();
</script>

<style scoped>
    .shape {
        height: 100%;
        border-radius: 8px;
        margin-left: 10px !important;
        margin-right: 10px !important;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .div1 {
        display: flex;
        height: 100% !important;
        width: 70% !important;
    
    }
    .center {
        justify-content: center !important;
        align-items: center !important;
    }
    .div2 {
        display: flex;
        justify-content: center;
        align-items: center; 
        width: 40%; 
    }
    .bg-dark {
        background-color: #ACACAC;
    }
    h1, h2, p {
        color: #fff;
    }
    .p-2 {
        padding-left: 8px !important;
    }
    .img {
        height: auto;
        width: auto;
        max-width: 70%;
        border-radius: 8px;
        background-color: transparent !important;
    }
</style>

