<template>
    <v-container fluid>
        <header>
            <div class="header-content d-flex align-center">
                <v-btn variant="text" class="btn-back" color="primary" @click="voltar">
                    <v-icon icon="mdi-chevron-left" start></v-icon>
                    Voltar
                </v-btn>
            </div>
        </header>
        <v-card class="mx-auto cardColor" max-width="80vw" variant="outlined">
            <v-card-item>
                <div class="d-flex justify-center">
                    <img src="../../assets/img/logo.jpg" alt="Logo" width="140">
                </div>
            </v-card-item>

            <v-card-text>
                <v-form @submit.prevent>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field 
                                    v-model="nomeCompleto"
                                    :rules="nomeCompletoRule"
                                    label="Nome Completo"
                                    required
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field 
                                    v-model="cpf"
                                    :rules="cpfRule"
                                    label="CPF"
                                    v-mask="'###.###.###-##'"
                                    required
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field 
                                    v-model="dataDeNasc"
                                    :rules="dataDeNascRule"
                                    type="date"
                                    min="1900-01-01"
                                    :max="new Date().toISOString().slice(0, 10)"
                                    label="Data de Nascimento"
                                    required
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field 
                                    v-model="telefone"
                                    :rules="telefoneRule"
                                    type="tel"
                                    label="Telefone"
                                    v-mask="'(##) #####-####'"
                                    required
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="12" md="6">
                                <v-text-field 
                                    v-model="email" 
                                    :rules="emailRule"
                                    label="E-mail" 
                                    required
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="12" md="6">
                                <v-text-field 
                                    v-model="endereco" 
                                    :rules="enderecoRule"
                                    label="Endereço" 
                                    required
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field 
                                    type="password"
                                    v-model="senha" 
                                    :rules="senhaRule"
                                    label="Senha" 
                                    required
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field 
                                    type="password"
                                    v-model="confSenha"
                                    :rules="confSenhaRule"
                                    label="Confirmação de Senha"
                                    required
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>

                            <v-col class="d-flex justify-center mt-5" cols="12">
                                <v-btn type="submit" color="primary" :loading="loading" @click="cadastrarCliente()">
                                    Cadastrar
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
import { validarCPF, validarDataNascimento, validarEmail, validarTelefone } from "@/helpers";
import { defineComponent } from "vue";
import {mask} from 'vue-the-mask';
import {erro} from "@/toast/toast";
import ClienteService from "../../../service/ClienteService";

export default defineComponent({
    name: "RegisterForm",
    data() {
        return {
            loading: false,
            nomeCompleto: "",
            cpf: "",
            dataDeNasc:"",
            telefone:"",
            endereco: "",
            email: "",
            senha: "",
            confSenha: "",
            nomeCompletoRule: [
                value => {
                    if (value) return true;
                    return 'Nome completo é obrigatório';
                },
            ],
            cpfRule: [
                value => {
                    if (value === "") {
                        return 'CPF é obrigatório'
                    }

                    if(validarCPF(value) === false) {
                        return 'CPF é inválido'
                    }

                    return true;
                },
            ],
            dataDeNascRule: [
                value => {
                    if (value === "") {
                        return 'Data de nascimento é obrigatório';
                    }
                    
                    if(validarDataNascimento(value) === false) {
                        return 'Data de nascimento inválido'
                    }

                    return true;
                },
            ],
            telefoneRule: [
                value => {
                    if (value === ""){
                        return 'Telefone é obrigatório';
                    } 

                    if(validarTelefone(value) === false){
                        return 'Telefone inválido'
                    }

                    return true;
                },
            ],
            enderecoRule: [
                value => {
                    if (value) return true;
                    return 'Endereço é obrigatório';
                },
            ],
            emailRule: [
                value => {
                    if (value === "") {
                        return 'Email é obrigatório'
                    }

                    if(validarEmail(value) === false) {
                        return 'Email inválido'
                    }

                    return true;
                },
            ],
            senhaRule: [
                value => {
                    if (value === "") {
                        return 'Senha é obrigatório'
                    }
                    if(this.$data.confSenha != '' && value != this.$data.confSenha) {
                        return 'Senhas diferentes'
                    }
                    return true;
                },
            ],
            confSenhaRule: [
                value => {
                    if (value === "") {
                        return 'Confirmação de senha é obrigatório'
                    }
                    if(this.$data.senha != '' && value != this.$data.senha) {
                        return 'Senhas diferentes'
                    }
                    return true;
                },
            ],
        }
    },
    methods: {
      cadastrarCliente() {
        this.loading = true;

        const data = {
          nome: this.nomeCompleto,
          data_nascimento: this.dataDeNasc,
          cpf: this.cpf,
          telefone: this.telefone,
          email: this.email,
          senha: this.senha,
          endereco: this.endereco,
        };

        ClienteService
            .cadastrarCliente(data)
            .then(() => this.$router.push({ name: 'LoginForm' }))
            .catch((err) => {
              console.error('Erro: ', err);
              erro('Ocorreu um erro durante o cadastro do cliente.')
            })
            .finally(() => this.loading = false)
      },

      voltar() {
        this.$router.go(-1);
      }
    },
    directives: {
        mask
    }
});
</script>

<style scoped>
.btn {
    background-color: #5D67D6;
}

.cardColor {
  background-color: rgba(255, 255, 255, 0.5) !important;
  border-color: white !important;
}
</style>