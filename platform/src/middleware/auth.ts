import { store } from '@/store';

export default async function auth({ next, to }: any) {
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
