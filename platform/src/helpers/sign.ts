import { ethers } from 'ethers';
//@ts-ignore
import { CPromise } from 'c-promise2';
import API from '@/helpers/api';
import Wallet from '@/wallets';
import { closeLast, open } from '@/composables/useLayer';

async function sign(message: string) {
    try {
        const signer = await API.getSigner();
        const signPromise = new CPromise(async(resolve: any, reject: any) => {
            try {
                const sign = await signer.signMessage(message) as string;

                resolve(sign);
            } catch (e) {
                reject(new Error('Sign canceled'));
            }
        });

        if (Wallet.currentWalletName === 'connectWallet') {
            open('WalletConnectAction', {
                title: 'Action Required',
                text: 'Please authenticate using your connected device.'
            }).then(isCancel => {
                if (isCancel) {
                    signPromise.cancel();
                }
            });
        }

        const sign = await signPromise;

        const messagePrefixed = '\x19Ethereum Signed Message:\n' + message.length + message;
        const hash = ethers.utils.id(messagePrefixed);

        if (Wallet.currentWalletName === 'connectWallet') {
            closeLast();
        }

        return [{
            hash,
            sign
        }, null] as const;
    } catch (e: any) {
        if (Wallet.currentWalletName === 'connectWallet' && e?.message === 'Sign canceled') {
            closeLast();
        }

        return [null, new Error()] as const;
    }
}

export default sign;
