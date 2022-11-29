import { useFetchData } from '@/composables/useFetchData';
import DaoFactoryService from '@/services/DaoFactoryService';
import { INormalizedDaoAsDefault } from '@/models/services/DaoFactoryService';
import { store } from '@/store';
import { computed, watch } from 'vue';

function useDao(_formData: any, _options?: any) {
    const info = useFetchData<INormalizedDaoAsDefault>();
    const formResult = computed(() => {
        const formData = _formData.value || _formData;

        return {
            address: formData.address
        }
    });
    const options = {
        saveInStorage: _options?.saveInStorage || false
    }


    fetchDao();
    watch(formResult, fetchDao);
    async function fetchDao() {
        info.value.pending = true;
        info.value.cancel();
        options.saveInStorage && store.dispatch('dao/setData', { pending: true });

        const [data, error, cancel] = await DaoFactoryService.fetchDaoAsDefault(formResult.value.address);

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
