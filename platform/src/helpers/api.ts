import Web3 from 'web3';
import { default as Web3Types } from 'web3/types';
import { Eth } from 'web3-eth/types';
import { Utils } from 'web3-utils/types';
import { store } from '@/store';
import redirectAfterLogin  from '@/helpers/redirectAfterLogin';

import DaoFactoryJSON from '@/abi/DaoFactory.json';

type FetchResult<T> = Promise<[T|null, Error|null]>;
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

    constructor(protocol = (window as any).ethereum) {
        super();

        if (!API.instance) {
            API.init(protocol);
        }

        return API.instance || this;
    }

    static init(protocol = (window as any).ethereum) {
        API.instance = new Web3(protocol);
        API.handleAll();

        store.dispatch('web3/updateAddress');
    }

    static get eth(): Eth {
        return API.instance.eth;
    }

    static get contracts() {
        return {
            daoFactory: new API.eth.Contract(JSON.parse(JSON.stringify(DaoFactoryJSON)), process.env.VUE_APP_DAO_FACTORY_ADDRESS)
        };
    }

    static get utils(): Utils  {
        return API.instance.utils;
    }

    static async fetch<T>(doFunction: ()=> Promise<T>): FetchResult<T> {
        try {
            const result = await doFunction();

            return [result, null];
        } catch (error) {
            return [null, error as Error];
        }
    }

    static async getCurrentAddress(): Promise<string> {
        return (await API.eth.getAccounts())[0];
    }

    static handleAll(): void {
        API.networkAccountsChange();
        API.handleNetworkChange();
    }

    static networkAccountsChange(): void {
        window.ethereum.on('accountsChanged', async () => {
            await store.dispatch('web3/updateAddress');
            redirectAfterLogin();
        })
    }

    static handleNetworkChange(): void {
        window.ethereum.on('networkChanged', async () => {
            await store.dispatch('web3/updateAddress');
            redirectAfterLogin();
        })
    }

    static async send<T>(props: fetchDataProps): FetchResult<T> {
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

    static async login(): Promise<string> {
        const address = (await API.eth.requestAccounts())[0];

        API.address = address;

        return address;
    }

    static get isLoggedIn(): boolean {
        return !!API.address;
    }
}

// function fetchData<T>(props: fetchDataProps): FetchResult<T> {
//     const contract = API.contracts[props.contractName];
//     const trx = await contract.methods.deployDao(API.address, 1, 1, API.address).send({ from: API.address });
// }
export default API;

export {
    FetchResult
}
