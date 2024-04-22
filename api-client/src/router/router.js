import {createWebHistory, createRouter} from 'vue-router'
import routes from "@/router/routes";

const router = createRouter({
    routes,
    mode: 'history',
    history: createWebHistory(),
    base: 'http://localhost:8080',
})

export default router;