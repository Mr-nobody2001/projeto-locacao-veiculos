<template>
    <v-container fluid>
        <header>
            <div class="header-content d-flex align-center">
                <v-btn variant="text" class="btn-back" color="primary">
                    <v-icon icon="mdi-chevron-left" start></v-icon>
                    Voltar
                </v-btn>

                <router-link to="/cadastro" class="ms-auto">
                    <v-btn variant="text" class="btn-back" color="primary">
                        Cadastre-se
                        <v-icon icon="mdi-chevron-right" start></v-icon>
                    </v-btn>
                </router-link>
            </div>
        </header>
        <v-card class="mx-auto" max-width="500px">
            <v-card-item>
                <div class="d-flex justify-center">
                    <img src="@/assets/img/logo.jpg" alt="Logo" width="140">
                </div>
            </v-card-item>

            <v-card-text>
                <v-form @submit.prevent>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="email" :rules="emailRule" label="Username" required>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field type="password" v-model="senha" :rules="senhaRule" label="Password"
                                    required>
                                </v-text-field>

                                <div class="d-flex justify-center justify-sm-end mt-3 mt-sm-n5">
                                    <v-btn class="text-none" size="small" variant="text" color="primary">Esqueceu a
                                        senha?</v-btn>
                                </div>
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
    name: "LoginForm",
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
