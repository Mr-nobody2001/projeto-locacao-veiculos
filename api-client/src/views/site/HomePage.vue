<template>
  <v-container class="pa-0 d-flex flex-column align-center" fluid>
    <v-card class="mt-2" style="width: 80%; position: fixed; z-index: 1" color="#5C6BC0">
      <v-row class="d-flex justify-center pt-10 pb-5">
        <v-col cols="5">
          <v-text-field
              label="Selecione uma data e hora de retirada"
              type="datetime-local"
              outlined
          ></v-text-field>
        </v-col>

        <v-col cols="5">
          <v-text-field
              label="Selecione uma data e hora de devolução"
              type="datetime-local"
              outlined
          ></v-text-field>
        </v-col>

        <v-col cols="1" class="pt-6">
          <v-btn>Continuar</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-carousel hide-delimiters style="width: 100%; margin-top: 180px">
      <v-carousel-item
          src="https://cdn-site.localiza.com/wp-content/uploads/2024/06/ALUGUEL-DE-LONGO-PERIODO_HOME-3.jpg"
          cover
      ></v-carousel-item>

      <v-carousel-item
          src="https://cdn-site.localiza.com/wp-content/uploads/2024/06/RAC_2024_409_PIX_FAST_BANNER_RAC_1920X616.jpg"
          cover
      ></v-carousel-item>

      <v-carousel-item
          src="https://cdn-site.localiza.com/wp-content/uploads/2024/04/BANNER-HOME-ALUGUEL-MENSAL-2.jpg"
          cover
      ></v-carousel-item>
    </v-carousel>

    <v-row style="width: 90%" class="mt-10 px-10">
      <v-col cols="3" v-for="veiculo in veiculos" :key="veiculo.id">
        <v-card
            class="mx-auto"
            align="center"
        >
          <v-img
              height="200px"
              :src="veiculo.foto"
              cover
          ></v-img>

          <v-card-title>
            {{ veiculo.Marca }}
            {{ veiculo.Modelo }}
          </v-card-title>

          <v-card-subtitle>
            {{ veiculo.caracteristicas }}
          </v-card-subtitle>

          <v-card-actions class="d-flex justify-center">
            <v-btn
                variant="outlined"
                color="#5C6BC0"
                text="Alugar"
                class="my-5"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {defineComponent} from 'vue';
import {erro} from "@/toast/toast";
import InformacoesVeiculoService from "../../../service/InformacoesVeiculoService";
import FipeService from "../../../service/FipeService";

export default defineComponent({
  data() {
    return {
      veiculos: [],
    }
  },

  mounted() {
    this.buscarInformacaoVeiculos();
  },

  methods: {
    buscarInformacaoVeiculos() {
      InformacoesVeiculoService.buscarInformacaoVeiculos()
          .then(async response => {
            this.veiculos = await Promise.all(response.data.map(async item => {
              const detalhes = await this.getdetalhesVeiculos(item.detalhesVeiculoAPI);
              return {
                ...item,
                ...detalhes
              };
            }));

            console.log(this.veiculos)
          })
          .catch(err => {
            console.error('Erro: ', err);
            erro('Não foi possível conectar ao servidor. Por favor, verifique sua conexão com a internet.');
          })
    },

    getdetalhesVeiculos(url) {
      return FipeService.getdetalhesVeiculos(url)
          .then(response => {
            return response.data;
          })
          .catch((err) => {
            console.error('Erro: ', err);
            erro('Não foi possível conectar ao servidor. Por favor, verifique sua conexão com a internet.')
          })
    }
  },
});
</script>
