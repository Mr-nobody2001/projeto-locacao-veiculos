<template>
    <v-container>
        <header>
            <div class="header-content d-flex align-center">
                <router-link :to="{ name: 'RegisterForm' }" class="ms-auto">
                    <v-btn variant="text" class="btn-back" color="primary">
                        Cadastre-se
                        <v-icon icon="mdi-chevron-right" start></v-icon>
                    </v-btn>
                </router-link>
            </div>
        </header>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

    export default defineComponent({
        name: "RegisterHeader",
    })
</script>