import { Ref } from 'vue';
import { omit } from 'lodash';
import { useFetchDataWithTotal } from '@/composables/useFetchData';
import { computed, watch } from 'vue';
import DaoService from '@/services/DaoService';
import { INormalizedSubDaoItemAsDefault, ISubDaoItemQuery } from '@/types/services/DaoService';

interface IOptions {
    watch?: boolean
}

function useDaoSubDaoItems(_data: ISubDaoItemQuery | Ref<ISubDaoItemQuery>, _options?: IOptions) {
    const items = useFetchDataWithTotal<INormalizedSubDaoItemAsDefault>();
    const dataResult = computed(() => {
        const data = 'value' in _data ? _data.value : _data;

        return {
            ...data
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
        if (!dataResult.value.address) {
            items.value = { ...items.value, data: null, pending: false, };
            return;
        }
        items.value.pending = true;
        items.value.cancel();

        const [data, error, cancel] = await DaoService.subDaoItems
            .fetch({ address: dataResult.value.address, network: dataResult.value.network! }, omit(dataResult.value, ['address', 'network']))
            .default();

        if (error) {
            items.value.pending = false;
            items.value.error = error;

            return;
        }

        items.value = { data, cancel, pending: false };
    }

    return [items, fetchItems] as const;
}

export default useDaoSubDaoItems;
