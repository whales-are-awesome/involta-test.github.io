import daoFactoryABI from '@/abi/daoFactoryABI';
import axios, { Canceler } from '@/plugins/axios';
import camelize from '@/helpers/camelize';
import { FetchResult, SendResult, sendDataOnChainProps, Config } from '@/types/api'
import { ethers, Signer } from 'ethers'


class API {
    static provider: any;

    static async init(protocol = window.ethereum) {
        if (!API.provider) {
            API.provider = new ethers.providers.Web3Provider(protocol);
        }
    }

    static get contracts() {
        return {
            daoFactory: new ethers.Contract(process.env.VUE_APP_DAO_FACTORY_ADDRESS!, daoFactoryABI, API.provider)
        };
    }

    static async getSigner(): Promise<Signer>  {
        return API.provider?.getSigner();
    }

    static async sendOnChain<T>(props: sendDataOnChainProps): SendResult<T> {
        try {
            const contract = API.contracts[props.contractName];
            const signer = await API.getSigner()
            const contractWithSigner = contract.connect(signer);

            const trx = await contractWithSigner[props.methodName](...props.params);
            let trxReceipt;

            if (props.needWait) {
                await trx.wait();
            }

            if (props.needReceipt) {
                trxReceipt = await API.provider.getTransactionReceipt(trx.hash);
            }

            return [trxReceipt || trx, null];
        } catch (e) {
            return [null, e as Error];
        }
    }

    static async get<T>(path: string, params?: {[key: string]: any}): FetchResult<T> {
        try {
            let cancel: Canceler | (() => void) = () => {};

            const data: { data: T } = await axios.get<T>(path, {
                params,
                cancelToken: new axios.CancelToken((_cancel) => cancel = _cancel)
            });

            return [camelize(data.data), null, cancel];
        } catch (e) {
            return [null, e as Error, () => {}];
        }
    }

    static async post<T>(path: string, data?: {[key: string]: any}, config?: Config): SendResult<T> {
        try {
            let cancel: Canceler | (() => void) = () => {};

            const response: { data: T } = await axios.post<T>(path, data, {
                cancelToken: new axios.CancelToken((_cancel) => cancel = _cancel),
                ...{config}
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
                ...{config}
            });

            return [camelize(response.data), null, cancel];
        } catch (e) {
            return [null, e as Error, () => {}];
        }
    }
}
export default API;
