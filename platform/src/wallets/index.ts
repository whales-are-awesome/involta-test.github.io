import InjectedWallet from './InjectedWallet';
import ConnectWallet from './ConnectWallet';
import { store } from '@/store';

type wallets = 'injectedWallet' | 'connectWallet' | '';
type walletsClasses = InjectedWallet | ConnectWallet;

class Wallet {
    static currentWalletId: wallets = 'injectedWallet';
    static InjectedWallet = InjectedWallet;
    static ConnectWallet = ConnectWallet;

    static get loggedIn() {
        return !!Wallet.address;
    }

    static get address(): string {
        //@ts-ignore
        return Wallet.currentWallet.address;
    }

    static get currentWallet(): walletsClasses {
        switch (Wallet.currentWalletId) {
            case 'injectedWallet':
                return InjectedWallet;
            case 'connectWallet':
                return ConnectWallet;
            default:
                return InjectedWallet;
        }
    }

    static async init(): Promise<void> {
        if (await InjectedWallet.updateAddress()) {
            // check if loggedIn in InjectedWallet
            Wallet.currentWalletId = 'injectedWallet';
        } else if (await ConnectWallet.updateAddress()) {
            // check if loggedIn in ConnectWallet
            Wallet.currentWalletId = 'connectWallet';
        } else {
            store.dispatch('wallet/setAddress', '');
        }
    }
}

export default Wallet;
