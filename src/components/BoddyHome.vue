<template>
    <div class="bg-dark p-2 shape">
        <div class="div1">
            <v-row class="center">
            <v-col cols="12" md="6" class="center">
                <h1 class="">Encontre os melhores preços!</h1>
                <h2>
                    <router-link to="/search" >
                        <v-btn >Pesquisar</v-btn>
                    </router-link>
                </h2>
            </v-col>
        </v-row>
    </div>
        <div class="div2 ">
            <img class="img" src="@/assets/market3.png" alt="Logo" />
        </div>
        
    </div>

    
</template>
<script lang="ts" setup>
</script>

<style scoped>
    .shape {
        height: 100%;
        border-radius: 8px;
        margin-left: 10px !important;
        margin-right: 10px !important;
        display: flex;

    }
    .div1 {
        display: flex;
        height: 100% !important;
        width: 90% !important;
        justify-content: center;
        align-items: center;
        
    }
    .center {
        justify-content: center !important;
        align-items: center !important;
    }
    .div2 {
        height: 100% !important;
        width: 100% !important;
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
        height: 100% !important;
        width: auto !important;
        border-radius: 8px;
        background-color: transparent !important;
    }
</style>
