import API from '@/helpers/api';
import { FetchResult, SendResult } from '@/models/api'
import parseEventData from '@/helpers/parseEventData';
import DaoFactoryJSON from '@/abi/DaoFactory.json';
import {
    IDaoItemsParams,
    IDaoItem,
    IDao,
    INormalizedDao,
    INormalizedDaoItem,
    IProposalItemsParams,
    IProposal,
    IProposalItem,
    INormalizedProposalItem
} from '@/models/services/DaoFactoryService';
import { IResponseWithTotal } from '@/models/api';
import router from '@/router'


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

    static async fetchDao(address: string) {
        return API.get<IDao>('/' + router.currentRoute.value.params.network + `/dao/${ address }`);
    }

    static async fetchDaoItems(params?: IDaoItemsParams) {
        return API.get<IResponseWithTotal<IDaoItem>>('/dao', params);
    }

    static async fetchProposal(id: number | string) {
        return API.get<IProposal>(`/proposal/${ id }`);
    }

    static async fetchProposalItems(params?: IProposalItemsParams) {
        return API.get<IResponseWithTotal<IProposalItem>>('/proposal', params);
    }

    static async fetchDaoAsDefault(address: string): FetchResult<ReturnType<typeof normalizeDaoAsDefault>> {
        const [data, ...rest] = await DaoFactoryService.fetchDao(address);

        if (!data) {
            return [data, ...rest];
        }

        return [normalizeDaoAsDefault(data), ...rest];
    }

    static async fetchDaoItemsAsTable(params?: IDaoItemsParams): FetchResult<ReturnType<typeof normalizeDaoItemsAsTable>> {
        const [data, ...rest] = await DaoFactoryService.fetchDaoItems(params);

        if (!data) {
            return [data, ...rest];
        }

        return [normalizeDaoItemsAsTable(data), ...rest];
    }

    static async fetchProposalItemsAsTable(params?: IProposalItemsParams): FetchResult<ReturnType<typeof normalizeProposalItemsAsTable>> {
        const [data, ...rest] = await DaoFactoryService.fetchProposalItems(params);

        if (!data || !data.items) {
            return [data, ...rest];
        }

        return [normalizeProposalItemsAsTable(data), ...rest];
    }
}

function normalizeDaoAsDefault(data: IDao): INormalizedDao {
    return {
        ...data
    };
}

function normalizeDaoItemsAsTable(data: IResponseWithTotal<IDaoItem>): IResponseWithTotal<INormalizedDaoItem> {
    return {
        ...data,
        items: data.items.map(item => ({
            ...item
        }))
    };
}

function normalizeProposalItemsAsTable(data: IResponseWithTotal<IProposalItem>): IResponseWithTotal<INormalizedProposalItem> {
    return {
        ...data,
        items: data.items.map(item => ({
            ...item
        }))
    };
}
