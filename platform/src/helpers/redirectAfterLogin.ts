import router from '@/router';
import API from '@/helpers/api';

export default function redirectAfterLogin(): void {
    const isAuthPage = router.currentRoute.value.name === 'auth';

    if (API.isLoggedIn && isAuthPage) {
        router.push({ name: 'home' });
    }

    console.log(!API.isLoggedIn, !isAuthPage);

    if (!API.isLoggedIn && !isAuthPage) {
        window.location.reload();
    }
}
