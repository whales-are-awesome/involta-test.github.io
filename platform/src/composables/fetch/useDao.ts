import { Ref } from 'vue';
import { useFetchData } from '@/composables/useFetchData';
import DaoFactoryService from '@/services/DaoFactoryService';
import { INormalizedDaoAsDefault } from '@/models/services/DaoFactoryService';
import { store } from '@/store';
import { computed, watch } from 'vue';

interface IData {
    address?: string
}

interface IOptions {
    saveInStorage: boolean
}

type Data = Ref<IData> | IData;

function useDao(_data: Data, _options?: IOptions) {
    const info = useFetchData<INormalizedDaoAsDefault>();
    const dataResult = computed(() => {
        const data = 'value' in _data ? _data.value : _data;

        return {
            address: data.address
        }
    });
    const options = {
        saveInStorage: _options?.saveInStorage || false
    };


    fetchDao();
    watch(dataResult, fetchDao);
    async function fetchDao() {
        if (!dataResult.value.address) {
            info.value = { ...info.value, data: null, pending: false, }
            return;
        }
        info.value.pending = true;
        info.value.cancel();
        options.saveInStorage && store.dispatch('dao/setData', { pending: true });

        const [data, error, cancel] = await DaoFactoryService.fetchDaoAsDefault(dataResult.value.address);

        if (error) {
            info.value.pending = false;
            info.value.error = error;

            options.saveInStorage && store.dispatch('dao/removeData');

            info.value = { data: null, cancel, pending: false };

            return;
        }

        options.saveInStorage && store.dispatch('dao/setData', { data, pending: false });
        info.value = { data, cancel, pending: false };

    }

    return info;
}

export default useDao;
