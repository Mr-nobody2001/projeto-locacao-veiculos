export default [{
    path: "/",
    name: "SiteLayout",
    component: () => import('@/views/site/SiteLayout.vue'),
    children: [
        {
            path: "",
            redirect: {
                name: "HomePage"
            }
        },
        {
            path: "home",
            name: "HomePage",
            component: () => import('@/views/site/HomePage.vue'),
        },
    ]
}]