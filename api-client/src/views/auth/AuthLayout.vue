<template>
    <v-layout class="flex-column justify-space-between" full-height>
        <div class="layout-content">
            <router-view />
        </div>
        <RegisterFooter/>
    </v-layout>
</template>

<script>
import { defineComponent } from "vue";
import RegisterFooter from "../../components/RegisterFooter.vue";

export default defineComponent({
    name: "AppLayout",
    components: {
        RegisterFooter
    }
})
</script>

<style>
.flex-column {
    flex-direction: column;
}

.layout-content {
    margin-bottom: 60px;
}

.header-content {
    height: 98px;
}
</style>