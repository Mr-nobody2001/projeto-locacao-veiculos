<template>
    <v-dialog v-model="dialog" max-width="400" persistent>
        <v-card>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text>{{ message }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancel">
                    Cancelar
                </v-btn>
                <v-btn @click="confirm">
                    Confirmar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
    name: 'ConfirmationDialog',
    setup() {
        const state = reactive({
            dialog: false,
            resolve: null,
            message: null,
            title: null,
        });

        const open = (title, message) => {
            state.dialog = true;
            state.title = title;
            state.message = message;
            return new Promise((resolve) => {
                state.resolve = resolve;
            });
        };

        const confirm = () => {
            if (state.resolve) state.resolve(true);
            state.dialog = false;
        };

        const cancel = () => {
            state.resolve(false);
            state.dialog = false;
        };

        return {
            ...toRefs(state),
            open,
            confirm,
            cancel
        };
    }
});
</script>