<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col cols="12">
          <v-select
              label="Selecione a marca do carro"
              :items="marcasVeiculo"
              item-title="nome"
              item-value="codigo"
              :loading="loadingMarca"
              v-model="marcaSelecionada"
              variant="outlined"
          ></v-select>
        </v-col>

        <v-col cols="12">
          <v-select
              label="Escolha o modelo do carro"
              :items="modelosVeiculo"
              item-title="nome"
              item-value="codigo"
              :loading="loadingModelo"
              :disabled="!marcaSelecionada"
              v-model="modeloSelecionado"
              variant="outlined"
          ></v-select>
        </v-col>

        <v-col cols="12">
          <v-select
              label="Selecione o ano de lançamento do carro."
              :items="anosDeLancamento"
              item-title="nome"
              item-value="codigo"
              :loading="loadingAnoDeLancamento"
              :disabled="!modeloSelecionado"
              v-model="anoDeLancamentoSelecionado"
              variant="outlined"
          ></v-select>
        </v-col>
        <v-checkbox :input-value="boolValue" class="mx-2" label="Checkbox"></v-checkbox>

      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import FipeService from "../../../service/FipeService";

export default {
  data: () => ({
    loadingMarca: false,
    loadingModelo: false,
    loadingAnoDeLancamento: false,
    marcasVeiculo: [],
    marcaSelecionada: null,
    modelosVeiculo: [],
    modeloSelecionado: null,
    anosDeLancamento: [],
    anoDeLancamentoSelecionado: null,
    boolValue: true,
  }),

  methods: {
    getMarcasVeiculo() {
      this.loadingMarca = true;

      FipeService
          .getMarcasVeiculo()
          .then(response => this.marcasVeiculo = response.data)
          // .catch(() => this.$toast.error('Erro ao recuperar os modelos de veículo.', '', {position: 'topRight'}));
          .finally(() => this.loadingMarca = false)
    },

    getModelosVeiculo(marcaVeiculo) {
      this.loadingModelo = true;

      FipeService
          .getModelosVeiculo(marcaVeiculo)
          .then(response => {
            this.modelosVeiculo = response.data.modelos;
          })
          // .catch(() => this.$toast.error('Erro ao recuperar os modelos de veículo.', '', {position: 'topRight'}));
          .finally(() => this.loadingModelo = false)
    },

    getDataDeLancamentoVeiculo(modeloVeiculo) {
      this.loadingAnoDeLancamento = true;

      FipeService
          .getDataDeLancamentoVeiculo(this.marcaSelecionada, modeloVeiculo)
          .then(response => {
            this.anosDeLancamento = response.data;
          })
          // .catch(() => this.$toast.error('Erro ao recuperar os modelos de veículo.', '', {position: 'topRight'}));
          .finally(() => this.loadingAnoDeLancamento = false)
    }
  },

  mounted() {
    this.getMarcasVeiculo();
  },

  watch: {
    marcaSelecionada(marcaSelecionada) {
      this.modeloSelecionado = null;
      this.anoDeLancamentoSelecionado = null;

      if (marcaSelecionada) this.getModelosVeiculo(marcaSelecionada);
    },

    modeloSelecionado(modeloSelecionado) {
      this.anoDeLancamentoSelecionado = null;

      if (modeloSelecionado) this.getDataDeLancamentoVeiculo(modeloSelecionado);
    }
  }
}
</script>

<style scoped>
</style>