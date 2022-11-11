import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { store } from '@/store';
import scrollIntoView from '@/helpers/scrollIntoView';

import auth from '@/middleware/auth';

// @ts-ignore
import Home from '@/views/home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: 'OuterCircle',
            middleware: [auth]
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
            title: 'DAO',
            middleware: [auth]
        },
        component: () => import(/* webpackChunkName: "ui" */ '../views/dao/_id/index.vue'),
    },
    {
        path: '/dao/:id/:subdao',
        name: 'dao-id-subdao',
        meta: {
            title: 'SubDAO',
            middleware: [auth]
        },
        component: () => import(/* webpackChunkName: "ui" */ '../views/dao/_id/index.vue'),
    },
    {
        path: '/proposal/:id/',
        name: 'proposal-id',
        meta: {
            title: 'Proposal',
            middleware: [auth]
        },
        component: () => import(/* webpackChunkName: "ui" */ '../views/proposal/_id.vue'),
    },
    {
        path: '/auth',
        name: 'auth',
        meta: {
            title: 'Connect wallet',
            middleware: [auth]
        },
        component: () => import(/* webpackChunkName: "ui" */ '../views/auth.vue'),
    },
    {
        path: '/test',
        name: 'test',
        meta: {
            title: 'Test',
        },
        component: () => import(/* webpackChunkName: "ui" */ '../views/test.vue'),
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
});

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({...context, next: nextMiddleware});
    }

    // @ts-ignore
    if (to.meta.title) document.title = to.meta.title;

    return next();
});

router.afterEach((context, asd) => {
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
