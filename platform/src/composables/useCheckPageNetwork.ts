import { useRouter, useRoute } from 'vue-router';
import { store } from '@/store';
import changeNetworkRequest from '@/helpers/changeNetworkRequest';
import { NetworksType } from '@/types/networks';

async function useCheckPageNetwork() {
    const router = useRouter();
    const route = useRoute();

    if (route.params.network !== store.state.wallet.network) {
        const response = await changeNetworkRequest(route.params.network as NetworksType);

        if (!response) {
            router.back();
        }
    }
}

export default useCheckPageNetwork;
