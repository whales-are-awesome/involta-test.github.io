import API, { FetchResult, SendResult } from '@/helpers/api';
import parseEventData from '@/helpers/parseEventData';
import DaoFactoryJSON from '@/abi/DaoFactory.json';
import {
    IDaoItemsParams,
    IDaoItemResponse,
    IDaoResponse,
    INormalizedDaoItem,
    IProposalItemsParams,
    IProposalResponse,
    IProposalItemResponse,
    INormalizedProposalItem
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

    static async fetchDaoItems(params?: IDaoItemsParams) {
        return API.get<IDaoItemResponse[]>('/dao', params);
    }

    static async fetchDao(id: number | string) {
        return API.get<IDaoResponse>(`/dao/${ id }`);
    }

    static async fetchProposalItems(params?: IProposalItemsParams) {
        return API.get<IProposalItemResponse[]>('/proposal', params);
    }

    static async fetchProposal(id: number | string) {
        return API.get<IProposalResponse>(`/proposal/${ id }`);
    }

    static async fetchDaoItemsAsTable(params?: IDaoItemsParams): FetchResult<INormalizedDaoItem[]> {
        const [data, ...rest] = await DaoFactoryService.fetchDaoItems(params);

        if (!data) {
            return [data, ...rest];
        }

        return [normalizeDaoItemsAsTable(data), ...rest];
    }

    static async fetchProposalItemsAsTable(params?: IProposalItemsParams): FetchResult<INormalizedProposalItem[]> {
        const [data, ...rest] = await DaoFactoryService.fetchProposalItems(params);

        if (!data) {
            return [data, ...rest];
        }

        return [normalizeProposalItemsAsTable(data), ...rest];
    }
}

function normalizeDaoItemsAsTable(items: IDaoItemResponse[]): INormalizedDaoItem[] {
    return items.map(item => ({
        ...item
    }));
}

function normalizeProposalItemsAsTable(items: IProposalItemResponse[]): INormalizedProposalItem[] {
    return items.map(item => ({
        ...item
    }));
}
