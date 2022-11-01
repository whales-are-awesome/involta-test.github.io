import MetaMask from './MetaMask';
import ConnectWallet from './ConnectWallet';
import { store } from '@/store';

type wallets = 'metamask' | 'connectWallet' | '';
type walletsClasses = MetaMask | ConnectWallet;

class Wallet {
    static currentWalletName: wallets = 'metamask';
    static MetaMask = MetaMask;
    static ConnectWallet = ConnectWallet;

    static get loggedIn() {
        return !!Wallet.address;
    }

    static get address(): string {
        //@ts-ignore
        return Wallet.currentWallet.address;
    }

    static get currentWallet(): walletsClasses {
        switch (Wallet.currentWalletName) {
            case 'metamask':
                return MetaMask;
            case 'connectWallet':
                return ConnectWallet;
            default:
                return MetaMask;
        }
    }

    static async init(): Promise<void> {
        // check if loggedIn in MetaMask
        const address = await MetaMask.updateAddress();

        if (!address) {
            store.dispatch('wallet/setAddress', '');
        }
    }
}

export default Wallet;
