<template>
  <v-container fluid>
    <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
      <v-card-item>
        <div class="d-flex justify-center">
          <img src="../../assets/img/logo.jpg" alt="Logo" width="140" />
        </div>
      </v-card-item>
      <v-row class="d-flex justify-center mt-10">
        <v-col cols="10">
          <v-combobox
            class="mb-10"
            label="Selecione a marca do carro"
            :items="marcasVeiculo"
            item-title="nome"
            item-value="codigo"
            :loading="loadingMarca"
            v-model="marcaSelecionada"
            variant="outlined"
            @update:modelValue="getModelosVeiculo"
          />

          <v-combobox
            class="mb-10"
            label="Escolha o modelo do carro"
            :items="modelosVeiculo"
            item-title="nome"
            item-value="codigo"
            :loading="loadingModelo"
            :disabled="!marcaSelecionada"
            v-model="modeloSelecionado"
            variant="outlined"
            @update:modelValue="getDataDeLancamentoVeiculo"
          />

          <v-select
            class="mb-10"
            label="Selecione o ano de lançamento do carro."
            :items="anosDeLancamento"
            item-title="nome"
            item-value="codigo"
            :loading="loadingAnoDeLancamento"
            :disabled="!modeloSelecionado"
            v-model="anoDeLancamentoSelecionado"
            variant="outlined"
          />

          <v-combobox
            class="mb-10"
            v-model="caracteristicasSelecionadas"
            :items="caracteristicasVeiculo"
            :disabled="!anoDeLancamentoSelecionado"
            label="Selecione as características do veículo"
            multiple
            chips
            deletable-chips
            small-chips
            variant="outlined"
          />

          <v-file-input
            v-model="imagemVeiculo"
            accept="image/*"
            label="Selecione uma imagem"
            placeholder="Nenhuma imagem selecionada"
            prepend-icon="mdi-camera-burst"
            show-size
          />
        </v-col>
        <v-col cols="10" sm="8" md="6" lg="4" class="d-flex justify-center">
          <v-img
            height="200px"
            width="300px"
            :src="imagemUrl"
            alt="Imagem Enviada"
            cover
          />
        </v-col>
        <v-col cols="12" class="d-flex justify-center mb-10 mt-5">
          <v-btn
            class="btn"
            type="submit"
            color="primary"
            density="comfortable"
          >
            Cadastrar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import FipeService from '../../../service/FipeService';
export default {
  
  data: () => ({
    loadingMarca: false,
    loadingModelo: false,
    imagemVeiculo: null,
    loadingAnoDeLancamento: false,
    marcasVeiculo: [],
    marcaSelecionada: null,
    modelosVeiculo: [],
    modeloSelecionado: null,
    anosDeLancamento: [],
    anoDeLancamentoSelecionado: null,
    caracteristicasVeiculo: [
      'Ar-condicionado',
      'Vidro elétrico',
      'Trava elétrica',
      'Air bag',
      'Automático',
      'ABS',
      'Direção assistida',
      'Câmbio manual',
      'Câmbio automático',
      'Controle de tração',
      'Controle de estabilidade',
      'Sensor de estacionamento',
      'Câmera de ré',
      'Rádio FM/AM',
      'Bluetooth',
      'Entrada USB',
      'Freios a disco nas 4 rodas',
      'Faróis de neblina',
      'Rodas de liga leve'
    ],
    caracteristicasSelecionadas: []
  }),

  computed: {
    imagemUrl() {
      if (!this.imagemVeiculo) {
        return require('@/assets/placeholder-veiculo.png');
      }

      return URL.createObjectURL(this.imagemVeiculo);
    }
  },

  methods: {
    getMarcasVeiculo() {
      this.loadingMarca = true;

      FipeService.getMarcasVeiculo()
        .then(response => (this.marcasVeiculo = response.data))
        // .catch(() => this.$toast.error('Erro ao recuperar os modelos de veículo.', '', {position: 'topRight'}));
        .finally(() => (this.loadingMarca = false));
    },

    getModelosVeiculo(marcaVeiculo) {
      if (Object.prototype.toString.call(marcaVeiculo) !== '[object Object]')
        return;

      this.loadingModelo = true;

      this.modeloSelecionado = null;
      this.anoDeLancamentoSelecionado = null;

      FipeService.getModelosVeiculo(marcaVeiculo.codigo)
        .then(response => {
          this.modelosVeiculo = response.data.modelos;
        })
        // .catch(() => this.$toast.error('Erro ao recuperar os modelos de veículo.', '', {position: 'topRight'}));
        .finally(() => (this.loadingModelo = false));
    },

    getDataDeLancamentoVeiculo(modeloVeiculo) {
      if (Object.prototype.toString.call(modeloVeiculo) !== '[object Object]')
        return;

      this.loadingAnoDeLancamento = true;

      this.anoDeLancamentoSelecionado = null;

      FipeService.getDataDeLancamentoVeiculo(
        this.marcaSelecionada.codigo,
        modeloVeiculo.codigo
      )
        .then(response => {
          this.anosDeLancamento = response.data;
        })
        // .catch(() => this.$toast.error('Erro ao recuperar os modelos de veículo.', '', {position: 'topRight'}));
        .finally(() => (this.loadingAnoDeLancamento = false));
    }
  },

  mounted() {
    this.getMarcasVeiculo();
  }
};
</script>

<style scoped>
.btn {
  height: 35px;
}
</style>
