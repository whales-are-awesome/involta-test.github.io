import Web3 from 'web3';
import daoFactoryABI from '@/abi/daoFactoryABI';
import axios, { Canceler } from '@/plugins/axios';
import camelize from '@/helpers/camelize';
import { FetchResult, SendResult } from '@/types/api'
import { ethers, Signer } from 'ethers'



type ConctactNames = 'daoFactory';

interface fetchDataProps {
    contractName: ConctactNames
    methodName: string
    params: any[]
    needReceipt?: boolean
    needWait?: boolean
}

class API extends Web3 {
    static provider: any;
    static address = '';

    static async init(protocol = window.ethereum) {
        if (!API.provider) {
            API.provider = new ethers.providers.Web3Provider(protocol);
        }
    }

    static get contracts() {
        return {
            // @ts-ignore
            daoFactory: new ethers.Contract(process.env.VUE_APP_DAO_FACTORY_ADDRESS, daoFactoryABI, API.provider)
        };
    }

    static async getSigner(): Promise<Signer>  {
        return API.provider?.getSigner();
    }

    static async sendOnChain<T>(props: fetchDataProps): SendResult<T> {
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
}
export default API;
