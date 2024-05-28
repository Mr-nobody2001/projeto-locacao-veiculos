

export default [{
    path: "/admin",
    name: "AdminLayout",
    component: () => import('@/views/admin/AdminLayout.vue'),
    children: [
        {
            path: "",
            redirect: {
                name: "ListItem"
            }
        },
        {
            path: "editar-informacao-veiculo/:id",
            component: () => import('@/views/admin/informacoes-veiculos/EditItem.vue'),
        },
        {
            path: "listar-informacao-veiculo",
            name: "ListItem",
            component:  () => import('@/views/admin/informacoes-veiculos/ListItem.vue'),
        },
        {
            path: "criar-informacao-veiculo",
            name: "EditItem",
            component:  () => import('@/views/admin/informacoes-veiculos/EditItem.vue'),
        },
        {
            path: "listar-veiculos",
            name: "ListVeiculos",
            component: () => import('@/views/admin/veiculos/ListVeiculos.vue'),
        },
    ]
}]