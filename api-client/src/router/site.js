export default [{
    path: "/",
    name: "SiteLayout",
    component: () => import('@/views/site/SiteLayout.vue'),
    children: [
        {
            path: "",
            redirect: {
                name: "CategoryPage"
            }
        },
        {
            path: "categoria",
            name: "CategoryPage",
            component: () => import('@/views/site/CategoryPage.vue'),
        }
    ]
}]