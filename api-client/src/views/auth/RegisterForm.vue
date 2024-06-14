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

            <v-card-text class="mt-5">
                <RegisterCustomerForm @sent="sent" />
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { defineComponent } from "vue";
import RegisterCustomerForm from "../../components/RegisterCustomerForm.vue";

export default defineComponent({
    name: "RegisterForm",
    methods: {
        sent() {
            this.$router.push({ name: 'LoginForm' });
        },
        voltar() {
            this.$router.go(-1);
        }
    },
    components: {
        RegisterCustomerForm
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