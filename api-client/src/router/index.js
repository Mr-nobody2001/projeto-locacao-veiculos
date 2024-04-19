import AppLayout from "@/components/AppLayout.vue";
import LoginForm from "@/components/LoginForm.vue";
import RecoveryPassword from "@/components/RecoveryPassword.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "AppLayout",
        component: AppLayout,
        children: [
            {
                path: "/",
                redirect: "/cadastro",
            },
            {
                path: "/cadastro",
                name: "RegisterForm",
                component: RegisterForm,
            },
            {
                path: "/login",
                name: "LoginForm",
                component: LoginForm,
            },
            {
                path: "/recuperarSenha",
                name: "RecoveryPassword",
                component: RecoveryPassword,
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;