<template>
  <v-container fluid>
    <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Imagem</th>
            <th class="text-left">Categoria</th>
            <th class="text-left">Cor</th>
            <th class="text-left">Placa</th>
            <th class="text-left">Disponibilidade</th>
            <th class="text-left">Características</th>
            <th>
              <div class="header-content d-flex align-center">
                <router-link :to="{ name: 'CadastrarVeiculo' }" class="btn-adicionar">
                    <v-btn color="primary">
                      <v-icon icon="mdi-plus" start></v-icon>
                        Veiculo
                    </v-btn>
                </router-link>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in veiculosList"
            :key="item.name"
          >
            <td class="py-4">
              <img :src="getImageUrl(item.informacoesVeiculo.foto)" height="80px">
            </td>
            <td class="py-4">
              {{ item.categoria.nome }}
            </td>
            <td class="py-4">
              {{ item.cor.nome }}
            </td>
            <td class="py-4">
              {{ item.placa }}
            </td>
            <td class="py-4">
              {{ item.disponibilidade }}
            </td>
            <td class="py-4">
              {{ item.informacoesVeiculo.caracteristicas }}
            </td>
            <td class="py-4">
              <div class="icon-container">
                <v-btn 
                  icon="mdi-pencil"
                  variant="text"
                  size="small"
                  class="text-dark"
                  :to="{ name: 'EditarVeiculo', params: { id: item.id } }"
                ></v-btn>
                
                <v-btn
                  icon="mdi-trash-can-outline"
                  variant="text"
                  size="small"
                  @click="deleteVehicle(item)"
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
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import VeiculoService from '../../../../service/VeiculoService';
import { sucesso } from '@/toast/toast';

export default defineComponent ({
  name: "ListVeiculos",
  components: {
    ConfirmationDialog,
  },
  data() {
    return {
      veiculosList: [],
    } 
  },
  created() {
    this.loadVeiculosList();
  },
  methods: {
    getImageUrl(foto) {
      return process.env.VUE_APP_API_URL + foto;
    },
    getDetalhes(item) {
      const detalhes = item.informacoesVeiculo.detalhesVeiculo;
      const Marca = detalhes.Marca;
      const Modelo = detalhes.Modelo;
      const AnoModelo = detalhes.AnoModelo;
      return `${Marca} - ${Modelo} - ${AnoModelo}`
    },
    async loadVeiculosList() {
      try {
        const res = await VeiculoService.buscarVeiculos();
        this.veiculosList = res.data;
      } catch {
        this.veiculosList = [];
      }
    },
    async deleteVehicle(vehicle) {
      this.$refs.confirmDialogRef.open('Excluir', 'Tem certeza que deseja excluir esse veículo?')
        .then((confirm) => {
          if (confirm) {
            VeiculoService.deleteVeiculo(vehicle.id)
              .then(() => {
                sucesso('Veículo excluído');
                this.veiculosList = this.veiculosList.filter((v) => v.id !== vehicle.id);
              });
          }
        });
    }
  }
})
</script>

<style scoped>
.btn-adicionar{
  margin-left: auto;
}

.coluna-caracteristicas {
  display: flex;
  flex-wrap: wrap;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>