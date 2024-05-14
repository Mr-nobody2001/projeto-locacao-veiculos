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
                    <v-container class="text">
                        <h1 class="d-flex justify-center m-20px">Recuperação de senha</h1>
                        <v-row>
                            <v-col class="d-flex justify-center mt-5" cols="12">
                                <v-icon class="icon-success" icon="mdi-check-circle-outline"></v-icon>
                            </v-col>
                            <v-col class="d-flex justify-center" cols="12">
                                <h3>Enviamos um link de redefinição de senha para email!</h3>
                            </v-col>
                            <v-col class="d-flex justify-center mt-2" cols="12">
                                <v-btn class="" type="submit" color="primary" @click="retornar()">
                                    Retornar
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
import { defineComponent } from "vue";

export default defineComponent({
    name: "successfulPasswordRecovery",
    methods: {
        retornar() {

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
.text {
    text-align: center;
    line-height: 28px;
}
.icon-success {
    font-size: 100px;
    color: #5D67D6;
}
</style>