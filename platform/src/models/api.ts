import { Canceler } from '@/plugins/axios';

type FetchResult<T> = Promise<[T | null, Error|null, Canceler]>;
type SendResult<T> = Promise<[T|null, Error|null, Canceler?]>;

interface IResponseWithTotal<T> {
    items: T[]
    total: number
    limit: number
    offset: number
}

export {
    FetchResult,
    SendResult,
    IResponseWithTotal
}
