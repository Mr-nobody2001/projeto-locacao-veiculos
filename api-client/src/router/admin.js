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
            path: "veiculos",
            children: [
                {
                    path: "",
                    name: "ListVeiculos",
                    component: () => import('@/views/admin/veiculos/ListVeiculos.vue'),
                },
                {
                    path: "cadastrar",
                    name: "CadastrarVeiculo",
                    component: () => import("@/views/admin/veiculos/EditVehicle.vue"),
                },
                {
                    path: "editar/:id",
                    name: "EditarVeiculo",
                    component: () => import("@/views/admin/veiculos/EditVehicle.vue"),
                }
            ]
        },
        {
            path: "informacoes-veiculos",
            children: [
                {
                    path: "",
                    name: "ListItem",
                    component: () => import('@/views/admin/informacoes-veiculos/ListItem.vue'),
                },
                {
                    path: "cadastrar",
                    name: "EditItem",
                    component: () => import('@/views/admin/informacoes-veiculos/EditItem.vue'),
                },
                {
                    path: "editar/:id",
                    name: "EditarInformacao",
                    component: () => import('@/views/admin/informacoes-veiculos/EditItem.vue'),
                },
            ]
        },
        {
            path: "clientes",
            children: [
                {
                    path: "",
                    name: "ListClientes",
                    component: () => import('@/views/admin/clientes/ListClientes.vue'),
                },
                {
                    path: "cadastrar",
                    name: "CadastrarClientes",
                    component: () => import('@/views/admin/clientes/EditClientes.vue'),
                },
                {
                    path: "editar/:id",
                    name: "EditClientes",
                    component: () => import('@/views/admin/clientes/EditClientes.vue'),
                },
            ]
        },
        {
            path: "reservas",
            children: [
                {
                    path: "",
                    name: "ListReservas",
                    component: () => import('@/views/admin/reserva-veiculo/ListReservas.vue'),
                },
                {
                    path: "detalhes/:id",
                    name: "DetalhesReserva",
                    component: () => import('@/views/admin/reserva-veiculo/ReservaDetalhes.vue'),
                },
                {
                    path: "cadastrar",
                    name: "CadastrarReserva",
                    component: () => import('@/views/admin/reserva-veiculo/CadastrarReserva.vue'),
                },
                {
                    path: "checkin/:id",
                    name: "CheckInReserva",
                    component: () => import('@/views/admin/reserva-veiculo/CheckInReserva.vue'),
                },
            ]
        }
    ]
}];
