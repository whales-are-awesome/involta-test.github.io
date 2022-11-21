import useFetchData from '@/composables/useFetchData';
import { computed, watch } from 'vue';
import DaoFactoryService from '@/services/DaoFactoryService';
import { IFetchDaoItemsResponse } from '@/models/services/DaoFactoryService';

function useDaoItems(formData: any) {
    const daoItems = useFetchData<IFetchDaoItemsResponse[]>();
    const formResult = computed(() => ({
        search: formData.value.search,
        voteId: formData.value.voteId,
        statusId: formData.value.statusId
    }));

    fetchDaoItems();
    watch(formResult, fetchDaoItems);
    async function fetchDaoItems() {
        daoItems.value.pending = true;
        daoItems.value.cancel();

        const [data, error, cancel] = await DaoFactoryService.fetchDaoItems(formResult.value);

        if (error) {
            daoItems.value.pending = false;

            return;
        }

        daoItems.value = {data, cancel, pending: false}
    }

    return daoItems;
}

export default useDaoItems;
