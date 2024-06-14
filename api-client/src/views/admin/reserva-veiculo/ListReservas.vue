<template>
    <v-container fluid>
    <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Cliente</th>
            <th class="text-left">CPF</th>
            <th class="text-left">Veiculo</th>
            <th class="text-left">Status</th>
            <th class="text-left">Data</th>
            <th>
              <div class="d-flex align-center justify-center">
                <router-link :to="{ name: 'CadastrarReserva' }" class="btn-adicionar">
                    <v-btn color="primary">
                      <v-icon icon="mdi-plus" start></v-icon>
                        Reserva
                    </v-btn>
                </router-link>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in reservasList"
            :key="item.name"
          >
            <td class="py-4">
               {{ item.cliente.nome }}
            </td>
            <td class="py-4">
                {{ item.cliente.cpf }}
            </td>
            <td class="py-4">
              {{ item.informacoesVeiculo?.detalhes }}
            </td>
            <td class="py-4">
                {{ item.status }}
            </td>
            <td class="py-4">
                <span v-if="item.status === 'Reservado'">{{ formatarData(item.createdAt) }}</span>
                <span v-if="item.status === 'Cancelado'">{{ formatarData(item.canceledAt) }}</span>
                <span v-if="item.status === 'Alugado'">{{ formatarData(item.checkIn) }}</span>
                <span v-if="item.status === 'Finalizado'">{{ formatarData(item.checkOut) }}</span>
            </td>
            <td class="py-4">
              <div class="d-flex justify-center">
                <v-tooltip text="Detalhes da reserva">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon="mdi-information-outline"
                      variant="text"
                      size="small"
                      class="text-dark"
                      v-bind="props"
                      :to="{ name: 'DetalhesReserva', params: { id: item.id }}"
                    ></v-btn>
                  </template>
                </v-tooltip>

                <v-tooltip text="Check-in reserva">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon="mdi-car-arrow-right"
                      variant="text"
                      size="small"
                      class="text-dark"
                      v-bind="props"
                      :to="{ name: 'CheckInReserva', params: { id: item.id }}"
                      v-if="item.status === 'Reservado'"
                    ></v-btn>
                  </template>
                </v-tooltip>

                <v-tooltip text="Check-out reserva">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon="mdi-car-arrow-left"
                      variant="text"
                      size="small"
                      class="text-dark"
                      v-bind="props"
                      @click="checkout(item.id)"
                      v-if="item.status === 'Alugado'"
                    ></v-btn>
                  </template>
                </v-tooltip>

                <v-tooltip text="Cancelar reserva">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon="mdi-close"
                      variant="text"
                      size="small"
                      class="text-dark"
                      v-bind="props"
                      @click="cancelar(item.id)"
                      v-if="item.status === 'Reservado'"
                    ></v-btn>
                  </template>
                </v-tooltip>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script>
import { formatDate } from '@/helpers';
import ReservasVeiculoService from '../../../../service/ReservasVeiculosService';
import { defineComponent } from 'vue';
import { erro, sucesso } from '@/toast/toast';
import FipeService from '../../../../service/FipeService';

export default defineComponent({
  name: "ListReservas",
  data() {
    return {
      reservasList: [],
    }
  },
  created() {
    this.loadReservasList();
  },
  methods: {
    loadReservasList() {
      return ReservasVeiculoService.buscarReservas()
        .then((res) => {
          this.reservasList = [];
          res.data.forEach(async (reserva) => {
            reserva.informacoesVeiculo.detalhes = await this.getdetalhesVeiculo(reserva);
            this.reservasList.push(reserva);
          });
        })
        .catch(() => {
          this.reservasList = [];
        });
    },
    formatarData(dateString) {
      return formatDate(dateString);
    },
    getdetalhesVeiculo(reserva) {
      const url = reserva.informacoesVeiculo.detalhesVeiculoAPI;
      return FipeService.getdetalhesVeiculos(url)
        .then(response => {
          const v = response.data;
          return `${v.Marca} ${v.Modelo} ${v.AnoModelo} ${v.Combustivel}`;
        })
        .catch((err) => {
          console.error('Erro: ', err);
          erro('Não foi possível conectar ao servidor. Por favor, verifique sua conexão com a internet.')
        });
    },
    checkout(id) {
      ReservasVeiculoService.checkOut(id)
        .then((res) => {
          this.loading = false;
          sucesso('Check-out realizado');
          this.reservasList = this.reservasList.map((r) => {
            if (r.id == id) {
              r.status = res.data.status;
              r.checkOut = res.data.checkOut;
            }
            return r;
          });
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
          erro(e.data.message);
        });
    },
    cancelar(id) {
      ReservasVeiculoService.cancelarReserva(id)
        .then((res) => {
          this.loading = false;
          sucesso('Cancelamento realizado');
          this.reservasList = this.reservasList.map((r) => {
            if (r.id == id) {
              r.status = res.data.status;
              r.canceledAt = res.data.canceledAt;
            }
            return r;
          });
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