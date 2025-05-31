import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/server",
            name: "server",
            component: () => import("../views/ServerView.vue"),
        },
        // Utils
        {
            path: "/utils",
            name: "utils",
            component: () => import("../views/utils/HomeView.vue"),
        },
        {
            path: "/utils/skindrop",
            name: "utils-skindrop",
            component: () => import("../views/utils/SkinDropView.vue"),
        },
    ],
});

router.afterEach((to, _from) => {
    if (!to.hash) {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }
});

export default router;
