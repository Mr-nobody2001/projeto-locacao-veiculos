export default [{
  path: '/list',
  component: () => import('@/views/cadastro-informacao-veiculo/ListItem.vue'),
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