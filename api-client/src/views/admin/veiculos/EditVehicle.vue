<template>
  <v-container fluid>
    <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
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
            v-model="veiculo.informacoesVeiculoId"
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
            v-model="quilometragemFormatada"
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
          <v-text-field
            v-model="dataFormatada"
            label="Última Manutenção"
            prepend-icon="mdi-calendar"
            :rules="dateRules"
            @input="formatarData"
            variant="outlined"
            mask="##/##/####"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-center mb-10 mt-5">
          <v-btn
            class="btn"
            type="submit"
            color="primary"
            density="comfortable"
            @click="cadastrarVeiculo"
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
import FipeService from '../../../../service/FipeService';
import InformacoesVeiculoService from '../../../../service/InformacoesVeiculoService';
import CorService from '../../../../service/CorService';
import CategoriaService from '../../../../service/CategoriaService';
import VeiculoService from '../../../../service/VeiculoService';
import { erro, sucesso } from '@/toast/toast';
import router from '@/router/router';

export default {
  data: () => ({
    veiculo: {
      informacoesVeiculoId: null,
      placa: '',
      corId: null,
      categoriaId: null,
      quilometragem: null,
      disponibilidade: 'disponivel',
      ultimaManutencao: null
    },
    informacoesVeiculos: [],
    cores: [],
    categorias: [],
    quilometragemFormatada: '',
    disponibilidades: ['manutencao', 'disponivel', 'indisponivel'],
    dataFormatada: '',
    dateRules: [
      v => !!v || 'Data é obrigatória',
      v =>
        /^\d{0,2}\/\d{0,2}\/\d{0,4}$/.test(v) ||
        'Formato inválido (dd/mm/aaaa)',
      v => {
        if (!v) return true;
        const [day, month, year] = v.split('/');
        if (!day || !month || !year) return false;
        const selectedDate = new Date(`${year}-${month}-${day}`);
        const currentDate = new Date();
        return (
          selectedDate <= currentDate ||
          'Data não pode ser posterior à data atual'
        );
      }
    ],
    rules: {
      required: value => !!value || 'Obrigatório.',
      numeric: value =>
        !isNaN(value.replace(/\./g, '')) || 'Deve ser um número.',
      placa: value =>
        /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(value) ||
        /^[A-Z]{3}[0-9]{4}$/.test(value) ||
        'Placa inválida. Formato correto: ABC1234 ou ABC1D23'
    },
    loading: false
  }),

  computed: {
    isValid() {
      return (
        this.veiculo.placa &&
        this.veiculo.informacoesVeiculoId &&
        this.veiculo.corId &&
        this.veiculo.categoriaId &&
        this.veiculo.quilometragem &&
        this.veiculo.disponibilidade
      );
    }
  },

  created() {
    this.buscarInformacaoVeiculos();
    this.buscarCores();
    this.buscarCategorias();
  },

  methods: {
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
            id: String(veiculo.id)
          });
        }
      } catch (error) {
        console.error('Erro ao buscar informações dos veículos:', error);
      }
    },

    async buscarCores() {
      try {
        const response = await CorService.buscarCores();
        const coresData = response.data;
        for (let i = 0; i < coresData.length; i++) {
          const cor = coresData[i];
          this.cores.push({
            nome: cor.nome,
            id: String(cor.id)
          });
        }
      } catch (error) {
        console.error('Erro ao buscar cores de veículos:', error);
      }
    },

    async buscarCategorias() {
      try {
        const response = await CategoriaService.buscarCategorias();
        const categoriasData = response.data;
        for (let i = 0; i < categoriasData.length; i++) {
          const categoria = categoriasData[i];
          this.categorias.push({
            nome: categoria.nome,
            id: String(categoria.id)
          });
        }
      } catch (error) {
        console.error('Erro ao buscar categorias de veículos:', error);
      }
    },

    async cadastrarVeiculo() {
      console.log(this.veiculo)
      try {
        this.loading = true;
        const dadosVeiculo = this.veiculo;
        await VeiculoService.cadastrarVeiculo(dadosVeiculo);
        this.loading = false;
        sucesso('Veiculo cadastrado');
        router.push({name: 'ListVeiculos'});
      } catch (error) {
        this.loading = false;
        erro(error.data.message);
      }
    },

    formatarPlaca() {
      this.veiculo.placa = this.veiculo.placa
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 7);
    },
    formatarQuilometragem() {
      let quilometragem = this.quilometragemFormatada.replace(/\D/g, '');
      if (quilometragem.length > 3) {
        quilometragem = quilometragem.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
      this.quilometragemFormatada = quilometragem;
      this.veiculo.quilometragem = String(quilometragem.replace(/\./g, ''));
    },
    formatarData() {
      let value = this.dataFormatada.replace(/\D/g, '');
      if (value.length > 8) value = value.slice(0, 8); // Limitar o tamanho da entrada

      const day = value.slice(0, 2);
      const month = value.slice(2, 4);
      const year = value.slice(4, 8);

      // Atualizar o campo de entrada para mostrar dd/mm/aaaa enquanto o usuário digita
      this.dataFormatada =
        (day ? day : '') +
        (month ? '/' + month : '') +
        (year ? '/' + year : '');

      // Formatar a data no formato YYYY-MM-DD para armazenamento
      if (year.length === 4 && month.length === 2 && day.length === 2) {
        const formattedDate = `${year}-${month}-${day}`;
        // Armazenar a data formatada como string no formato aaaa-mm-dd
        this.veiculo.ultimaManutencao = formattedDate;
      }
    }
  }
};
</script>

<style scoped>
.btn {
  height: 35px;
}
</style>
