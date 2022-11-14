import Wallet from '@/wallets';
import API from '@/helpers/api';
import wait from '@/helpers/wait';
import { store } from '@/store';

export default async function auth({ next, from, to }: any) {
    if (!from.name) {
        await wait(() => document.readyState === 'complete');
        await API.init();
        await Wallet.init();
    }

    const isAuthPage = to.name === 'auth';
    const loggedIn = store.getters['wallet/loggedIn'];

    if (loggedIn && isAuthPage) {
        next({ name: 'home' });
    }

    if (!loggedIn  && !isAuthPage) {
        next({ name: 'auth' });
    }

    return next();
}
