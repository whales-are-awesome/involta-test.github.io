import AuthClient, { generateNonce } from "@walletconnect/auth-client";
import '@walletconnect/types';
//@ts-ignore
import QRCodeModal from '@walletconnect/qrcode-modal';

class ConnectWallet {
    static instance: AuthClient;
    static address = '';

    static async init(): Promise<void> {
        ConnectWallet.instance = await AuthClient.init({
            relayUrl: 'wss://relay.walletconnect.com',
            projectId: process.env.VUE_APP_CONNECT_WALLET_PROJECT_ID!,
            metadata: {
                name: 'OuterCircle',
                description: "A Dapp using WalletConnect AuthClient",
                url: window.location.host,
                icons: [],
            },
        });

        ConnectWallet.handleAll();
    }

    static handleAll() {
        ConnectWallet.handleAuthResponse();
    }

    static handleAuthResponse(): void {
        ConnectWallet.instance.on('auth_response', ({ params }) => {
            console.log(2);
            console.log(params);
            // if (params.result?.s) {
            //     // Response contained a valid signature -> user is authenticated.
            // } else {
            //     // Handle error or invalid signature case
            //     console.error(params.message);
            // }
        });
    }

    static async login(): Promise<string> {
        if (!ConnectWallet.instance) {
            await ConnectWallet.init();
        }

        const { uri } = await ConnectWallet.instance.request({
            aud: window.location.href,
            domain: window.location.hostname.split('.').slice(-2).join('.'),
            chainId: 'eip155:1',
            type: 'eip4361',
            statement: 'Sign in with wallet.',
            nonce: generateNonce(),
        });

        if (uri) {
            console.log(uri);
            QRCodeModal.open(uri, () => {
                console.log("EVENT", "QR Code Modal closed");
            });
        }

        return '';
    }
}

export default ConnectWallet;
