import { store } from '@/store';

export default function auth({ next, to, router }: any) {
    const isAuthPage = to.name === 'auth';
    const loggedIn = store.getters['wallet/loggedIn'];

    if (loggedIn && isAuthPage) {
        router.push({ name: 'home' });

        return false;
    }

    if (!loggedIn  && !isAuthPage) {
        router.push({ name: 'auth' });

        return false;
    }

    return next();
}
