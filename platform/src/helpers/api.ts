import daoFactoryABI from '@/abi/daoFactoryABI';
import axios, { Canceler } from '@/plugins/axios';
import camelize from '@/helpers/camelize';
import snakelize from '@/helpers/snakelize';
import { FetchResult, SendResult, sendDataChainProps, Config } from '@/types/api'
import { ethers, Signer } from 'ethers'
import { store } from '@/store';


class API {
    static provider: any;

    static async init(protocol = window.ethereum) {
        if (!API.provider) {
            API.setProvider(protocol);
        }
    }

    static setProvider(protocol: any) {
        API.provider = new ethers.providers.Web3Provider(protocol);
    }

    static get contracts() {
        return {
            daoFactory: new ethers.Contract(process.env.VUE_APP_DAO_FACTORY_ADDRESS!, daoFactoryABI, API.provider)
        };
    }

    static async getSigner(): Promise<Signer>  {
        return API.provider?.getSigner();
    }

    static async sendChain<T>(props: sendDataChainProps): SendResult<{trx: any, trxReceipt: any}> {
        try {
            const contract = props.contractAddress ? new ethers.Contract(props.contractAddress, props.contractABI, API.provider) : API.contracts[props.contractName!];
            const signer = await API.getSigner();
            const contractWithSigner = contract.connect(signer);

            const trx = await contractWithSigner[props.methodName](...props.params);
            let trxReceipt;

            if (props.needWait) {
                await trx.wait();
            }

            if (props.needReceipt) {
                trxReceipt = await API.provider.getTransactionReceipt(trx.hash);
            }

            return [{ trx, trxReceipt }, null];
        } catch (e) {
            console.log(e);
            return [null, e as Error];
        }
    }

    static async getFromChain<T>(props: sendDataChainProps): SendResult<T> {
        try {
            const contract = props.contractAddress ? new ethers.Contract(props.contractAddress, props.contractABI, API.provider) : API.contracts[props.contractName!];

            const result: T = await contract[props.methodName](...props.params);

            return [result, null];
        } catch (e) {
            console.log(e);
            return [null, e as Error];
        }
    }

    static async get<T>(path: string, params?: {[key: string]: any}): FetchResult<T> {
        try {
            let cancel: Canceler | (() => void) = () => {};

            const data: { data: T } = await axios.get<T>(path, {
                params,
                cancelToken: new axios.CancelToken((_cancel) => cancel = _cancel),
                headers: {
                    'Auth-Address': store.state.wallet.address as string
                }
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
                    'Auth-Address': store.state.wallet.address as string,
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
                    'Auth-Address': store.state.wallet.address as string,
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
                    'Auth-Address': store.state.wallet.address as string,
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
