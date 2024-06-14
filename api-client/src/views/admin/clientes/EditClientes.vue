<template>
    <v-container fluid>
        <v-card class="mx-auto mt-10 mb-10" max-width="80vw">
            <v-card-text>
                <RegisterCustomerForm @sent="sent" :clienteId="clienteId" />
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import RegisterCustomerForm from "@/components/RegisterCustomerForm.vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
    name: "EditClientes",
    data() {
        return {
            clienteId: null,
        }
    },
    methods: {
        sent() {
            this.$router.push({ name: 'ListClientes' });
        }
    },
    created() {
        const route = useRoute();
        this.clienteId = route.params.id;
    },
    components: {
        RegisterCustomerForm
    }
})
</script>