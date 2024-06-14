<template>
  <v-container fluid>
    <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
      <v-row class="d-flex justify-center py-10">
        <v-col cols="10" class="text-center">
          <h2>Cadastrar Reserva</h2>
        </v-col>
        <v-col cols="10">
          <v-combobox
            v-model="informacoesVeiculoId"
            :items="informacoesVeiculos"
            item-value="id"
            item-text="modelo"
            label="Selecione o modelo de veículo"
            ref="comboboxInformacoesVeiculos"
            outlined
          >
            <template v-slot:selection="{ item }">
              <p><b>{{ item.props.title.marca }} {{ item.props.title.modelo }} {{ item.props.title.ano }}</b>&nbsp;<small>{{ item.props.title.caracteristicas }}</small></p>
            </template>
            <template v-slot:item="{ item, attrs, on }">
              <v-list-item :value="item.value" v-on="on" v-bind="attrs" @click="selectInformacoesVeiculo(item.value, item)">
                <v-list-item-content>
                  <div class="d-flex">
                    <img 
                      class="rounded mr-5" 
                      width="100px" 
                      :src="item.props.title.imagem"
                    />
                    <div>
                      <strong>{{ item.props.title.marca }} {{ item.props.title.modelo }} {{ item.props.title.ano }}</strong>
                      <p class="text-break" style="width: 800px;">{{ item.props.title.caracteristicas }}</p>
                    </div>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
        </v-col>
        <v-col cols="10">
          <v-combobox
            v-model="clienteId"
            :items="clientes"
            item-value="id"
            item-text="nome"
            label="Selecione o cliente"
            ref="comboboxClientes"
            outlined
          >
            <template v-slot:selection="{ item }">
              <p><b>{{ item.props.title.nome }}</b>&nbsp;<small>{{ item.props.title.cpf }}</small></p>
            </template>
            <template v-slot:item="{ item, attrs, on }">
              <v-list-item :value="item.value" v-on="on" v-bind="attrs" @click="selectCliente(item.value, item)">
                <v-list-item-content>
                  <strong>{{ item.props.title.nome }}</strong>
                  <p>{{ item.props.title.cpf }}</p>
                  <p>{{ item.props.title.email }}</p>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
        </v-col>
        <v-col cols="10">
          <v-text-field
            label="Check-in"
            placeholder="Informe a data e hora prevista para o check-in"
            type="datetime-local"
            v-model="checkInForecast"
          ></v-text-field>
        </v-col>
        <v-col cols="10">
          <v-text-field
            label="Check-out"
            placeholder="Informe a data e hora prevista para o check-out"
            type="datetime-local"
            v-model="checkOutForecast"
          ></v-text-field>
        </v-col>
        <v-col cols="10" class="text-center">
          <v-btn
            type="submit"
            color="primary"
            @click="reservarVeiculo"
            :loading="loading"
          >
            Reservar Veículo
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import ReservasVeiculosService from '../../../../service/ReservasVeiculosService';
import ClienteService from '../../../../service/ClienteService';
import FipeService from '../../../../service/FipeService';
import InformacoesVeiculoService from '../../../../service/InformacoesVeiculoService';
import { defineComponent } from 'vue';
import { erro, sucesso } from '@/toast/toast';

export default defineComponent({
  name: "CadastrarReserva",
  data() {
    return {
      informacoesVeiculos: [],
      clientes: [],
      informacoesVeiculoId: null,
      clienteId: null,
      checkInForecast: null,
      checkOutForecast: null,
      loading: false,
    }
  },
  created() {
    this.loadInformacoesVeiculos();
    this.loadClientes();
  },
  methods: {
    async loadInformacoesVeiculos() {
      try {
        const response = await InformacoesVeiculoService.buscarInformacaoVeiculos();
        this.informacoesVeiculos = [];

        for (let i = 0; i < response.data.length; i++) {
          const info = response.data[i];
          const detalhesResponse = await FipeService.getdetalhesVeiculos(info.detalhesVeiculoAPI);
          const detalhesVeiculo = detalhesResponse.data;

          this.informacoesVeiculos.push({
            id: info.id,
            marca: detalhesVeiculo.Marca,
            modelo: detalhesVeiculo.Modelo,
            ano: detalhesVeiculo.AnoModelo,
            caracteristicas: info.caracteristicas,
            imagem: process.env.VUE_APP_API_URL + info.foto
          });
        }
      } catch (error) {
        console.error('Erro ao buscar informações dos veículos:', error);
      }
    },
    loadClientes() {
      ClienteService.buscarClientes()
        .then((res) => {
          this.clientes = res.data;
        })
        .catch();
    },
    selectInformacoesVeiculo(id) {
      this.informacoesVeiculoId = id;
      this.$refs.comboboxInformacoesVeiculos.blur();
    },
    selectCliente(id) {
      this.clienteId = id;
      this.$refs.comboboxClientes.blur();
    },
    reservarVeiculo() {
      this.loading = true;
      const data = {
        informacoesVeiculoId: this.informacoesVeiculoId,
        clienteId: this.clienteId,
        checkInForecast: this.checkInForecast,
        checkOutForecast: this.checkOutForecast,
      };
      ReservasVeiculosService.reservarVeiculo(data)
        .then(() => {
          this.loading = false;
          sucesso('Reserva realizada');
          this.$router.push({ name: 'ListReservas' });
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
          erro(e.data.message);
        });
    }
  }
})
</script>