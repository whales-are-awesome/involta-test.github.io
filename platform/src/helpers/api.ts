import Web3 from 'web3';
import { default as Web3Types } from 'web3/types';
import { Eth } from 'web3-eth/types';
import { Utils } from 'web3-utils/types';
import { useStore } from '@/store';


import DaoFactoryJSON from '@/abi/DaoFactory.json';

type FetchResult<T> = Promise<[T|null, Error|null]>;

class API extends Web3 {
    static instance: Web3Types;

    constructor(protocol = (window as any).ethereum) {
        super();

        if (!API.instance) {
            API.init(protocol);
        }

        return API.instance || this;
    }

    static init(protocol = (window as any).ethereum) {
        const store = useStore();

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
        const store = useStore();

        window.ethereum.on('accountsChanged', () => {
            store.dispatch('web3/updateAddress');
            console.log('accountsChanged');
        })
    }

    static handleNetworkChange(): void {
        const store = useStore();

        window.ethereum.on('networkChanged', () => {
            store.dispatch('web3/updateAddress');
            console.log('networkChanged');
        })
    }
}


export default API;
