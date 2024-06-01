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
          <v-text-field
            class="mb-10"
            label="Placa"
            v-model="veiculo.placa"
            @input="formatarPlaca"
            :rules="[rules.required, rules.placa]"
            variant="outlined"
            maxlength="7"
          />
          <v-select
            class="mb-10"
            label="Selecione o carro"
            :items="informacoesVeiculos"
            item-title="nome"
            item-value="id"
            v-model="veiculo.informacoesVeiculosId"
            :rules="[rules.required]"
            variant="outlined"
          />
          <v-select
            class="mb-10"
            label="Cor"
            :items="cores"
            item-title="nome"
            item-value="id"
            v-model="veiculo.corId"
            :rules="[rules.required]"
            variant="outlined"
          />
          <v-select
            class="mb-10"
            label="Categoria"
            :items="categorias"
            item-title="nome"
            item-value="id"
            v-model="veiculo.categoriaId"
            :rules="[rules.required]"
            variant="outlined"
          />
          <v-text-field
            class="mb-10"
            label="Quilometragem"
            v-model="veiculo.quilometragem"
            @input="formatarQuilometragem"
            :rules="[rules.required, rules.numeric]"
            variant="outlined"
          />
          <v-select
            class="mb-10"
            label="Disponibilidade"
            :items="disponibilidades"
            v-model="veiculo.disponibilidade"
            :rules="[rules.required]"
            variant="outlined"
          />
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="veiculo.ultimaManutencao"
                label="Última Manutenção"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                variant="outlined"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="veiculo.ultimaManutencao"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancelar</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(veiculo.ultimaManutencao)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" class="d-flex justify-center mb-10 mt-5">
          <v-btn
            class="btn"
            type="submit"
            color="primary"
            density="comfortable"
            @click="saveVeiculo"
            :disabled="!isValid"
            :loading="loading"
          >
            {{ isUpdate ? 'Atualizar' : 'Cadastrar' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import FipeService from '../../../service/FipeService';
import InformacoesVeiculoService from '../../../service/InformacoesVeiculoService';
import CategoriaService from '../../../service/CategoriaService';

export default {
  data: () => ({
    veiculo: {
      placa: '',
      informacoesVeiculosId: null,
      corId: null,
      categoriaId: null,
      quilometragem: '',
      disponibilidade: 'disponivel',
      ultimaManutencao: null
    },
    informacoesVeiculos: [],
    cores: [],
    categorias: [],
    disponibilidades: ['manutencao', 'disponivel', 'indisponivel'],
    rules: {
      required: value => !!value || 'Obrigatório.',
      numeric: value =>
        !isNaN(value.replace(/\./g, '')) || 'Deve ser um número.',
      placa: value =>
        /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(value) ||
        /^[A-Z]{3}[0-9]{4}$/.test(value) ||
        'Placa inválida. Formato correto: ABC1234 ou ABC1D23'
    },
    menu: false,
    loading: false,
    isUpdate: false
  }),

  computed: {
    isValid() {
      return (
        this.veiculo.placa &&
        this.veiculo.informacoesVeiculosId &&
        this.veiculo.corId &&
        this.veiculo.categoriaId &&
        this.veiculo.quilometragem &&
        this.veiculo.disponibilidade
      );
    }
  },

  created() {
    this.buscarInformacaoVeiculos();
    this.buscarCategorias();
  },

  methods: {
    formatarPlaca() {
      this.veiculo.placa = this.veiculo.placa
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 7);
    },
    formatarQuilometragem() {
      let quilometragem = this.veiculo.quilometragem.replace(/\D/g, '');
      if (quilometragem.length > 3) {
        quilometragem = quilometragem.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
      this.veiculo.quilometragem = quilometragem;
    },

    async buscarInformacaoVeiculos() {
      try {
        const response =
          await InformacoesVeiculoService.buscarInformacaoVeiculos();
        const veiculosData = response.data;

        for (let i = 0; i < veiculosData.length; i++) {
          const veiculo = veiculosData[i];
          const detalhesResponse = await FipeService.getdetalhesVeiculos(
            veiculo.detalhesVeiculoAPI
          );
          const detalhesVeiculo = detalhesResponse.data;

          this.informacoesVeiculos.push({
            nome: detalhesVeiculo.Modelo,
            id: veiculo.id
          });
        }
      } catch (error) {
        console.error('Erro ao buscar informações dos veículos:', error);
      }
    },

    async buscarCores() {},

    async buscarCategorias() {
      try {
        const response = await CategoriaService.buscarCategorias();
        const categoriasData = response.data;
        for (let i = 0; i < categoriasData.length; i++) {
          const categoria = categoriasData[i];
          this.categorias.push({
            nome: categoria.nome,
            id: categoria.id
          });
        }
      } catch (error) {
        console.error('Erro ao buscar categorias de veículos:', error);
      }
    },

    cadastrarVeiculo() {
      this.loading = true;

      // Lógica para salvar ou atualizar o veículo

      this.loading = false;
    }
  }
};
</script>

<style scoped>
.btn {
  height: 35px;
}
</style>
