import Wallet from '@/wallets';
import API from '@/helpers/api';
import wait from '@/helpers/wait';

export default async function walletsInit({ next, from }: any) {
    if (!from.name) {
        await wait(() => document.readyState === 'complete');
        await API.init();
        await Wallet.init();}

    return next();
}
