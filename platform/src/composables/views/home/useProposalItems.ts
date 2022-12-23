import { useFetchDataWithTotal } from '@/composables/useFetchData';
import { computed, watch } from 'vue';
import ProposalService from '@/services/ProposalService';
import { IProposalItem } from '@/types/services/ProposalService';

function useProposalItems(_formData: any) {
    const items = useFetchDataWithTotal<IProposalItem>();
    const formResult = computed(() => {
        const formData = _formData.value || _formData;

        return {
            search: formData.search,
            voteId: formData.voteId,
            statusId: formData.statusId,
            limit: formData.limit,
            offset: formData.offset
        };
    });

    // fetchItems();
    // watch(formResult, fetchItems);
    // async function fetchItems(val?: any, prevVal?: any) {
    //     items.value.pending = true;
    //     items.value.cancel();
    //
    //     const [data, error, cancel] = await ProposalService.fetchProposalItemsAsTable(formResult.value);
    //
    //     if (error) {
    //         items.value.pending = false;
    //
    //         return;
    //     }
    //
    //     items.value = { data, cancel, pending: false };
    // }

    items.value.pending = false;

    return [items] as const;
}

export default useProposalItems;
