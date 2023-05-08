import InjectedWallet from '@/wallets/InjectedWallet';
import changeNetworkRequest from '@/helpers/changeNetworkRequest';
import { NetworksType } from '@/types/networks';

export default async function checkPageNetwork({ next, to, store, router }: any) {
    if (to.params.network !== store.state.wallet.network) {
        const response = await changeNetworkRequest(to.params.network as NetworksType);
        await InjectedWallet.onNetworkChange();

        if (!response) {
            return;
        } else {
            router.push(to.fullPath);

            return true;
        }
    }

    return next();
}
