//@ts-ignore
import { providers } from 'ethers';
//@ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';
import '@walletconnect/types';
import { store } from '@/store';
import redirectAfterLogin from '@/helpers/redirectAfterLogin';

class ConnectWallet {
    static provider: any;
    static signer: any;
    static address = '';

    static init(qrcode: boolean): void {
        ConnectWallet.provider = new WalletConnectProvider({
            infuraId: process.env.VUE_APP_INFURA_ID,
            qrcode: qrcode
        });

        ConnectWallet.handleAll();

    }

    static handleAll() {
        // ConnectWallet.handleAuthResponse();
        ConnectWallet.handleDisconnect();
        ConnectWallet.handleAccountsChanged();
        ConnectWallet.handleChainChanged();
    }

    // static handleAuthResponse(): void {
    // }

    static handleDisconnect(): void {
        ConnectWallet.provider.on('disconnect', (code: any, reason: any) => {
            console.log("disconnected");
            redirectAfterLogin();
        });
    }

    static handleAccountsChanged(): void {
        ConnectWallet.provider.on('accountsChanged', (accounts: any) => {
            console.log('accountsChanged');
        });
    }

    static handleChainChanged(): void {
        ConnectWallet.provider.on('chainChanged', (chainId: any) => {
            console.log('chainChanged');
        });
    }

    static async login(): Promise<string> {
        try {
            ConnectWallet.init(true);
            ConnectWallet.provider.enable();

            const web3Provider = new providers.Web3Provider(ConnectWallet.provider);
            const signer = await web3Provider.getSigner();
            ConnectWallet.address = await signer.getAddress();

            store.dispatch('wallet/setAddress', ConnectWallet.address);
        } catch (e) {
            console.log(e);
        }

        return ConnectWallet.address;
    }

    static async updateAddress(): Promise<string> {
        ConnectWallet.init(false);
        ConnectWallet.provider.enable();

        if (!ConnectWallet.provider.connected)  {
            return '';
        }

        const web3Provider = new providers.Web3Provider(ConnectWallet.provider);
        const signer = await web3Provider.getSigner();
        ConnectWallet.address = await signer.getAddress();

        store.dispatch('wallet/setAddress', ConnectWallet.address);

        return ConnectWallet.address;
    }
}

export default ConnectWallet;
