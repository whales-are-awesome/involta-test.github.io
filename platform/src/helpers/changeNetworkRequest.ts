import { NetworksType, networksChains } from '@/types/networks';
import { alert } from '@/composables/useLayer';

async function changeNetworkRequest(network: NetworksType) {
    const isChangeNetwork = await alert({
        title: 'Wrong network',
        text: `Please switch you network to ${ network }.`,
        buttonText: 'Switch',
        status: 'error',
    });

    if (isChangeNetwork) {
        const isChanged = await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: networksChains[network] }]
        }) as boolean;

        return isChanged;
    }

    return false;
}

export default changeNetworkRequest;
