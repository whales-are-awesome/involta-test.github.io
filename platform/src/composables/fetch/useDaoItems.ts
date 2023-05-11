import { computed, watch } from 'vue';
import { useFetchDataWithTotal } from '@/composables/useFetchData';
import DaoService from '@/services/DaoService';
import { INormalizedDaoItemAsTable } from '@/types/services/DaoService';
import API from '@/helpers/api';
import { store } from '@/store';

function useDaoItems(_data: any) {
    const items = useFetchDataWithTotal<INormalizedDaoItemAsTable>();
    const dataResult = computed(() => {
        const data = _data.value || _data;

        return {
            ...data,
            search: data.search,
            categoryId: data.categoryId,
            limit: data.limit || 20,
            offset: data.offset || 0
        }
    });

    fetchItems();
    watch(dataResult, fetchItems);
    async function fetchItems(val?: any, prevVal?: any) {
        const isAddMore = val?.offset !== prevVal?.offset && val?.offset !== 0;
        const network = store.state.wallet.network;

        if (!network) {
            items.value.pending = false;
            return;
        }

        items.value.pending = true;
        items.value.cancel();

        const [data, error, cancel] = await DaoService.fetchDaoItems(dataResult.value, network).table();

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

export default useDaoItems;
