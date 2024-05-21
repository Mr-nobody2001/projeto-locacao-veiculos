export default [{
    path: "/auth",
    name: "AppLayout",
    component: () => import('@/views/auth/AuthLayout.vue'),
    children: [
        {
            path: "",
            redirect: {
                name: "LoginForm"
            }
        },
        {
            path: "cadastro-usuario",
            name: "RegisterForm",
            component:  () => import('@/views/auth/RegisterForm.vue'),
        },
        {
            path: "login",
            name: "LoginForm",
            component: () => import('@/views/auth/LoginForm.vue'),
        },
        {
            path: "cadastro-pagamento",
            name: "PaymentRegistration",
            component:  () => import('@/views/auth/PaymentRegistration.vue'),
        },
        {
            path: "recuperar-senha",
            name: "RecoveryPassword",
            component: () => import('@/views/auth/RecoveryPassword.vue'),
        },
        {
            path: "mensagem-recuperar-senha",
            name: "SuccessfulPasswordRecovery",
            component: () => import('@/views/auth/SuccessfulPasswordRecovery.vue'),
        },
    ]
}]