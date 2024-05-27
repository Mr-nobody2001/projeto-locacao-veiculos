<template>
  <v-container fluid>
    <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Imagem</th>
            <th class="text-left">Detalhes</th>
            <th class="text-left">Categoria</th>
            <th class="text-left">Cor</th>
            <th class="text-left">Placa</th>
            <th class="text-left">Disponibilidade</th>
            <th class="text-left">Características</th>
            <th></th>
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
              {{getDetalhes(item)}}
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
              {{ item.informacoesVeiculo.caracteristicas.join(', ') }}
            </td>
            <td class="py-4">
              <div class="icon-container">
                <v-btn icon="mdi-pencil" variant="text" size="small"></v-btn>
                <v-btn icon="mdi-trash-can-outline" variant="text" size="small"></v-btn>
                <!-- <v-icon icon="mdi-pencil"></v-icon>
              <v-icon icon="mdi-trash-can-outline" color="red"></v-icon> -->
              </div>
              
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent ({
    name: "ListVeiculos",
    data() {
      return {
        veiculosList: [
            {
                id: 1,
                informacoesVeiculoId: 1,
                placa:'ABC 1234',
                corId: 1,
                categoriaId: 1,
                quilometragem: 1000,
                disponibilidade: "disponivel",
                ultimaManutencao: "2024-05-27 00:00:00",
                createdAt: "2024-05-27 00:00:00",
                updatedAt: "2024-05-27 00:00:00",
                informacoesVeiculo: {
                    id: 1,
                    foto: "/uploads/veiculo/foto_veiculo_1716345034365.png",
                    detalhesVeiculoAPI: "https://parallelum.com.br/fipe/api/v1/carros/marcas/2/modelos/4564/anos/2015-3",
                    caracteristicas: [
                        "Ar-condicionado",
                        "Vidro elétrico",
                        "Trava elétrica",
                        "Air bag",
                        "Automático",
                        "ABS"
                    ],
                    createdAt: "2024-05-27 00:00:00",
                    updatedAt: "2024-05-27 00:00:00",
                    detalhesVeiculo: {
                        TipoVeiculo: 1,
                        Valor: "R$ 111.612,00",
                        Marca: "Agrale",
                        Modelo: "MARRUÁ AM 100 2.8  CS TDI Diesel",
                        AnoModelo: 2015,
                        Combustivel: "Diesel",
                        CodigoFipe: "060003-2",
                        MesReferencia: "maio de 2024",
                        SiglaCombustivel: "D"
                    }
                },
                cor: {
                    id: 1,
                    nome: "Preto",
                    createdAt: "2024-05-27 00:00:00",
                    updatedAt: "2024-05-27 00:00:00",
                },
                categoria: {
                    id: 1,
                    nome: "Sedan",
                    createdAt: "2024-05-27 00:00:00",
                    updatedAt: "2024-05-27 00:00:00",
                }
            },
            {
                id: 2,
                informacoesVeiculoId: 2,
                placa:'ABC 1235',
                corId: 2,
                categoriaId: 1,
                quilometragem: 1000,
                disponibilidade: "disponivel",
                ultimaManutencao: "2024-05-27 00:00:00",
                createdAt: "2024-05-27 00:00:00",
                updatedAt: "2024-05-27 00:00:00",
                informacoesVeiculo: {
                    id: 2,
                    foto: "/uploads/veiculo/foto_veiculo_1716345034365.png",
                    detalhesVeiculoAPI: "https://parallelum.com.br/fipe/api/v1/carros/marcas/2/modelos/4564/anos/2015-3",
                    caracteristicas: [
                        "Ar-condicionado",
                        "Vidro elétrico",
                        "Trava elétrica",
                        "Air bag",
                        "Automático",
                        "ABS"
                    ],
                    createdAt: "2024-05-27 00:00:00",
                    updatedAt: "2024-05-27 00:00:00",
                    detalhesVeiculo: {
                        TipoVeiculo: 1,
                        Valor: "R$ 111.612,00",
                        Marca: "Agrale",
                        Modelo: "MARRUÁ AM 100 2.8  CS TDI Diesel",
                        AnoModelo: 2015,
                        Combustivel: "Diesel",
                        CodigoFipe: "060003-2",
                        MesReferencia: "maio de 2024",
                        SiglaCombustivel: "D"
                    }
                },
                cor: {
                    id: 1,
                    nome: "Preto",
                    createdAt: "2024-05-27 00:00:00",
                    updatedAt: "2024-05-27 00:00:00",
                },
                categoria: {
                    id: 1,
                    nome: "Sedan",
                    createdAt: "2024-05-27 00:00:00",
                    updatedAt: "2024-05-27 00:00:00",
                }
            }
        ]
      } 
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
      }
    }
})
</script>

<style scoped>
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