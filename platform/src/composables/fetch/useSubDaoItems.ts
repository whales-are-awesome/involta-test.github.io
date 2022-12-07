import { Ref } from 'vue';
import { useFetchDataWithTotal } from '@/composables/useFetchData';
import { computed, watch } from 'vue';
import DaoFactoryService from '@/services/DaoFactoryService';
import { INormalizedSubDaoItemAsDefault, ISubDaoItemQuery } from '@/types/services/DaoFactoryService';
import { pickBy } from 'lodash';

interface IData extends ISubDaoItemQuery {
    parentAddress?: string
}

interface IOptions {
    watch?: boolean
}

type Data = Ref<IData> | IData;

function useSubDaoItems(_data: Data, _options?: IOptions) {
    const items = useFetchDataWithTotal<INormalizedSubDaoItemAsDefault>();
    const dataResult = computed(() => {
        const data = 'value' in _data ? _data.value : _data;
        const params: ISubDaoItemQuery = pickBy(data, (_: any, key: string) => key !== 'parentAddress')

        return {
            params,
            parentAddress: data.parentAddress
        };
    });

    const options = {
        watch: _options?.watch ?? true
    };

    if (options.watch) {
        watch(dataResult, fetchItems);
    }

    fetchItems();
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

    return [items, fetchItems] as const;
}

export default useSubDaoItems;
