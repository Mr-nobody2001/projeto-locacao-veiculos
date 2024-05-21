<template>
  <v-container fluid>
    <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
      <v-row>
        <v-col cols="12" sm="8">
          <v-card-item class="title">{{ veiculo.modelo }}</v-card-item>
          <v-card-item>
            <span class="brand">Marca: </span>{{ veiculo.marca }}
          </v-card-item>
          <v-card-item>
            <span class="year">Ano: </span>{{ veiculo.ano }}
          </v-card-item>
          <v-card-item>
            <span class="details">Detalhes do Veículo:</span>
            <v-list>
              <v-list-item> {{ veiculo.caracteristicas }}. </v-list-item>
            </v-list>
          </v-card-item>
        </v-col>

        <v-col cols="12" sm="4">
          <v-img :src="veiculo.imagem" class="card-image" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    veiculo: Object
  }
};
</script>

<style scoped>
.title {
  font-weight: bold;
}
.brand {
  font-weight: bold;
}
.details {
  font-weight: bold;
}
.year {
  font-weight: bold;
}
</style>
