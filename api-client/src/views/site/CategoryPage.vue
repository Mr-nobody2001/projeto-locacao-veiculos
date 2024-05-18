<template>
    <v-container class="mt-6 mx-5" fluid>

        <v-card class="mx-auto my-10 cardColor" max-width="500px" variant="outlined">
            <v-card-text>
                <v-form @submit.prevent>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <img src="../../assets/img/logo.jpg" alt="">
                            </v-col>

                            <v-col cols="12">
                                <h3>Carro pequeno</h3>
                            </v-col>
                            <v-col class="d-flex justify-center mt-2" cols="12">
                                <v-btn class="" type="submit" color="primary" @click="enviar()">
                                    Entrar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CategoryPage",
    data() {
        return {
            email: "",
            senha: "",
            emailRule: [
                value => {
                    if (value) return true;
                    return '*Informe o usuário ou email';
                },
            ],
            senhaRule: [
                value => {
                    if (value) return true;
                    return '*Informe a senha';
                },
            ]
        }
    },
    methods: {
        enviar() {

        }
    },
});
</script>

<style scoped>
.cardColor {
    background-color: rgba(255, 255, 255, 0.5) !important;
    border-color: white !important;
}
</style>
