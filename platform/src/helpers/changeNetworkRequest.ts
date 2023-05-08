import { NetworksType, networksChains } from '@/types/networks';
import { alert as alertTwo } from '@/composables/useLayer';

async function changeNetworkRequest(network: NetworksType) {
    const isChangeNetwork = await alertTwo({
        title: 'Wrong network',
        text: `Please switch you network to ${ network }.`,
        buttonText: 'Switch',
        status: 'error',
    });

    if (isChangeNetwork) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: networksChains[network] }]
            }) as boolean;

            return true;
        } catch (e) {
            return false;
        }
    }

    return false;
}

export default changeNetworkRequest;
