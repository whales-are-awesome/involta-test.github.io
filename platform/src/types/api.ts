import { Canceler } from '@/plugins/axios';

// returns data or error
type FetchResult<T> = Promise<[T | null, Error|null, Canceler]>;

type SendResult<T> = Promise<[T|null, Error|null, Canceler?]>;

interface IPaginationParams {
    limit: number
    offset: number
}

interface IResponsePagination<T> {
    items: T[]
    total: number
    limit: number
    offset: number
}

export {
    FetchResult,
    SendResult,
    IResponsePagination,
    IPaginationParams
}
