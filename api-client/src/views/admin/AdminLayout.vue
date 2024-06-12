<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          class="navibar"
          theme="dark"
          permanent
        >
          <v-list color="transparent">
            <router-link :to="{ name: '' }" class="no-underline" >
                <v-list-item prepend-icon="mdi-car-clock" title="Reserva"></v-list-item>
            </router-link>
            <router-link :to="{ name: 'ListVeiculos' }" class="no-underline" >
                <v-list-item prepend-icon="mdi-car" title="Veiculos"></v-list-item>
            </router-link>
            <router-link :to="{ name: 'ListItem' }" class="no-underline" >
                <v-list-item prepend-icon="mdi-car-info" title="Informações do Veiculo"></v-list-item>
            </router-link>
            <router-link :to="{ name: '' }" class="no-underline" >
                <v-list-item prepend-icon="mdi-account" title="Clientes"></v-list-item>
            </router-link>
          </v-list>
        </v-navigation-drawer>
        <v-main>

          <v-app-bar :elevation="2">
            <template v-slot:prepend>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>
            <v-app-bar-title>
              <img src="../../assets/img/logo.jpg" alt="Logo" width="50"/>
            </v-app-bar-title>
          </v-app-bar>

          <router-view />

        </v-main>
      </v-layout>
    </v-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "AdminLayout",
    components: {

    }
})
</script>

<style scoped>
.v-main {
    height: 100vh; 
    overflow-y: auto;
}

.navibar {
    background-color: #5D67D6;
}

.no-underline {
  text-decoration: none;
  color: white;
}

.flex-column {
    flex-direction: column;
}

.layout-content {
    margin-bottom: 60px;
}

.header-content {
    height: 98px;
}
</style>