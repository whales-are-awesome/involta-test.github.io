import useFetchData from '@/composables/useFetchData';
import { computed, watch } from 'vue';
import DaoFactoryService from '@/services/DaoFactoryService';
import { IDaoItemResponse } from '@/models/services/DaoFactoryService';

function useProposalItems(formData: any) {
    const items = useFetchData<IDaoItemResponse[]>();
    const formResult = computed(() => ({
        search: formData.value.search,
        voteId: formData.value.voteId,
        statusId: formData.value.statusId
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
