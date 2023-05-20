import { computed, watch, Ref } from 'vue';
import { useFetchDataWithTotal } from '@/composables/useFetchData';
import DaoService from '@/services/DaoService';
import { INormalizedDaoItemAsTable, IDaoItemQuery } from '@/types/services/DaoService';
import { store } from '@/store';

function useDaoItems(_data: Ref<IDaoItemQuery> | IDaoItemQuery) {
    const items = useFetchDataWithTotal<INormalizedDaoItemAsTable>();
    const dataResult = computed<IDaoItemQuery>(() => {
        const data = 'value' in _data ? _data.value : _data;

        return {
            ...data,
            limit: data.limit || 20,
            offset: data.offset || 0
        }
    });

    fetchItems();
    watch(dataResult, fetchItems);
    async function fetchItems(val?: IDaoItemQuery, prevVal?: IDaoItemQuery) {
        const isAddMore = val?.offset !== prevVal?.offset && val?.offset !== 0;
        const network = store.state.wallet.network;

        if (!network) {
            items.value.pending = false;
            return;
        }

        items.value.pending = true;
        items.value.cancel();

        const [data, error, cancel] = await DaoService.sampleItems.fetch(dataResult.value, network).table();

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

export default useDaoItems;
