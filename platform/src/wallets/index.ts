import InjectedWallet from './InjectedWallet';
import ConnectWallet from './ConnectWallet';
import { store } from '@/store';
// import redirectAfterLogin from '@/helpers/redirectAfterLogin';

type walletsClasses = InjectedWallet | ConnectWallet;

class Wallet {
    static InjectedWallet = InjectedWallet;
    static ConnectWallet = ConnectWallet;

    static async disconnect(): Promise<void> {
        //@ts-ignore
        return await Wallet.currentWallet.disconnect();
    }

    static get currentWallet(): walletsClasses {
        switch (store.state.wallet.wallet) {
            case 'injectedWallet':
                return InjectedWallet;
            case 'connectWallet':
                return ConnectWallet;
            default:
                return InjectedWallet;
        }
    }

    static async init(): Promise<void> {
        if (await ConnectWallet.tryConnectAndSetAddress()) {
            // check if loggedIn in ConnectWallet
            store.dispatch('wallet/setWallet', 'connectWallet');
        } else if (await InjectedWallet.tryConnectAndSetAddress()) {
            // check if loggedIn in InjectedWallet
            store.dispatch('wallet/setWallet', 'injectedWallet')
        } else {
            store.dispatch('wallet/setAddress', '');
            InjectedWallet.init();
        }
    }
}

export default Wallet;
