<template>
    <v-container fluid>
    <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Nome</th>
            <th class="text-left">CPF</th>
            <th class="text-left">Telefone</th>
            <th class="text-left">Email</th>
            <th class="text-left">Endereço</th>
            <th>
              <div class="d-flex align-center justify-end">
                <router-link :to="{ name: 'CadastrarClientes' }" class="btn-adicionar">
                    <v-btn color="primary">
                      <v-icon icon="mdi-plus" start></v-icon>
                        Cliente
                    </v-btn>
                </router-link>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in clientesList"
            :key="item.name"
          >
            <td class="py-4">
                {{ item.nome }}
            </td>
            <td class="py-4">
                {{ mascararCPF(item.cpf) }}
            </td>
            <td class="py-4">
                {{ mascararTelefone(item.telefone) }}
            </td>
            <td class="py-4">
                {{ item.email }}
            </td>
            <td class="py-4">
                {{ item.endereco }}
            </td>
            <td class="py-4">
              <div class="d-flex justify-end">
                <v-btn 
                  icon="mdi-pencil"
                  variant="text"
                  size="small"
                  class="text-dark"
                  :to="{ name: 'EditClientes', params: { id: item.id }}"
                ></v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script>
import { formatarCPF, formatarTelefone } from '@/helpers';
import ClienteService from '../../../../service/ClienteService';
import { defineComponent } from 'vue';

export default defineComponent ({
    name: "ListClientes",
    data() {
        return {
            clientesList: [],
        }
    },
    created() {
        this.loadClientesList();
    },
    methods: {
        async loadClientesList() {
            try {
                const res = await ClienteService.buscarClientes();
                this.clientesList = res.data;
            } catch {
                this.clientesList = [];
            }
        },
        mascararCPF(cpf) {
            return formatarCPF(cpf);
        },
        mascararTelefone(telefone) {
            return formatarTelefone(telefone);
        },
    },
})
</script>