<template>
    <v-container fluid>
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
        <v-card class="mx-auto my-10 cardColor" max-width="500px" variant="outlined">
            <v-card-item>
                <div class="d-flex justify-center">
                    <img src="../../assets/img/logo.jpg" alt="Logo" width="140">
                </div>
            </v-card-item>

            <v-card-text>
                <v-form @submit.prevent>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="email" :rules="emailRule" label="Email" required variant="outlined"/>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field type="password" v-model="senha" :rules="senhaRule" label="Password" required variant="outlined"/>

                              <router-link :to="{ name: 'RecoveryPassword' }" class="ms-auto">
                                  <div class="d-flex justify-center justify-sm-end mt-5 mt-sm-n5">
                                      <v-btn class="text-none" size="small" variant="text" color="primary">Esqueceu a senha?</v-btn>
                                  </div>
                              </router-link>
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
import { erro } from '@/toast/toast';
import AuthService from '../../../service/AuthService';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "LoginForm",
    data() {
        return {
            loading: false,
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
            this.loading = true;

            const dataLogin = {
                email: this.email,
                password: this.senha,
            }

            AuthService.login(dataLogin)
                .then(response => {
                    this.$store.dispatch('login', response.data)
                })
                .catch((err) => {
                    console.error('Erro: ', err);
                    erro('Credenciais de login inválidas. Por favor, verifique seu usuário ou senha.')
                })
                .finally(() => this.loading = false);
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
