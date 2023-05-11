import { Ref } from 'vue';
import { useFetchDataWithTotal } from '@/composables/useFetchData';
import { computed, watch } from 'vue';
import DaoService from '@/services/DaoService';
import { NetworksType } from '@/types/networks';
import { INormalizedSubDaoItemAsDefault, ISubDaoItemQuery } from '@/types/services/DaoService';
import { pickBy } from 'lodash';

interface IData extends ISubDaoItemQuery {
    parentAddress?: string
    network: NetworksType
}

interface IOptions {
    watch?: boolean
}

type Data = Ref<IData> | IData;

function useDaoSubDaoItems(_data: Data, _options?: IOptions) {
    const items = useFetchDataWithTotal<INormalizedSubDaoItemAsDefault>();
    const dataResult = computed(() => {
        const data = 'value' in _data ? _data.value : _data;
        const params: ISubDaoItemQuery = pickBy(data, (_: any, key: string) => key !== 'parentAddress')

        return {
            params,
            parentAddress: data.parentAddress,
            network: data.network
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

        const [data, error, cancel] = await DaoService
            .fetchSubDaoItemsAsDefault({ address: dataResult.value.parentAddress, network: dataResult.value.network }, dataResult.value.params);

        if (error) {
            items.value.pending = false;

            return;
        }

        items.value = { data, cancel, pending: false };
    }

    return [items, fetchItems] as const;
}

export default useDaoSubDaoItems;
