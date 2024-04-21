import cadastroInformacoesVeiculo from "@/router/cadastro-informacoes-veiculo";

let routes = []
routes = routes.concat(
    cadastroInformacoesVeiculo,
);

// routes.push({
//     path: '/',
//     redirect: {
//         name: 'Login'
//     }
// });

// routes.push({
//     path: '*',
//     component: () => import('@/views/pages/Index'),
//     children: [
//         {
//             name: '404 Error',
//             path: '',
//             component: () => import('@/views/pages/Error'),
//         }
//     ]
// })

export default routes;