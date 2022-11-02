import router from '@/router';
import Wallet from '@/wallets';

export default function redirectAfterLogin(): void {
    const isAuthPage = router.currentRoute.value.name === 'auth';

    if (Wallet.loggedIn && isAuthPage) {
        router.push({ name: 'home' });
    }

    if (!Wallet.loggedIn && !isAuthPage) {
        window.location.reload();
    }
}