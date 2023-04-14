import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useFetchDataWithTotal } from '@/composables/useFetchData';

import ProposalService from '@/services/ProposalService';
import { IProposalItem } from '@/types/services/ProposalService';


function useProposalItems(_data: any) {
    const route = useRoute();
    const items = useFetchDataWithTotal<IProposalItem>();
    const dataResult = computed(() => {
        const data = _data.value || _data;

        return {
            ...(data),
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

        const [data, error, cancel] = await ProposalService.fetchDaoProposalItems( {
            network: route.params.network as string,
            address: route.params.address as string,
        }, dataResult.value);

        if (error) {
            items.value.pending = false;

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
