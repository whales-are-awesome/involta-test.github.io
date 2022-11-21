import API, { FetchResult, SendResult } from '@/helpers/api';
import parseEventData from '@/helpers/parseEventData';
import DaoFactoryJSON from '@/abi/DaoFactory.json';
import {
    IFetchDaoItemsParams,
    IFetchDaoItemsResponse,
    IFetchDaoResponse
} from '@/models/services/DaoFactoryService';

export default class DaoFactoryService {
    static async createDao(params: object): SendResult<any> {
        const [trxReceipt, error] = await API.send<any>({
            contractName: 'daoFactory',
            methodName: 'deployDao',
            params: [API.address, 1, 1, API.address],
            needReceipt: true
        });

        if (error) {
            return [null, error];
        }

        const result = parseEventData({
            JSON: DaoFactoryJSON,
            eventName: 'DaoCreated',
            trxReceipt
        });

        return [result, null];
    }

    static async createSubDao(params: any): Promise<any> {
        const [trxReceipt, error] = await API.send<any>({
            contractName: 'daoFactory',
            methodName: 'deployDao',
            params: [API.address, 1, 1, params.parentDaoAddress],
            needReceipt: true
        });

        if (error) {
            return [null, error];
        }

        const result = parseEventData({
            JSON: DaoFactoryJSON,
            eventName: 'DaoCreated',
            trxReceipt
        });

        return [result, null];
    }

    static async createProposal(params: object): SendResult<any> {
        const [trxReceipt, error] = await API.send<any>({
            contractName: 'daoFactory',
            methodName: 'createProposal',
            params: [[{
                address: process.env.VUE_APP_DAO_FACTORY_ADDRESS,
                value: 0,
                response: '',
                data: API.eth.abi.encodeFunctionSignature('func(uint256,string,bytes[])'),
                transType: 0

            }]],
            needReceipt: true
        });

        console.log(error);

        if (error) {
            return [null, error];
        }

        const result = parseEventData({
            JSON: DaoFactoryJSON,
            eventName: 'ProposalCreated',
            trxReceipt
        });

        return [result, null];
    }
    // static fetchCompany(config?: RequestConfig): Promise<any> {
    //     return api.get('/api/companies', config);
    // }
    //
    // static normalizeCompanyAsDefault(data: ICompany): any {
    //     return {
    //         ...data
    //     };
    // }

    static async fetchDaoItems(params?: IFetchDaoItemsParams) {
        return API.get<IFetchDaoItemsResponse[]>('/dao', params);
    }

    static async fetchDao(id: number | string) {
        return API.get<IFetchDaoResponse>(`/dao/${ id }`);
    }
}
