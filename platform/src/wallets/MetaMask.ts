import API from '@/helpers/api';
import { store } from '@/store';
import redirectAfterLogin from '@/helpers/redirectAfterLogin';

function init(target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
    if (!target.instance) {
        target.init();
    }
}

class MetaMask {
    static address = '';

    static init(): void {
        MetaMask.handleAll();
    }

    @init
    static async login(): Promise<string> {
        const address = (await API.eth.requestAccounts())[0];

        API.address = address;

        return address;
    }

    static handleAll() {
        MetaMask.networkAccountsChange();
        MetaMask.handleNetworkChange();
    }

    @init
    static async updateAddress(): Promise<string> {
        MetaMask.address = (await API.eth.getAccounts())[0];
        store.dispatch('wallet/setAddress', MetaMask.address);

        return MetaMask.address;
    }

    static networkAccountsChange(): void {
        window.ethereum.on('accountsChanged', async () => {
            await MetaMask.updateAddress();
            redirectAfterLogin();
        })
    }

    static handleNetworkChange(): void {
        window.ethereum.on('networkChanged', async () => {
            await MetaMask.updateAddress();
            redirectAfterLogin();
        })
    }
}

export default MetaMask;
