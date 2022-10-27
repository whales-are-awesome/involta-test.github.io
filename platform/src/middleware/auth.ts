import { store } from '@/store';
import API from '@/helpers/api';

export default async function auth({ next, from, to }: any) {
    const isAuthPage = to.name === 'auth';

    if (!from.name) {
        await store.dispatch('web3/updateAddress');
    }

    if (API.isLoggedIn && isAuthPage) {
        next({ name: 'home' });
    }

    if (!API.isLoggedIn  && !isAuthPage) {
        next({ name: 'auth' });
    }

    return next();
}
