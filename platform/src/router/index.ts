import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { store } from '@/store';
import scrollIntoView from '@/helpers/scrollIntoView';

import authMiddleware from '@/middleware/auth';
import walletsInitMiddleware from '@/middleware/wallets-init';

import Home from '@/views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        meta: {
            middleware: [walletsInitMiddleware, authMiddleware]
        },
        component: Home
    },
    {
        path: '/ui',
        name: 'ui',
        meta: {
            middleware: [walletsInitMiddleware]
        },
        component: () => import(/* webpackChunkName: "ui" */ '../views/ui.vue'),
    },
    {
        path: '/:network/dao/:address',
        name: 'network-dao-address',
        meta: {
            middleware: [walletsInitMiddleware, authMiddleware]
        },
        component: () => import(/* webpackChunkName: "dao" */ '../views/_network/dao/_id/index.vue'),
    },
    {
        path: '/:network/dao/:address/followers',
        name: 'network-dao-address-followers',
        meta: {
            middleware: [walletsInitMiddleware, authMiddleware]
        },
        component: () => import(/* webpackChunkName: "followers" */ '../views/_network/dao/_id/followers.vue'),
    },
    {
        path: '/:network/dao/:address/proposal/:proposalId',
        name: 'network-dao-address-proposal-id',
        meta: {
            middleware: [walletsInitMiddleware, authMiddleware]
        },
        component: () => import(/* webpackChunkName: "followers" */ '../views/_network/dao/_id/proposal/_id.vue'),
    },
    {
        path: '/app',
        name: 'app',
        meta: {
            middleware: [walletsInitMiddleware, authMiddleware]
        },
        component: () => import(/* webpackChunkName: "apps" */ '../views/app/index.vue'),
    },
    {
        path: '/auth',
        name: 'auth',
        meta: {
            middleware: [walletsInitMiddleware, authMiddleware]
        },
        component: () => import(/* webpackChunkName: "auth" */ '../views/auth/index.vue'),
    },
    {
        path: '/test',
        name: 'test',
        meta: {
            middleware: [walletsInitMiddleware]
        },
        component: () => import(/* webpackChunkName: "test" */ '../views/test/index.vue'),
    },
    {
        path: "/:catchAll(.*)",
        name: "error",
        component: () => import(/* webpackChunkName: "error" */ '../views/error/index.vue'),
        meta: {
            middleware: [walletsInitMiddleware]
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

function middlewarePipeline (context: any, middleware: any, index: any) {
    const nextMiddleware = middleware[index]
    if(!nextMiddleware){
        return context.next
    }
    return () => {
        const nextPipeline = middlewarePipeline(
            context, middleware, index + 1
        )
        nextMiddleware({ ...context, next: nextPipeline })
    }
}


router.beforeEach((to, from, next) => {
    store.dispatch('error/removeError');

    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware as Array<any>
    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    });
})

router.afterEach((context, to, from) => {
    store.commit('breadcrumbs/clear');
    scrollIntoView(document.body);
});
export default router
