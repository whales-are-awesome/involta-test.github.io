import API from '@/helpers/api';
import { store } from '@/store';
import redirectAfterLogin from '@/helpers/redirectAfterLogin';
import emitter from '@/plugins/mitt';

function init(target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor): any {

    const originalMethod = propertyDescriptor.value;

    propertyDescriptor.value = (...args: any) => {
        if (!target.instance) {
            target.init();
        }

        //@ts-ignore
        return originalMethod.apply(this, args);
    };
}

class InjectedWallet {
    static init(): void {
        InjectedWallet.handleAll();
    }

    @init
    static async login(): Promise<string> {
        await API.provider.send('eth_requestAccounts', []);
        const address = (await API.provider.listAccounts())[0];
        const network = await API.getNetwork();

        store.dispatch('wallet/setAddress', address);
        store.dispatch('wallet/setNetwork', network);
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
        const network = await API.getNetwork();

        store.dispatch('wallet/setAddress', address);
        store.dispatch('wallet/setNetwork', network);

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
            const network = await API.getNetwork();

            store.dispatch('wallet/setAddress', address);
            store.dispatch('wallet/setNetwork', network);
            emitter.emit('accountChanged');
            redirectAfterLogin();
            console.log('accountsChanged')
        })
    }

    static handleNetworkChange(): void {
        window.ethereum.on('chainChanged', async () => {
            window.location.reload();
        });
    }
}

export default InjectedWallet;
