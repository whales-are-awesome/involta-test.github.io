import { ethers } from 'ethers';
import API from '@/helpers/api';

async function sign(message: string) {
    try {
        const signer = await API.getSigner();
        const sign = await signer.signMessage(message) as string;

        const messagePrefixed = '\x19Ethereum Signed Message:\n' + message.length + message;
        const hash = ethers.utils.id(messagePrefixed);

        return [{
            hash,
            sign
        }, null] as const;
    } catch (e) {
        return [null, new Error()] as const;
    }
}

export default sign;
