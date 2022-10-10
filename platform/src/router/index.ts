import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {store} from '@/store';
import scrollIntoView from '@/helpers/scrollIntoView';

// @ts-ignore
import Home from '@/views/home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: 'OuterCircle'
        },
        component: Home
    },
    {
        path: '/ui',
        name: 'ui',
        meta: {
            title: 'UI'
        },
        component: () => import(/* webpackChunkName: "ui" */ '../views/ui.vue'),
    },
    {
        path: '/dao/:id',
        name: 'dao-id',
        meta: {
            title: 'DAO'
        },
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
    scrollIntoView(document.body);
});

export default router
