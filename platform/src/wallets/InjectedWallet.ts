import API from '@/helpers/api';
import { store } from '@/store';
import redirectAfterLogin from '@/helpers/redirectAfterLogin';
import Wallet from '@/wallets/index';

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
        return (await API.eth.requestAccounts())[0];
    }

    static handleAll() {
        InjectedWallet.networkAccountsChange();
        InjectedWallet.handleNetworkChange();
    }

    @init
    static async updateAddress(address?: string): Promise<string> {
        InjectedWallet.address = address || (await API.eth.getAccounts())[0];
        store.dispatch('wallet/setAddress', InjectedWallet.address);

        return InjectedWallet.address;
    }

    static networkAccountsChange(): void {
        window.ethereum.on('accountsChanged', async ([address]: string[]) => {
            Wallet.currentWalletId = 'injectedWallet'
            await InjectedWallet.updateAddress(address);
            redirectAfterLogin();
        })
    }

    static handleNetworkChange(): void {
        window.ethereum.on('networkChanged', async () => {
            redirectAfterLogin();
        });
    }
}

export default InjectedWallet;
