<template>
  <v-container fluid>
  <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
    <v-list lines="one">
      <v-list-subheader>Veículo</v-list-subheader>

      <v-list-item v-if="foto">
        <img class="rounded" :src="foto" width="200px" />
      </v-list-item>

      <v-list-item
        title="Placa"
        :subtitle="reserva?.veiculo.placa"
        v-if="reserva?.veiculo"
      ></v-list-item>

      <v-list-item
        title="Cor"
        :subtitle="reserva?.veiculo.cor.nome"
        v-if="reserva?.veiculo?.cor"
      ></v-list-item>

      <v-list-item
        title="Características"
        :subtitle="reserva?.informacoesVeiculo.caracteristicas.replaceAll(',', ', ')"
      ></v-list-item>

      <v-list-item
        title="Última Manutenção"
        :subtitle="formatarData(reserva?.veiculo?.ultimaManutencao)"
        v-if="reserva?.veiculo"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list-subheader>Cliente</v-list-subheader>

      <v-list-item
        title="Nome"
        :subtitle="reserva?.cliente?.nome"
      ></v-list-item>

      <v-list-item
        title="CPF"
        :subtitle="mascararCPF(reserva?.cliente?.cpf)"
      ></v-list-item>

      <v-list-item
        title="Telefone"
        :subtitle="mascararTel(reserva?.cliente?.telefone)"
      ></v-list-item>
      
      <v-list-item
        title="E-mail"
        :subtitle="reserva?.cliente?.email"
      ></v-list-item>

      <v-list-item
        title="Data de Nascimento"
        :subtitle="formatarData(reserva?.cliente?.data_nascimento)"
      ></v-list-item>

      <v-list-item
        title="Endereço"
        :subtitle="reserva?.cliente?.endereco"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list-subheader>Histórico</v-list-subheader>

      <v-list-item
        title="Status"
        :subtitle="reserva?.status"
      ></v-list-item>

      <v-list-item
        title="Reservado em"
        :subtitle="formatarData(reserva?.createdAt)"
      ></v-list-item>

      <v-list-item
        title="Cancelado em"
        :subtitle="formatarData(reserva?.canceledAt)"
        v-if="reserva?.canceledAt"
      ></v-list-item>

      <v-list-item
        title="Check-in em"
        :subtitle="formatarData(reserva?.checkIn)"
        v-if="reserva?.checkIn"
      ></v-list-item>

      <v-list-item
        title="Check-out em"
        :subtitle="formatarData(reserva?.checkOut)"
        v-if="reserva?.checkOut"
      ></v-list-item>
    </v-list>

    <v-row class="d-flex justify-center py-10">
      <v-col cols="11">
        <v-combobox
          v-model="veiculoId"
          :items="veiculos"
          item-value="id"
          item-text="placa"
          label="Selecione o veículo"
          ref="comboboxVeiculos"
          outlined
        >
          <template v-slot:selection="{ item }">
            <p><b>{{ item.props.title.cor.nome }}</b>&nbsp;<small>{{ item.props.title.placa }}</small></p>
          </template>
          <template v-slot:item="{ item, attrs, on }">
            <v-list-item :value="item.value" v-on="on" v-bind="attrs" @click="selectVeiculo(item.value)">
              <v-list-item-content>
                <p><b>Cor:</b>{{ item.props.title.cor.nome }}</p>
                <p><b>Placa:</b>{{ item.props.title.placa }}</p>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </v-col>
      <v-col cols="11" class="text-center">
        <v-btn
          type="submit"
          color="primary"
          @click="checkIn"
          :loading="loading"
          :disabled="veiculoId == null"
        >
          Realizar check-in
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</v-container>
</template>

<script>
import { formatarCPF, formatarTelefone, formatDate } from '@/helpers';
import ReservasVeiculoService from '../../../../service/ReservasVeiculosService';
import { defineComponent } from 'vue';
import { erro, sucesso } from '@/toast/toast';
import FipeService from '../../../../service/FipeService';
import ReservasVeiculosService from '../../../../service/ReservasVeiculosService';

export default defineComponent({
name: "CheckInReserva",
data() {
  return {
    reserva: null,
    veiculos: [],
    veiculoId: null,
    foto: null,
    loading: false,
  }
},
created() {
  this.loadReserva();
},
methods: {
  loadReserva() {
    return ReservasVeiculoService.buscarReserva(this.$route.params.id)
      .then((res) => {
        this.reserva = res.data;
        this.foto = process.env.VUE_APP_API_URL + res.data.informacoesVeiculo.foto;
        this.loadVeiculos(this.reserva.informacoesVeiculo.id)
          .then()
          .catch();
      })
      .catch(() => {
        this.reserva = null;
      });
  },
  loadVeiculos(informacoesVeiculoId) {
    return ReservasVeiculoService.buscarVeiculosByInformacoesVeiculoId(informacoesVeiculoId)
      .then((res) => {
        this.veiculos = res.data;
      })
      .catch(() => {
        this.reserva = null;
      });
  },
  formatarData(dateString) {
    return formatDate(dateString);
  },
  mascararCPF(cpf) {
    return formatarCPF(cpf);
  },
  mascararTel(tel) {
    return formatarTelefone(tel);
  },
  getdetalhesVeiculo(reserva) {
    const url = reserva.informacoesVeiculo.detalhesVeiculoAPI;
    return FipeService.getdetalhesVeiculos(url)
      .then(response => {
        return response.data;
      })
      .catch((err) => {
        console.error('Erro: ', err);
        erro('Não foi possível conectar ao servidor. Por favor, verifique sua conexão com a internet.')
      });
  },
  selectVeiculo(id) {
    this.veiculoId = id;
    this.$refs.comboboxVeiculos.blur();
  },
  checkIn() {
    this.loading = true;
    const id = this.$route.params.id;
    const data = {
      veiculoId: this.veiculoId
    };
    ReservasVeiculosService.checkIn(id, data)
      .then(() => {
        this.loading = false;
        sucesso('Check-in realizado');
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

<style>
.v-list-subheader__text {
  font-size: 20px;
  color: #000;
}

.v-divider {
  margin: 10px 0;
}
</style>