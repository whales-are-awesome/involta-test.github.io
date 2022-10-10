import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {store} from '@/store';

// @ts-ignore
import Home from '@/views/home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/ui',
        name: 'ui',
        component: () => import(/* webpackChunkName: "ui" */ '../views/ui.vue'),
    },
    {
        path: '/dao/:id',
        name: 'dao-id',
        component: () => import(/* webpackChunkName: "ui" */ '../views/dao/_id.vue'),
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
        meta: {
            requiresAuth: false
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    // @ts-ignore
    if (to.meta.title) document.title = to.meta.title;

    next();
});
router.afterEach((context, asd) => {
    store.commit('breadcrumbs/clear');
});

export default router
