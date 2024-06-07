<template>
    <v-layout class="flex-column justify-space-between" full-height>
        <div class="layout-content">
            <router-view />
        </div>
        <RegisterFooter/>
    </v-layout>
</template>

<script>
import RegisterFooter from '@/components/RegisterFooter.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "SiteLayout",
    components: {
        RegisterFooter
    }
})
</script>

<style scoped>
.flex-column {
    flex-direction: column;
}

.layout-content {
    margin-bottom: 60px;
}
</style>
