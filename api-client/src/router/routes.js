import site from "@/router/site";
import auth from "./auth";
import informacoesVeiculo from "./informacoes-veiculo";
import cadastroVeiculo from "./cadastro-veiculo";

let routes = [];
routes = routes.concat(
    site,
    auth,
    informacoesVeiculo,
    cadastroVeiculo
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
