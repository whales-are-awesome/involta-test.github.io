import Web3 from 'web3';
import { default as Web3Types } from 'web3/types';
import { Eth } from 'web3-eth/types';
import { Utils } from 'web3-utils/types';
import DaoFactoryJSON from '@/abi/DaoFactory.json';
import axios, { Canceler } from '@/plugins/axios';
import router from '@/router';
import { FetchResult, SendResult } from '@/models/api'

type ConctactNames = 'daoFactory';

interface fetchDataProps {
    contractName: ConctactNames
    methodName: string
    params: any[]
    needReceipt: boolean
}

class API extends Web3 {
    static instance: Web3Types;
    static address = '';

    static async init(protocol = window.ethereum) {
        if (!API.instance) {
            API.instance = new Web3(protocol);
        }

        return API.instance;
    }

    static get eth(): Eth {
        return API.instance.eth;
    }

    static get contracts() {
        return {
            // @ts-ignore
            daoFactory: new API.eth.Contract(JSON.parse(JSON.stringify(DaoFactoryJSON)), process.env.VUE_APP_DAO_FACTORY_ADDRESS)
        };
    }

    static get utils(): Utils  {
        return API.instance.utils;
    }

    static async send<T>(props: fetchDataProps): SendResult<T> {
        try {
            const contract = API.contracts[props.contractName];
            const trx = await contract.methods[props.methodName](...props.params).send({ from: API.address });
            let trxReceipt;

            if (props.needReceipt) {
                trxReceipt = await API.eth.getTransactionReceipt(trx.transactionHash);
            }

            return [trxReceipt || trx, null];
        } catch (e) {
            return [null, e as Error];
        }
    }

    static async get<T>(path: string, params?: {[key: string]: any}): FetchResult<T> {
        try {
            let cancel: Canceler | (() => void) = () => {};

            const data = await axios.get<T>(path, {
                params,
                cancelToken: new axios.CancelToken((_cancel) => cancel = _cancel)
            });

            //@ts-ignore
            return [data.data, null, cancel];
        } catch (e) {
            return [null, e as Error, () => {}];
        }
    }
}
export default API;
