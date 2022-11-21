import { ref } from 'vue';
import { Canceler } from '@/plugins/axios';

interface IFetchData<T> {
    pending: boolean
    data: T | null
    cancel: Canceler | (() => void)
}

function useFetchData<T>() {
    return ref<IFetchData<T>>({
        pending: true,
        data: null,
        cancel: () => {}
    })
}

export default useFetchData;
