import { Canceler, AxiosRequestConfig } from '@/plugins/axios';
import { networksType } from '@/types/networks';

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


interface sendDataChainProps {
    network?: networksType
    contractAddress?: string
    contractABI?: any
    contractName?: ConctactNames
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
    sendDataChainProps,
    Config
}
