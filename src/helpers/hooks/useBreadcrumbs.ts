import { useStore } from '@/store';
import { IBreadcrumb } from '@/models/components/breadcrumbs';

interface IOptions {
    reset?: boolean
}

function useBreadcrumbs(items: IBreadcrumb[], _options: IOptions = {}) {
    const store = useStore();
    const options = Object.assign(_options, {
        reset: false
    });

    if (options.reset) {
        store.commit('breadcrumbs/reset');
    }
    store.commit('breadcrumbs/addItems', items);

    return store.state.breadcrumbs.items;
}

export default useBreadcrumbs;
