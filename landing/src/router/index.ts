import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {store} from '@/store';

// @ts-ignore
import Home from '@/views/home'

const routes: Array<RouteRecordRaw> = [

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
