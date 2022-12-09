import Web3 from 'web3';
import { default as Web3Types } from 'web3/types';
import { Eth } from 'web3-eth/types';
import { Utils } from 'web3-utils/types';

type FetchResult<T> = Promise<[T|null, Error|null]>;

class API extends Web3 {
    static instance: Web3Types;

    constructor(protocol = (window as any).ethereum) {
        super();

        API.init(protocol);

        return API.instance || this;
    }

    static init(protocol = (window as any).ethereum) {
        API.instance = new Web3(protocol);
    }

    static get eth(): Eth {
        return API.instance.eth;
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
}


export default API;
