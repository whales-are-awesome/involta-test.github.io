import { useFetchDataWithTotal } from '@/composables/useFetchData';
import { computed, watch } from 'vue';
import DaoFactoryService from '@/services/DaoFactoryService';
import { INormalizedDaoItemAsTable } from '@/models/services/DaoFactoryService';

function useDaoItems(_formData: any) {
    const items = useFetchDataWithTotal<INormalizedDaoItemAsTable>();
    const formResult = computed(() => {
        const formData = _formData.value || _formData;

        return {
            ...(formData),
            search: formData.search,
            categoryId: formData.categoryId,
            limit: formData.limit || 20,
            offset: formData.offset || 0
        }
    });

    fetchItems();
    watch(formResult, fetchItems);
    async function fetchItems(val?: any, prevVal?: any) {
        const isAddMore = val?.offset !== prevVal?.offset && val?.offset !== 0;

        items.value.pending = true;
        items.value.cancel();

        const [data, error, cancel] = await DaoFactoryService.fetchDaoItemsAsTable(formResult.value);

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

    return items;
}

export default useDaoItems;
