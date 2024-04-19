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
        <v-card class="mx-auto" max-width="500px">
            <v-card-item>
                <div class="d-flex justify-center">
                    <img src="@/assets/img/logo.jpg" alt="Logo" width="140">
                </div>
            </v-card-item>

            <v-card-text>
                <v-form @submit.prevent>
                    <v-container>
                        <h1 class="d-flex justify-center m-20px">Recuperação de senha</h1>
                        <v-row>
                            <v-col class="mt10" cols="12">
                                <v-text-field 
                                    v-model="email" 
                                    :rules="emailRule" 
                                    label="Username" 
                                    required>
                                </v-text-field>
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
import { defineComponent } from "vue";

export default defineComponent({
    name: "RecoveryPassword",
})
</script>