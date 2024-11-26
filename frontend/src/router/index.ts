import { createMemoryHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "articles",
        component: () => import("../views/Articles.vue"),
    },
    {
        path: "/sale",
        name: "sale",
        component: () => import("../views/Sale.vue"),
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;