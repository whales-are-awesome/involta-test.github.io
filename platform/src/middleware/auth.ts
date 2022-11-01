import Wallet from '@/wallets';

export default async function auth({ next, from, to }: any) {
    const isAuthPage = to.name === 'auth';

    if (!from.name) {
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
