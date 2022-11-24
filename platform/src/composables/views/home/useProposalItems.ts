import { useFetchDataWithTotal } from '@/composables/useFetchData';
import { computed, watch } from 'vue';
import DaoFactoryService from '@/services/DaoFactoryService';
import { IDaoItem } from '@/models/services/DaoFactoryService';

function useProposalItems(formData: any) {
    const items = useFetchDataWithTotal<IDaoItem>();
    const formResult = computed(() => ({
        search: formData.value.search,
        voteId: formData.value.voteId,
        statusId: formData.value.statusId,
        limit: formData.value.limits.proposals,
        offset: formData.value.offsets.proposals,
    }));

    fetchItems();
    watch(formResult, fetchItems);
    async function fetchItems() {
        items.value.pending = true;
        items.value.cancel();

        const [data, error, cancel] = await DaoFactoryService.fetchProposalItemsAsTable(formResult.value);

        if (error) {
            items.value.pending = false;

            return;
        }

        items.value = { data, cancel, pending: false };
    }

    return items;
}

export default useProposalItems;
