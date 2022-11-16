import { MutationTree  } from 'vuex';
import { IBreadcrumb } from '@/components/BaseBreadcrumbs/types';

interface IState {
    items: IBreadcrumb[]
}

const defaultItems: IState['items'] = [
    { title: 'Главная', link: { name: 'home' } }
];

function state(): IState {
    return {
        items: defaultItems.slice(0)
    };
}

const mutations: MutationTree<IState> = {
    clear: (state) => state.items = [],
    reset: (state) => state.items = defaultItems.slice(0),
    addItem: (state, item: IBreadcrumb) => state.items.push(item),
    addItems: (state, items: IState['items']) => state.items = state.items.concat(items)
};

export default {
    state,
    mutations,
    namespaced: true
}

export {
    IState
}
