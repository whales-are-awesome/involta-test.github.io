import { ref } from 'vue';
import { Canceler } from '@/plugins/axios';
import { IResponsePaginationNormalized } from '@/types/api'


interface IData<T> {
    pending: boolean
    data: T | null
    cancel: Canceler | (() => void)
    error?: Error | null
}

function useFetchData<T>() {
    return ref<IData<T>>({
        pending: true,
        data: null,
        error: null,
        cancel: () => {}
    })
}

function useFetchDataWithTotal<T>() {
    return ref<IData<IResponsePaginationNormalized<T>>>({
        pending: true,
        data: null,
        cancel: () => {}
    })
}

export {
    useFetchData,
    useFetchDataWithTotal
};
