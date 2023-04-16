import { ethers, Signer } from 'ethers'
//@ts-ignore
import { CPromise } from 'c-promise2';
import daoFactoryABI from '@/abi/daoFactoryABI';
import axios, { Canceler } from '@/plugins/axios';
import camelize from '@/helpers/camelize';
import snakelize from '@/helpers/snakelize';
import { FetchResult, SendResult, sendDataChainProps, Config } from '@/types/api'
import { store } from '@/store';
import Wallet from '@/wallets';
import { open, closeLast } from '@/composables/useLayer';
import { Networks, networksType } from '@/types/networks';

class API {
    static provider: any;

    static async init(protocol = window.ethereum) {
        if (!API.provider && protocol !== undefined) {
            API.setProvider(protocol);
        }
    }

    static setProvider(protocol: any) {
        API.provider = new ethers.providers.Web3Provider(protocol);
    }

    static async lookupAddress(address: string) {
        let name = '';

        try {
            name = await API.provider.lookupAddress(address);
        } catch (e) {
            console.log(e)
        }

        return name;
    }



    static async getContracts(contractName: 'daoFactory', _network?: networksType) {
        const network = await API.getNetwork() as networksType;

        const daoFactoryAddress = {
            [Networks.Goerli]: process.env.VUE_APP_DAO_FACTORY_ADDRESS_GOERLI,
            [Networks.Polygon]: process.env.VUE_APP_DAO_FACTORY_ADDRESS_POLYGON
        }[network];

        return {
            daoFactory: new ethers.Contract(daoFactoryAddress!, daoFactoryABI, API.provider)
        }[contractName];
    }


    static async getSigner(): Promise<Signer>  {
        return API.provider?.getSigner();
    }

    static async getNetwork(): Promise<networksType | ''> {
        const network = await API.provider?.getNetwork();
        const chainId = network?.chainId;

        const networkName = {
            137: Networks.Polygon,
            5: Networks.Goerli
        }[chainId as number];

        return networkName!;
    }

    static async sendChain<T>(props: sendDataChainProps): SendResult<{trx: any, trxReceipt: any}> {
        try {
            const contract = props.contractAddress ? new ethers.Contract(props.contractAddress, props.contractABI, API.provider) : await API.getContracts(props.contractName!, props.network);
            const signer = await API.getSigner();
            const contractWithSigner = contract.connect(signer);
            const contractWithSignerPromise = new CPromise(async(resolve: any, reject: any) => {
                try {
                    const trx = await contractWithSigner[props.methodName](...props.params)

                    resolve(trx);
                } catch (e) {
                    console.log(e);

                    reject(new Error('Trx error'));
                }
            });

            if (Wallet.currentWalletName === 'connectWallet') {
                open('WalletConnectAction', {
                    title: 'Action Required',
                    text: 'Please confirm the transaction on your connected device'
                }).then(isCancel => {
                    if (isCancel) {
                        contractWithSignerPromise.cancel();
                    }
                });
            }

            const trx = await contractWithSignerPromise;
            let trxReceipt;

            if (Wallet.currentWalletName === 'connectWallet') {
                closeLast();
            }

            if (props.needWait) {
                await trx.wait();
            }

            if (props.needReceipt) {
                trxReceipt = await API.provider.getTransactionReceipt(trx.hash);
            }

            return [{ trx, trxReceipt }, null];
        } catch (e: any) {
            if (Wallet.currentWalletName === 'connectWallet' && e?.message === 'Trx error') {
                closeLast();
            }

            console.log(e);
            return [null, e as Error];
        }
    }

    static async getFromChain<T>(props: sendDataChainProps): SendResult<T> {
        try {
            const contract = props.contractAddress ? new ethers.Contract(props.contractAddress, props.contractABI, API.provider) : await API.getContracts(props.contractName!);

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
                    'X-Auth-Address': store.state.wallet.address as string
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
                    'X-Auth-Address': store.state.wallet.address as string,
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
                    'X-Auth-Address': store.state.wallet.address as string,
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
                    'X-Auth-Address': store.state.wallet.address as string,
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
