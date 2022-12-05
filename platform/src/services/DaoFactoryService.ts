import API from '@/helpers/api';
import { FetchResult, SendResult } from '@/models/api'
import cutAddress from '@/helpers/cutAddress';
import parseEventData from '@/helpers/parseEventData';
import daoFactoryABI from '@/abi/daoFactoryABI';
import web3Abi from 'web3-eth-abi';
import {
    IDaoItemParams,
    IDaoItem,
    IDao,
    INormalizedDaoAsDefault,
    INormalizedDaoItemAsTable,
    IProposalItemsParams,
    IProposal,
    IProposalItem,
    INormalizedProposalItem,
    ISubDaoItem,
    INormalizedSubDaoItemAsDefault,
    ISubDaoItemParams,
    ICreateDaoParams
} from '@/models/services/DaoFactoryService';
import { IResponseWithTotal } from '@/models/api';
import router from '@/router'

export default class DaoFactoryService {
    static async createDao(params: ICreateDaoParams): SendResult<{hash: string}> {
        return await API.sendOnChain<any>({
            contractName: 'daoFactory',
            methodName: 'deployDao',
            params: [+params.proposalExpirationTime, +params.quorumRequired, '0x' + '0'.repeat(40)]
        });
    }

    static async createSubDao(params: any): Promise<any> {
        const [trxReceipt, error] = await API.sendOnChain<any>({
            contractName: 'daoFactory',
            methodName: 'deployDao',
            params: [API.address, 1, 1, params.parentDaoAddress],
            needReceipt: true
        });

        if (error) {
            return [null, error];
        }

        const result = parseEventData({
            JSON: daoFactoryABI,
            eventName: 'DaoCreated',
            trxReceipt
        });

        return [result, null];
    }

    static async createProposal(params: object): SendResult<any> {
        const [trxReceipt, error] = await API.sendOnChain<any>({
            contractName: 'daoFactory',
            methodName: 'createProposal',
            params: [[{
                address: process.env.VUE_APP_DAO_FACTORY_ADDRESS,
                value: 0,
                response: '',
                data: web3Abi.encodeFunctionSignature('func(uint256,string,bytes[])'),
                transType: 0

            }]],
            needReceipt: true
        });

        if (error) {
            return [null, error];
        }

        const result = parseEventData({
            JSON: daoFactoryABI,
            eventName: 'ProposalCreated',
            trxReceipt
        });

        return [result, null];
    }

    static async fetchDao(address: string) {
        return API.get<IDao>('/' + router.currentRoute.value.params.network + `/dao/${ address }`);
    }

    static async fetchDaoItems(params?: IDaoItemParams) {
        return API.get<IResponseWithTotal<IDaoItem>>('/dao', params);
    }

    static async fetchSubDaoItems(parentAddress: string, params: ISubDaoItemParams) {
        return API.get<IResponseWithTotal<ISubDaoItem>>('/' + router.currentRoute.value.params.network + `/dao/${ parentAddress }` + `/subdao`, params);
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
            return [null, ...rest];
        }

        return [normalizeDaoAsDefault(data), ...rest];
    }

    static async fetchDaoItemsAsTable(params?: IDaoItemParams): FetchResult<ReturnType<typeof normalizeDaoItemsAsTable>> {
        const [data, ...rest] = await DaoFactoryService.fetchDaoItems(params);

        if (!data) {
            return [null, ...rest];
        }

        return [normalizeDaoItemsAsTable(data), ...rest];
    }

    static async fetchSubDaoItemsAsDefault(parentAddress: string, params: ISubDaoItemParams): FetchResult<ReturnType<typeof normalizeSubDaoItemsAsTable>> {
        const [data, ...rest] = await DaoFactoryService.fetchSubDaoItems(parentAddress, params);

        if (!data || !data.items) {
            return [null, ...rest];
        }


        return [normalizeSubDaoItemsAsTable(data), ...rest];
    }

    static async fetchProposalItemsAsTable(params?: IProposalItemsParams): FetchResult<ReturnType<typeof normalizeProposalItemsAsTable>> {
        const [data, ...rest] = await DaoFactoryService.fetchProposalItems(params);

        if (!data || !data.items) {
            return [null, ...rest];
        }

        return [normalizeProposalItemsAsTable(data), ...rest];
    }
}

function normalizeDaoAsDefault(data: IDao): INormalizedDaoAsDefault {
    return {
        ...data,
        fullName: data.name || cutAddress(data.address)
    };
}

function normalizeDaoItemsAsTable(data: IResponseWithTotal<IDaoItem>): IResponseWithTotal<INormalizedDaoItemAsTable> {
    return {
        ...data,
        items: data.items.map(item => ({
            ...item,
            fullName: item.name || cutAddress(item.address)
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

function normalizeSubDaoItemsAsTable(data: IResponseWithTotal<ISubDaoItem>): IResponseWithTotal<INormalizedSubDaoItemAsDefault> {
    return {
        ...data,
        items: data.items.map(item => ({
            ...item,
            fullName: item.name || cutAddress(item.address),
            isHovered: false
        }))
    };
}
