import site from "@/router/site";
import auth from "./auth";
import admin from "./admin";

let routes = [];
routes = routes.concat(
    site,
    auth,
    admin,
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
