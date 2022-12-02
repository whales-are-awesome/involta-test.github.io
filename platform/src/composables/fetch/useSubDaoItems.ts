import { Ref } from 'vue';
import { useFetchDataWithTotal } from '@/composables/useFetchData';
import { computed, watch } from 'vue';
import DaoFactoryService from '@/services/DaoFactoryService';
import { INormalizedSubDaoItemAsDefault, ISubDaoItemParams } from '@/models/services/DaoFactoryService';
import { pickBy } from 'lodash';

interface IData extends ISubDaoItemParams {
    parentAddress?: string
}

type Data = Ref<IData> | IData;

function useSubDaoItems(_data: Data) {
    const items = useFetchDataWithTotal<INormalizedSubDaoItemAsDefault>();
    const dataResult = computed(() => {
        const data = 'value' in _data ? _data.value : _data;
        const params: ISubDaoItemParams = pickBy(data, (_: any, key: string) => key !== 'parentAddress')

        return {
            params,
            parentAddress: data.parentAddress
        };
    });


    fetchItems();
    watch(dataResult, fetchItems);
    async function fetchItems() {
        if (!dataResult.value.parentAddress) {
            items.value = { ...items.value, data: null, pending: false, };
            return;
        }
        items.value.pending = true;
        items.value.cancel();

        const [data, error, cancel] = await DaoFactoryService
            .fetchSubDaoItemsAsDefault(dataResult.value.parentAddress, dataResult.value.params);

        if (error) {
            items.value.pending = false;

            return;
        }

        items.value = { data, cancel, pending: false };
    }

    return items;
}

export default useSubDaoItems;
