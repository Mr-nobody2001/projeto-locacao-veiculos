export default [{
    path: '/admin',
    component: () => import('@/views/CadastroInformacaoVeiculo/EditItem.vue'),
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