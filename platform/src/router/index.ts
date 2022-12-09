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
            title: 'OuterCircle',
            middleware: [walletsInitMiddleware, authMiddleware]
        },
        component: Home
    },
    {
        path: '/ui',
        name: 'ui',
        meta: {
            title: 'UI',
            middleware: [walletsInitMiddleware]
        },
        component: () => import(/* webpackChunkName: "ui" */ '../views/ui.vue'),
    },
    {
        path: '/:network/dao/:address',
        name: 'network-dao-address',
        meta: {
            title: 'DAO',
            middleware: [walletsInitMiddleware, authMiddleware]
        },
        component: () => import(/* webpackChunkName: "dao" */ '../views/_network/dao/_id/index.vue'),
    },
    {
        path: '/:network/dao/:address/members',
        name: 'network-dao-address-members',
        meta: {
            title: 'DAO members',
            middleware: [walletsInitMiddleware, authMiddleware]
        },
        component: () => import(/* webpackChunkName: "members" */ '../views/_network/dao/_id/members.vue'),
    },
    {
        path: '/:network/dao/:address/:subdao',
        name: 'network-dao-address-subdao',
        meta: {
            title: 'SubDAO',
            middleware: [walletsInitMiddleware, authMiddleware]
        },
        component: () => import(/* webpackChunkName: "subdao" */ '../views/_network/dao/_id/index.vue'),
    },
    {
        path: '/proposal/:id/',
        name: 'proposal-id',
        meta: {
            title: 'Proposal',
            middleware: [walletsInitMiddleware, authMiddleware]
        },
        component: () => import(/* webpackChunkName: "proposal" */ '../views/proposal/_id.vue'),
    },
    {
        path: '/app',
        name: 'app',
        meta: {
            title: 'App',
            middleware: [walletsInitMiddleware, authMiddleware]
        },
        component: () => import(/* webpackChunkName: "apps" */ '../views/app/index.vue'),
    },
    {
        path: '/auth',
        name: 'auth',
        meta: {
            title: 'Connect wallet',
            middleware: [walletsInitMiddleware, authMiddleware]
        },
        component: () => import(/* webpackChunkName: "auth" */ '../views/auth/index.vue'),
    },
    {
        path: '/test',
        name: 'test',
        meta: {
            title: 'Test',
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

router.afterEach((context, to) => {
    // @ts-ignore
    if (to.meta.title) document.title = to.meta.title;

    store.commit('breadcrumbs/clear');
    scrollIntoView(document.body);
});

//@ts-ignore
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    //@ts-ignore
    return (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Then run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({...context, next: nextMiddleware});
    };
}

export default router
