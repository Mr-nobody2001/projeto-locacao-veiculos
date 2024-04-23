export default [{
    path: "/",
    name: "AppLayout",
    component: () => import('@/views/AppLayout.vue'),
    children: [
        {
            path: "/",
            redirect: {
                name: "LoginForm"
            }
        },
        {
            path: "/cadastro-usuario",
            name: "RegisterForm",
            component:  () => import('@/views/root/RegisterForm.vue'),
        },
        {
            path: "/login",
            name: "LoginForm",
            component: () => import('@/views/root/LoginForm.vue'),
        },
        {
            path: "/recuperar-senha",
            name: "RecoveryPassword",
            component: () => import('@/views/root/RecoveryPassword.vue'),
        }
    ]
}]