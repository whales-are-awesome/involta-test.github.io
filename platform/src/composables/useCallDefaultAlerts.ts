import { onMounted } from 'vue';
import { alert } from '@/composables/useLayer';
import { Networks, NetworksChains } from '@/types/networks';
import { store } from '@/store';

function useCallDefaultAlerts() {
    onMounted(async () => {
        await alert({
            title: 'Welcome to <br>OuterCircle Alpha!',
            text: `This application is currently under development and should only be used for demonstration purposes.
               <br><br>Use at your own risk. <br><br>All created DAOs must be manually migrated to the OuterCircle Beta when it will released.`,
            buttonText: 'Accept',
            cancelButtonText: '',
            status: 'unknown',
            closeOnClickOutside: false,
            themeSettings: {
                text: 'text-left'
            }
        });

        const network = store.state.wallet.network;

        //@ts-ignore
        if (network && ![Networks.Polygon, Networks.Goerli].includes(network)) {
            const isChangeNetwork = await alert({
                title: 'Wrong network',
                text: `This application currently supports only two networks: goerli and polygon. Please switch you network.`,
                buttonText: 'Polygon',
                cancelButtonText: 'Goerli',
                status: 'error',
                closeOnClickOutside: false
            });

            if (typeof isChangeNetwork === 'boolean') {
                window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: isChangeNetwork ? NetworksChains.Polygon : NetworksChains.Goerli }]
                });
            }
        }
    });
}

export default useCallDefaultAlerts;
