import router from '@/router';
import { store } from '@/store';

export default function redirectAfterLogin(): void {
    const isAuthPage = router.currentRoute.value.name === 'auth';
    const loggedIn = store.getters['wallet/loggedIn'];

    if (loggedIn && isAuthPage) {
        router.push({ name: 'home' });
    }

    if (!loggedIn && !isAuthPage) {
        window.location.reload();
    }
}
