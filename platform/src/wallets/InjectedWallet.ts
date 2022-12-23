import API from '@/helpers/api';
import { store } from '@/store';
import redirectAfterLogin from '@/helpers/redirectAfterLogin';

function init(target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
    if (!target.instance) {
        target.init();
    }
}

class InjectedWallet {
    static init(): void {
        InjectedWallet.handleAll();
    }

    @init
    static async login(): Promise<string> {
        await API.provider.send('eth_requestAccounts', []);
        const address = (await API.provider.listAccounts())[0];

        store.dispatch('wallet/setAddress', address);
        store.dispatch('wallet/setWallet', 'injectedWallet');

        return address;
    }

    static handleAll() {
        InjectedWallet.networkAccountsChange();
        InjectedWallet.handleNetworkChange();
    }

    @init
    static async tryConnectAndSetAddress(_address?: string): Promise<string> {
        const address = _address || (await API.provider.listAccounts())[0];
        store.dispatch('wallet/setAddress', address);

        return address;
    }

    static async disconnect(): Promise<void> {
    }

    static networkAccountsChange(): void {
        window.ethereum.on('accountsChanged', async () => {
            if (store.state.wallet.wallet === 'connectWallet') {
                return;
            } else if (!store.state.wallet.wallet) {
                store.dispatch('wallet/setWallet', 'injectedWallet');
            }

            const address = (await API.provider.listAccounts())[0];

            store.dispatch('wallet/setAddress', address);
            redirectAfterLogin();
            console.log('accountsChanged')
        })
    }

    static handleNetworkChange(): void {
        window.ethereum.on('networkChanged', async () => {
            window.location.reload();
        });
    }
}

export default InjectedWallet;
