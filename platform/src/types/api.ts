import { Canceler, AxiosRequestConfig } from '@/plugins/axios';

// returns data or error
type FetchResult<T> = Promise<[T | null, Error|null, Canceler]>;

type SendResult<T> = Promise<[T|null, Error|null, Canceler?]>;

type Config = AxiosRequestConfig;

type ConctactNames = 'daoFactory';

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


interface sendDataOnChainProps {
    contractName: ConctactNames
    methodName: string
    params: any[]
    needReceipt?: boolean
    needWait?: boolean
}

export {
    FetchResult,
    SendResult,
    IResponsePagination,
    IPaginationParams,
    sendDataOnChainProps,
    Config
}
