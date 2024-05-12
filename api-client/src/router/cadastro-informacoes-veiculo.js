export default [{
    path: '/admin',
    component: () => import('@/views/cadastro-informacao-veiculo/EditItem.vue'),
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
}]