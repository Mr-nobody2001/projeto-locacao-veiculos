<template>
  <v-container fluid>
  <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
    <v-card-item>
        <div class="d-flex justify-center">
          <img src="../../assets/img/logo.jpg" alt="Logo" width="140"/>
        </div>
      </v-card-item>
    <vehicle-card v-for="(veiculo, index) in veiculos" :key="index" :veiculo="veiculo" />
  </v-card>
</v-container>
</template>

<script>
import FipeService from '../../../service/FipeService';
import InformacoesVeiculoService from '../../../service/InformacoesVeiculoService';
import VehicleCard from '../../components/VehicleCard.vue';

export default {
  components: { VehicleCard },
  data() {
    return {
      veiculos: []
    };
  },
  created() {
    this.buscarInformacaoVeiculos();
  },
  methods: {
    async buscarInformacaoVeiculos() {
      try {
        const response = await InformacoesVeiculoService.buscarInformacaoVeiculos();
        const veiculosData = response.data;

        for (let i = 0; i < veiculosData.length; i++) {
          const veiculo = veiculosData[i];
          const detalhesResponse = await FipeService.getdetalhesVeiculos(veiculo.detalhesVeiculoAPI);
          const detalhesVeiculo = detalhesResponse.data;

          this.veiculos.push({
            marca: detalhesVeiculo.Marca,
            modelo: detalhesVeiculo.Modelo,
            ano: detalhesVeiculo.AnoModelo,
            caracteristicas: veiculo.caracteristicas,
            imagem: veiculo.foto
          });
        }
      } catch (error) {
        console.error('Erro ao buscar informações dos veículos:', error);
      }
    }
  }
};
</script>

<style scoped>

</style>
