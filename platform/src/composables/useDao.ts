import { useFetchData } from '@/composables/useFetchData';
import DaoFactoryService from '@/services/DaoFactoryService';
import { IDao } from '@/models/services/DaoFactoryService';
import { store } from '@/store';

function useDao(address: string) {
    const info = useFetchData<IDao>();

    fetchDao();
    async function fetchDao() {
        info.value.pending = true;
        info.value.cancel();
        store.dispatch('dao/setData', { pending: true });

        const [data, error, cancel] = await DaoFactoryService.fetchDaoAsDefault(address);

        if (error) {
            info.value.pending = false;
            info.value.error = error;
            store.dispatch('dao/removeData');

            return;
        }

        store.dispatch('dao/setData', { data, pending: false });
        info.value = { data, cancel, pending: false };

    }

    return info;
}

export default useDao;
