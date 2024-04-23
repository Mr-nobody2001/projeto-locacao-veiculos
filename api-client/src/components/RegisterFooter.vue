<template>
    <v-footer class="bg-indigo-lighten-1 d-flex align-start flex-column py-5" style="max-height: 200px">
        <strong class="ms-7 mb-2 text-uppercase">Contato:</strong>
        <div>
            <v-btn class="mx-4" variant="text" size="small">
                <v-icon class="me-2" icon="mdi-instagram"></v-icon>
                <span class="text-lowercase">@easycar</span>
            </v-btn>
        </div>
        <div>
            <v-btn class="mx-4" variant="text" size="small">
                <v-icon class="me-2" icon="mdi-email-outline"></v-icon>
                <span class="text-lowercase">easycar@contato.com.br</span>
            </v-btn>
        </div>
        <div>
            <v-btn class="mx-4" variant="text" size="small">
                <v-icon class="me-2" icon="mdi-whatsapp"></v-icon>
                <span class="text-lowercase">(62) 4004-2950</span>
            </v-btn>
        </div>
    </v-footer>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "RegisterFooter",
});
</script>