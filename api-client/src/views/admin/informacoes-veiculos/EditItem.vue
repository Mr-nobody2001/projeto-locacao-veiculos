<template>
  <v-container fluid>
    <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
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
              :disabled="!marcasVeiculo"
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
              @change="converterBase64"
          />
        </v-col>
        <v-col cols="10" sm="8" md="6" lg="4" class="d-flex justify-center">
          <v-img
              v-if="(Array.isArray(this.imagemVeiculo) ? this.imagemVeiculo.length : this.imagemVeiculo) || isUpdate"
              height="200px"
              width="300px"
              :src="imagemBase64"
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
              @click="cadastrarInformacaoVeiculo"
              :disabled="!(marcaSelecionada && modeloSelecionado && anoDeLancamentoSelecionado && caracteristicasSelecionadas.length && (Array.isArray(this.imagemVeiculo) ? this.imagemVeiculo.length : this.imagemVeiculo))"
              :loading="loadingCriarInformacaosVeiculo"
              v-if="!isUpdate"
          >
            Cadastrar
          </v-btn>

          <v-btn
              class="btn"
              type="submit"
              color="primary"
              density="comfortable"
              @click="atualizarInformacaoVeiculo"
              :disabled="!(marcaSelecionada && modeloSelecionado && anoDeLancamentoSelecionado && caracteristicasSelecionadas.length)"
              :loading="loadingCriarInformacaosVeiculo"
              v-if="isUpdate"
          >
            Atualizar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import FipeService from '../../../../service/FipeService';
import {erro, sucesso} from "@/toast/toast";
import InformacoesVeiculoService from "../../../../service/InformacoesVeiculoService";
import { useRoute } from 'vue-router';
import router from '@/router/router';

export default {
  
  data: () => ({
    id: null,
    loadingMarca: false,
    loadingModelo: false,
    loadingCriarInformacaosVeiculo: false,
    imagemVeiculo: null,
    imagemBase64: null,
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
    caracteristicasSelecionadas: [],
    isUpdate: false
  }),

  methods: {
    getMarcasVeiculo() {
      this.loadingMarca = true;

      return FipeService.getMarcasVeiculo()
          .then(response => (this.marcasVeiculo = response.data))
          .catch((err) => {
            console.error('Erro: ', err);
            erro('Ocorreu um erro ao tentar obter as fabricantes de veículo.');
          })
          .finally(() => (this.loadingMarca = false));
    },

    getModelosVeiculo(marcaVeiculo) {
      if (Object.prototype.toString.call(marcaVeiculo) !== '[object Object]')
        return;

      this.loadingModelo = true;

      this.modeloSelecionado = null;
      this.anoDeLancamentoSelecionado = null;

      return FipeService.getModelosVeiculo(marcaVeiculo.codigo)
          .then(response => {
            this.modelosVeiculo = response.data.modelos;
          })
          .catch((err) => {
            console.error('Erro: ', err);
            erro('Ocorreu um erro ao tentar obter o modelo do veículo.');
          })
          .finally(() => (this.loadingModelo = false));
    },

    getDataDeLancamentoVeiculo(modeloVeiculo) {
      if (Object.prototype.toString.call(modeloVeiculo) !== '[object Object]')
        return;

      this.loadingAnoDeLancamento = true;

      this.anoDeLancamentoSelecionado = null;

      return FipeService.getDataDeLancamentoVeiculo(
          this.marcaSelecionada.codigo,
          modeloVeiculo.codigo
      )
          .then(response => {
            this.anosDeLancamento = response.data;
            return this.anosDeLancamento;
          })
          .catch((err) => {
            console.error('Erro: ', err);
            erro('Ocorreu um erro ao tentar obter a data de lançamento do veículo.');
          })
          .finally(() => (this.loadingAnoDeLancamento = false));
    },

    converterBase64(event) {
      let imagem = event.target.files[0];
      if (imagem) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagemBase64 = e.target.result
        };
        reader.readAsDataURL(imagem);
      }
    },

    cadastrarInformacaoVeiculo() {
      this.loadingCriarInformacaosVeiculo = true;

      const dadosVeiculo = {
        detalhesVeiculoAPI: `https://parallelum.com.br/fipe/api/v1/carros/marcas/${this.marcaSelecionada.codigo}/modelos/${this.modeloSelecionado.codigo}/anos/${this.anoDeLancamentoSelecionado}`,
        caracteristicas: this.caracteristicasSelecionadas,
        foto: this.imagemBase64
      };

      InformacoesVeiculoService
          .cadastrarInformacaoVeiculo(dadosVeiculo)
          .then(() => {
            sucesso('Informações do veículo cadastradas com sucesso!');
            router.push({name: 'ListItem'});
          })
          .catch((err) => {
            console.error('Erro: ', err);
            erro("Ocorreu um problema ao tentar cadastrar as informações do veículo.");
          })
          .finally(() => this.loadingCriarInformacaosVeiculo = false);
    },

    atualizarInformacaoVeiculo() {
      this.loadingCriarInformacaosVeiculo = true;

      const dadosVeiculo = {
        detalhesVeiculoAPI: `https://parallelum.com.br/fipe/api/v1/carros/marcas/${this.marcaSelecionada.codigo}/modelos/${this.modeloSelecionado.codigo}/anos/${this.anoDeLancamentoSelecionado}`,
        caracteristicas: this.caracteristicasSelecionadas,
        foto: this.imagemVeiculo ? this.imagemBase64 : null
      };

      InformacoesVeiculoService
          .atualizarInformacaoVeiculo(this.$data.id, dadosVeiculo)
          .then(() => {
            sucesso('Informações do veículo atualizadas com sucesso!');
            router.push({name: 'ListItem'});
          })
          .catch((err) => {
            console.error('Erro: ', err);
            erro("Ocorreu um problema ao tentar cadastrar as informações do veículo.");
          })
          .finally(() => this.loadingCriarInformacaosVeiculo = false);
    },
  },

  mounted() {
    const route = useRoute();
    this.$data.id = route.params.id;

    this.getMarcasVeiculo()
      .then(() => {
        if(this.$data.id !== undefined) {
          this.$data.isUpdate = true;

          InformacoesVeiculoService.buscarInformacaoVeiculo(this.$data.id)
            .then((res) => {
              const dados = res.data;
              this.$data.caracteristicasSelecionadas = dados.caracteristicas.split(",");
              this.$data.imagemBase64 = process.env.VUE_APP_API_URL + dados.foto;

              const urlGetDetalhesVeiculo = dados.detalhesVeiculoAPI.replace("https://parallelum.com.br", "");
              FipeService.getdetalhesVeiculos(urlGetDetalhesVeiculo)
                .then(async (res) => {
                  const dadosFipe = res.data;
                  this.$data.marcaSelecionada = this.$data.marcasVeiculo.find((m) => m.nome === dadosFipe.Marca);
                  await this.getModelosVeiculo(this.$data.marcaSelecionada);
                  this.$data.modeloSelecionado = this.$data.modelosVeiculo.find((m) => m.nome === dadosFipe.Modelo);
                  await this.getDataDeLancamentoVeiculo(this.$data.modeloSelecionado);
                  this.$data.anoDeLancamentoSelecionado = this.$data.anosDeLancamento.find((a) => a.nome === `${dadosFipe.AnoModelo} ${dadosFipe.Combustivel}`)?.codigo;
                });
            });
        }
      });
  }
};
</script>

<style scoped>
.btn {
  height: 35px;
}
</style>
