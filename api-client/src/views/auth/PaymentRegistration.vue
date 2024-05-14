<template>
  <v-container fluid>
    <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
      <v-card-item>
        <div class="d-flex justify-center">
          <img src="../../assets/img/logo.jpg" alt="Logo" width="140" />
        </div>
      </v-card-item>
      <v-row class="d-flex justify-center mt-10">
        <v-col cols="10">
          <v-form @submit.prevent="submitPayment" ref="paymentForm">
            <v-text-field
              v-model="cardNumber"
              label="Número do Cartão"
              required
              :rules="cardNumberRule"
              maxlength="16"
              @input="formatCardNumber"
            ></v-text-field>
            <v-text-field
              v-model="cardholderName"
              label="Nome no Cartão"
              required
              :rules="cardholderNameRule"
              maxlength="25"
              @input="formatCardholderName"
            ></v-text-field>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="formattedCardExpiry"
                  label="Data de Validade (MM/AA)"
                  required
                  :rules="cardExpiryRule"
                  maxlength="5"
                  @input="formatCardExpiry"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="cardCvc"
                  label="CVV"
                  required
                  :rules="cardCvcRule"
                  maxlength="4"
                  @input="formatCardCvc"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-col cols="12" class="d-flex justify-center mb-10 mt-5">
              <v-btn
                type="submit"
                color="primary"
                :disabled="!(cardNumber, cardholderName, cardExpiry, cardCvc)"
                >Cadastrar Pagamento</v-btn
              >
            </v-col>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { isValidCardNumber } from '@/helpers';
export default {
  data() {
    return {
      loading: false,
      cardNumber: '',
      cardholderName: '',
      cardExpiry: '',
      cardCvc: '',
      cardNumberRule: [
        value => {
          if (value.length < 16 || value === '') {
            return 'Número de cartão inválido';
          } else if (!isValidCardNumber(value)) {
            return 'Número de cartão inválido';
          }
        }
      ],
      cardholderNameRule: [
        value => {
          if (value === '') {
            return 'O nome é obrigatório';
          }
        }
      ],
      cardCvcRule: [
        value => {
          if (value.length < 3) {
            return 'Código inválido';
          }
        }
      ],
      cardExpiryRule: [
        value => {
          if (value === '' || value.length < 5) {
            return 'Data de expiração é obrigatória';
          } else {
            const [mes, ano] = value.split('/');
            const dataAtual = new Date();
            const anoAtual = dataAtual.getFullYear() % 100;
            const mesAtual = dataAtual.getMonth() + 1;

            if (
              parseInt(ano) < anoAtual ||
              (parseInt(ano) === anoAtual && parseInt(mes) < mesAtual)
            ) {
              return 'Data de expiração deve ser posterior à data atual';
            }

            return true;
          }
        }
      ]
    };
  },
  computed: {
    formattedCardExpiry: {
      get() {
        return this.cardExpiry;
      },
      set(value) {
        // Formatando para MM/AA
        const onlyNumbers = value.replace(/[^\d]/g, '');
        if (onlyNumbers.length > 2) {
          this.cardExpiry = `${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(
            2
          )}`;
        } else {
          this.cardExpiry = onlyNumbers;
        }
      }
    }
  },
  methods: {
    submitPayment() {
      this.loading = true;
      const data = {
        cardNumber: this.cardNumber,
        cardholderName: this.cardholderName,
        cardExpiry: this.cardExpiry,
        cardCvc: this.cardCvc
      };

      //Enviar dados para o backend
      console.log(data);
    },
    formatCardNumber() {
      // Remove caracteres não numéricos do número do cartão
      this.cardNumber = this.cardNumber.replace(/\D/g, '');
    },
    formatCardholderName() {
      // Converter o nome do titular para letras maiúsculas
      this.cardholderName = this.cardholderName.toUpperCase();
    },
    formatCardCvc() {
      // Remove caracteres não numéricos do CVV
      this.cardCvc = this.cardCvc.replace(/\D/g, '');
    }
  }
};
</script>

<style>
/* Adicione estilos adicionais aqui, se necessário */
</style>
