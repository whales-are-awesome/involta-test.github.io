import { ethers, Signer } from 'ethers'
//@ts-ignore
import { CPromise } from 'c-promise2';
import axios, { Canceler } from '@/plugins/axios';
import camelize from '@/helpers/camelize';
import snakelize from '@/helpers/snakelize';
import { FetchResult, SendResult, sendDataChainProps, Config } from '@/types/api'

class API {
    static async get<T>(path: string, params?: {[key: string]: any}): FetchResult<T> {
        try {
            let cancel: Canceler | (() => void) = () => {};

            const data: { data: T } = await axios.get<T>(path, {
                params,
                cancelToken: new axios.CancelToken((_cancel) => cancel = _cancel),
            });

            return [camelize(data.data), null, cancel];
        } catch (e) {
            return [null, e as Error, () => {}];
        }
    }

    static async post<T>(path: string, data?: {[key: string]: any}, config?: Config): SendResult<T> {
        try {
            let cancel: Canceler | (() => void) = () => {};

            const response: { data: T } = await axios.post<T>(path, snakelize(data), {
                cancelToken: new axios.CancelToken((_cancel) => cancel = _cancel),
                ...config,
                headers: {
                    ...config?.headers
                }
            });

            return [camelize(response.data), null, cancel];
        } catch (e) {
            return [null, e as Error, () => {}];
        }
    }

    static async put<T>(path: string, data?: {[key: string]: any}, config?: Config): SendResult<T> {
        try {
            let cancel: Canceler | (() => void) = () => {};

            const response: { data: T } = await axios.put<T>(path, data, {
                cancelToken: new axios.CancelToken((_cancel) => cancel = _cancel),
                ...config,
                headers: {
                    ...config?.headers
                }
            });

            return [camelize(response.data), null, cancel];
        } catch (e) {
            return [null, e as Error, () => {}];
        }
    }

    static async delete<T>(path: string, config?: Config): SendResult<T> {
        try {
            let cancel: Canceler | (() => void) = () => {};

            const response: { data: T } = await axios.delete<T>(path,{
                cancelToken: new axios.CancelToken((_cancel) => cancel = _cancel),
                ...config,
                headers: {
                    ...config?.headers
                }
            });

            return [camelize(response.data), null, cancel];
        } catch (e) {
            return [null, e as Error, () => {}];
        }
    }
}
export default API;
