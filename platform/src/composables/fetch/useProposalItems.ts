import { computed, watch, Ref } from 'vue';
import { useRoute } from 'vue-router';

import { useFetchDataWithTotal } from '@/composables/useFetchData';

import ProposalService from '@/services/ProposalService';
import { IProposalItem, IProposalItemQuery } from '@/types/services/ProposalService';
import { NetworksType } from '@/types/networks';


function useProposalItems(_data: IProposalItemQuery | Ref<IProposalItemQuery>) {
    const route = useRoute();
    const items = useFetchDataWithTotal<IProposalItem>();
    const dataResult = computed(() => {
        const data = 'value' in _data ? _data.value : _data;

        return {
            ...data,
            limit: data.limit || 20,
            offset: data.offset || 0
        }
    });

    fetchItems();
    watch(dataResult, fetchItems);
    async function fetchItems(val?: any, prevVal?: any) {
        const isAddMore = val?.offset !== prevVal?.offset && val?.offset !== 0;

        items.value.pending = true;
        items.value.cancel();

        const [data, error, cancel] = await ProposalService.sampleItems.fetch( {
            network: route.params.network as NetworksType,
            address: route.params.address as string,
        }, dataResult.value).table();

        if (error) {
            items.value.pending = false;
            items.value.error = error;

            return;
        }

        if (isAddMore) {
            items.value.data?.items.push(...(data?.items || []))
        } else {
            items.value.data = data;
        }

        items.value = { ...items.value, cancel, pending: false };

    }

    return [items, fetchItems] as const;
}

export default useProposalItems;
