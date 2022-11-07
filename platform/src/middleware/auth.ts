import Wallet from '@/wallets';
import API from '@/helpers/api';

export default async function auth({ next, from, to }: any) {
    const isAuthPage = to.name === 'auth';

    if (!from.name) {
        await API.init();
        await Wallet.init();
    }

    if (Wallet.loggedIn && isAuthPage) {
        next({ name: 'home' });
    }

    if (!Wallet.loggedIn  && !isAuthPage) {
        next({ name: 'auth' });
    }

    return next();
}
