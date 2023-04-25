import { onMounted } from 'vue';
import { alert } from '@/composables/useLayer';
import API from '@/helpers/api';
import { Networks } from '@/types/networks';

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

        const network = await API.getNetwork();

        if (network !== Networks.Polygon && network !== Networks.Goerli) {
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
                    params: [{ chainId: isChangeNetwork ? '0x89' : '0x5' }]
                });
            }
        }
    });
}

export default useCallDefaultAlerts;
