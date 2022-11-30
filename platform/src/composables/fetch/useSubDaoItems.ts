import { useFetchDataWithTotal } from '@/composables/useFetchData';
import { computed, watch } from 'vue';
import DaoFactoryService from '@/services/DaoFactoryService';
import { INormalizedSubDaoItemAsDefault } from '@/models/services/DaoFactoryService';

function useSubDaoItems(_formData: any) {
    const items = useFetchDataWithTotal<INormalizedSubDaoItemAsDefault>();
    const formResult = computed(() => {
        const formData = _formData.value || _formData;

        return {
            ...(formData),
            parentAddress: formData.parentAddress
        }
    });

    fetchItems();
    watch(formResult, fetchItems);
    async function fetchItems() {
        items.value.pending = true;
        items.value.cancel();

        const [data, error, cancel] = await DaoFactoryService.fetchSubDaoItemsAsDefault(formResult.value.parentAddress, { ...formResult.value, parentAddress: null });

        if (error) {
            items.value.pending = false;

            return;
        }

        items.value = { data, cancel, pending: false };

    }

    return items;
}

export default useSubDaoItems;
