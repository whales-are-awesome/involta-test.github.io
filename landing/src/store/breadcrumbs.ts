import { IBreadcrumb } from '@/models/components/breadcrumbs';

interface IBreadcrumbs {
    items: IBreadcrumb[]
}

const defaultItems: IBreadcrumbs['items'] = [
    { title: 'Главная', link: { name: 'home' } }
];

function state() {
    return {
        items: defaultItems.slice(0)
    };
}

const mutations = {
    clear: (state: any) => state.items = [],
    reset: (state: any) => state.items = defaultItems.slice(0),
    addItem: (state: any, item: any) => state.items.push(item),
    addItems: (state: any, items: any) => state.items = state.items.concat(items)
};

export default {
    state,
    mutations,
    namespaced: true
}
