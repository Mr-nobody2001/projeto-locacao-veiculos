<template>
  <v-form @submit.prevent v-model="isFormValid">
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field 
          v-model="nomeCompleto" 
          :rules="nomeCompletoRule" 
          label="Nome Completo" 
          variant="outlined"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="cpf"
          :rules="cpfRule"
          label="CPF"
          v-mask="'###.###.###-##'"
          variant="outlined"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field v-model="dataDeNasc" :rules="dataDeNascRule" type="date" min="1900-01-01"
          :max="new Date().toISOString().slice(0, 10)" label="Data de Nascimento" required
          variant="outlined"></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field v-model="telefone" :rules="telefoneRule" type="tel" label="Telefone" v-mask="'(##) #####-####'"
          required variant="outlined"></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <v-text-field v-model="email" :rules="emailRule" label="E-mail" required variant="outlined"></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <v-text-field v-model="endereco" :rules="enderecoRule" label="Endereço" required
          variant="outlined"></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field type="password" v-model="senha" :rules="senhaRule" label="Senha" required
          variant="outlined"></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field type="password" v-model="confSenha" :rules="confSenhaRule" label="Confirmação de Senha" required
          variant="outlined"></v-text-field>
      </v-col>

      <v-col class="d-flex justify-center mt-5" cols="12">
        <v-btn type="submit" color="primary" :loading="loading" @click="cadastrarCliente()">
          {{  textButton  }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { validarCPF, validarDataNascimento, validarEmail, validarTelefone } from '@/helpers';
import ClienteService from '../../service/ClienteService';
import { mask } from 'vue-the-mask';
import { erro } from '@/toast/toast';

export default {
  name: "RegisterCustomerForm",
  props: {
    clienteId: {
      type: Number,
      required: false,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      nomeCompleto: "",
      cpf: "",
      dataDeNasc: "",
      telefone: "",
      endereco: "",
      email: "",
      senha: "",
      confSenha: "",
      isFormValid: false,
      textButton: "Cadastrar",
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

          if (validarCPF(value) === false) {
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

          if (validarDataNascimento(value) === false) {
            return 'Data de nascimento inválido'
          }

          return true;
        },
      ],
      telefoneRule: [
        value => {
          if (value === "") {
            return 'Telefone é obrigatório';
          }

          if (validarTelefone(value) === false) {
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

          if (validarEmail(value) === false) {
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
          if (this.$data.confSenha != '' && value != this.$data.confSenha) {
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
          if (this.$data.senha != '' && value != this.$data.senha) {
            return 'Senhas diferentes'
          }
          return true;
        },
      ],
    }
  },
  methods: {
    cadastrarCliente() {
      if (!this.isFormValid) return;

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

      if (this.clienteId) {
        ClienteService
          .atualizarCliente(this.clienteId, data)
          .then(() => this.$emit('sent'))
          .catch((e) => {
            erro(e.data.message)
          })
          .finally(() => this.loading = false)
      } else {
        ClienteService
          .cadastrarCliente(data)
          .then(() => this.$emit('sent'))
          .catch((e) => {
            erro(e.data.message)
          })
          .finally(() => this.loading = false)
      }      
    },
  },
  created() {
    if (this.$props.clienteId) {
      this.textButton = "Atualizar";
      ClienteService.buscarCliente(this.$props.clienteId)
        .then((res) => {
          this.nomeCompleto = res.data.nome;
          this.cpf = res.data.cpf;
          this.dataDeNasc = res.data.data_nascimento;
          this.telefone = res.data.telefone;
          this.endereco = res.data.endereco;
          this.email = res.data.email;
        })
        .catch(() => {
          this.$router.push({ name: 'ListClientes' });
          erro('Cliente não encontrado');
        });
    }
  },
  directives: {
    mask
  }
}
</script>