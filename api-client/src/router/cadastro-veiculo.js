export default [
    {
        path: '/cadastrar-veiculo',
        component: () => import('@/views/cadastro-veiculo/EditVehicle.vue'),
        // children: [
        //     {
        //         name: 'Cadastro de Informações de Veículo',
        //         path: '',
        //         component: () => import('@/views/Home'),
        //         // meta: {
        //         //     requiresAuth: true,
        //         //     breadcrumb: [
        //         //         { name: 'Dashboard' }
        //         //     ]
        //         // },
        //     },
        // ],

    },
    {
        path: '/create/:id',
        component: () => import('@/views/cadastro-veiculo/EditVehicle.vue'),
    }
]