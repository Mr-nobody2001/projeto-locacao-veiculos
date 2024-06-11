<template>
  <v-container fluid>
    <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
      <v-card-item>
        <div class="d-flex justify-center">
          <img src="../../../assets/img/logo.jpg" alt="Logo" width="140"/>
        </div>
      </v-card-item>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Imagem</th>
            <th class="text-left">Marca</th>
            <th class="text-left">Modelo</th>
            <th class="text-left">Ano</th>
            <th class="text-left">Características</th>
            <th>
              <div class="header-content d-flex align-center">
                <router-link :to="{ name: 'EditItem' }" class="btn-adicionar">
                    <v-btn color="primary">
                      <v-icon start>mdi-plus</v-icon>
                      Informações
                    </v-btn>
                </router-link>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="item in veiculos" 
            :key="item.nome"
          >
            <td class="py-4">
              <img :src="item.imagem" alt="Imagem do Veículo" width="100" />
            </td>
            <td class="py-4">
              {{ item.marca }}
            </td>
            <td class="py-4">
              {{ item.modelo }}
            </td>
            <td class="py-4">
              {{ item.ano }}
            </td>
            <td class="py-4">
              {{ item.caracteristicas }}
            </td>
            <td class="py-4">
              <div class="icon-container">
                <v-btn 
                  icon="mdi-pencil"
                  variant="text" 
                  size="small" 
                  class="text-dark"
                  :to="{ name: 'EditarInformacao', params: { id: item.id } }"
                  ></v-btn>
                <v-btn 
                  icon="mdi-trash-can-outline" 
                  variant="text" 
                  size="small" 
                  @click="deleteInformacao(item)"
                  ></v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <ConfirmationDialog ref="confirmDialogRef" />
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import FipeService from '../../../../service/FipeService';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import InformacoesVeiculoService from '../../../../service/InformacoesVeiculoService';
import { sucesso } from '@/toast/toast';

export default defineComponent ({
  name: "ListItem",
  components: {
    ConfirmationDialog,
  },
  data() {
    return {
      veiculos: [],
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
            id: veiculo.id,
            marca: detalhesVeiculo.Marca,
            modelo: detalhesVeiculo.Modelo,
            ano: detalhesVeiculo.AnoModelo,
            caracteristicas: veiculo.caracteristicas,
            imagem: process.env.VUE_APP_API_URL + veiculo.foto
          });
        }
      } catch (error) {
        console.error('Erro ao buscar informações dos veículos:', error);
      }
    },
    async deleteInformacao(item) {
      this.$refs.confirmDialogRef.open('Excluir', 'Tem certeza que deseja excluir essa informação?')
        .then((confirm) => {
          if (confirm) {
            InformacoesVeiculoService.deleteInformacaoVeiculos(item.id)
              .then(() => {
                sucesso('Informação Veículo excluído');
                this.veiculos = this.veiculos.filter((v) => v.id !== item.id);
              });
          }
        });
    }
  }
});
</script>

<style scoped>
.btn-adicionar{
  margin-left: auto;
}
</style>
