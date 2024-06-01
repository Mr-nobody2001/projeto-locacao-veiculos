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
                <v-list-item prepend-icon="mdi-view-dashboard" title="Perfil"></v-list-item>
            </router-link>
            <router-link :to="{ name: 'ListVeiculos' }" class="no-underline" >
                <v-list-item prepend-icon="mdi-view-dashboard" title="Veiculos"></v-list-item>
            </router-link>
            <router-link :to="{ name: 'ListItem' }" class="no-underline" >
                <v-list-item prepend-icon="mdi-view-dashboard" title="Informações do Veiculo"></v-list-item>
            </router-link>
            <router-link :to="{ name: '' }" class="no-underline" >
                <v-list-item prepend-icon="mdi-view-dashboard" title="Clientes"></v-list-item>
            </router-link>
          </v-list>
        </v-navigation-drawer>
        <v-main>
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