<template>
    <v-container fluid>
        <header>
            <div class="header-content d-flex align-center">
                <v-btn variant="text" class="btn-back" color="primary">
                    <v-icon icon="mdi-chevron-left" start></v-icon>
                    Voltar
                </v-btn>
            </div>
        </header>
        <v-card class="mx-auto cardColor" max-width="500px" variant="outlined">
            <v-card-item>
                <div class="d-flex justify-center">
                    <img src="../../assets/img/logo.jpg" alt="Logo" width="140">
                </div>
            </v-card-item>

            <v-card-text>
                <v-form @submit.prevent>
                    <v-container>
                        <h1 class="d-flex justify-center m-20px">Recuperação de senha</h1>
                        <v-row>
                            <v-col class="mt-10" cols="12">
                                <v-text-field 
                                    v-model="email" 
                                    :rules="emailRule" 
                                    label="Email"
                                    required
                                    variant="outlined"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col class="d-flex justify-center mt-2" cols="12">
                                <v-btn class="" type="submit" color="primary" @click="enviarEmail()">
                                    Enviar
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
import { validarEmail } from "@/helpers";
import { defineComponent } from "vue";

export default defineComponent({
    name: "RecoveryPassword",
    data() {
        return {
            email: "",
            emailRule: [
                value => {
                    if (value === "") {
                        return 'Informe um email'
                    }

                    if(validarEmail(value) === false) {
                        return 'Email inválido'
                    }

                    return true;
                },
            ],
        }
    },
    methods: {
        enviarEmail() {

        }
    }
})
</script>

<style scoped>
.header-content {
    height: 98px;
}
.cardColor {
  background-color: rgba(255, 255, 255, 0.5) !important;
  border-color: white !important;
}
</style>