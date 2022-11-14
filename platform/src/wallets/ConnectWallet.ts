//@ts-ignore
import { providers } from 'ethers';
//@ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';
import '@walletconnect/types';
import { store } from '@/store';

class ConnectWallet {
    static provider: any;
    static signer: any;

    static init(qrcode: boolean): void {
        ConnectWallet.provider = new WalletConnectProvider({
            infuraId: process.env.VUE_APP_INFURA_ID,
            qrcode: qrcode
        });

        ConnectWallet.handleAll();
    }

    static handleAll() {
        ConnectWallet.handleDisconnect();
        ConnectWallet.handleAccountsChanged();
        ConnectWallet.handleChainChanged();
    }

    static handleDisconnect(): void {
        ConnectWallet.provider.on('disconnect', (code: any, reason: any) => {
            window.location.reload();
        });
    }

    static handleAccountsChanged(): void {
        ConnectWallet.provider.on('accountsChanged', ([account]: any) => {
            store.dispatch('wallet/setAddress', account);
        });
    }

    static handleChainChanged(): void {
        ConnectWallet.provider.on('chainChanged', (chainId: any) => {
            console.log('chainChanged');
        });
    }

    static async login(): Promise<string> {
        let address = '';

        try {
            ConnectWallet.init(true);
            ConnectWallet.provider.enable();

            const web3Provider = new providers.Web3Provider(ConnectWallet.provider);
            const signer = await web3Provider.getSigner();

            address = await signer.getAddress();

            store.dispatch('wallet/setAddress', address);
            store.dispatch('wallet/setWallet', 'connectWallet');
        } catch (e) {
            console.log(e);
        }

        return address;
    }

    static async disconnect(): Promise<void> {
        //@ts-ignore
        await ConnectWallet.provider.close();
    }

    static async tryConnectAndSetAddress(): Promise<string> {
        ConnectWallet.init(false);
        ConnectWallet.provider.enable();

        if (!ConnectWallet.provider.connected)  {
            return '';
        }

        const web3Provider = new providers.Web3Provider(ConnectWallet.provider);
        const signer = await web3Provider.getSigner();
        const address = await signer.getAddress();

        store.dispatch('wallet/setAddress', address);

        return address;
    }
}

export default ConnectWallet;
