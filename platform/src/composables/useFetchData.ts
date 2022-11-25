import { ref } from 'vue';
import { Canceler } from '@/plugins/axios';
import { IResponseWithTotal } from '@/models/api'


interface IData<T> {
    pending: boolean
    data: T | null
    cancel: Canceler | (() => void)
    error?: Error
}

function useFetchData<T>() {
    return ref<IData<T>>({
        pending: true,
        data: null,
        cancel: () => {}
    })
}

function useFetchDataWithTotal<T>() {
    return ref<IData<IResponseWithTotal<T>>>({
        pending: true,
        data: null,
        cancel: () => {}
    })
}

export {
    useFetchData,
    useFetchDataWithTotal
};
