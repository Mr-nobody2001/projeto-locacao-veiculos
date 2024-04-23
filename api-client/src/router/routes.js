import cadastroInformacoesVeiculo from "@/router/cadastro-informacoes-veiculo";
import root from "@/router/root";

let routes = []
routes = routes.concat(
    root,
    cadastroInformacoesVeiculo,
);

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