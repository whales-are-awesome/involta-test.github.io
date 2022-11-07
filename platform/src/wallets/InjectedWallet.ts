import API from '@/helpers/api';
import { store } from '@/store';
import redirectAfterLogin from '@/helpers/redirectAfterLogin';

function init(target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
    if (!target.instance) {
        target.init();
    }
}

class InjectedWallet {
    static address = '';

    static init(): void {
        InjectedWallet.handleAll();
    }

    @init
    static async login(): Promise<string> {
        const address = (await API.eth.requestAccounts())[0];

        console.log(address);
        console.log(API.eth);

        API.address = address;

        return address;
    }

    static handleAll() {
        InjectedWallet.networkAccountsChange();
        InjectedWallet.handleNetworkChange();
    }

    @init
    static async updateAddress(): Promise<string> {
        InjectedWallet.address = (await API.eth.getAccounts())[0];
        store.dispatch('wallet/setAddress', InjectedWallet.address);

        return InjectedWallet.address;
    }

    static networkAccountsChange(): void {
        window.ethereum.on('accountsChanged', async () => {
            await InjectedWallet.updateAddress();
            redirectAfterLogin();
        })
    }

    static handleNetworkChange(): void {
        window.ethereum.on('networkChanged', async () => {
            await InjectedWallet.updateAddress();
            redirectAfterLogin();
        })
    }
}

export default InjectedWallet;
