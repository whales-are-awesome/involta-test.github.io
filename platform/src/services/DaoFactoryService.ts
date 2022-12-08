import web3Abi from 'web3-eth-abi';
import router from '@/router';
import API from '@/helpers/api';
import cutAddress from '@/helpers/cutAddress';
import parseEventData from '@/helpers/parseEventData';
import daoFactoryABI from '@/abi/daoFactoryABI';
import { IResponsePagination, Config } from '@/types/api';
import {
    ICreateDaoParams,
    ICreateDaoResponse,
    IDao,
    IDaoParams,
    INormalizedDaoAsDefault,

    IDaoItem,
    IDaoItemParams,
    INormalizedDaoItemAsTable,


    ISubDaoItem,
    ISubDaoItemParams,
    ISubDaoItemQuery,
    INormalizedSubDaoItemAsDefault,


    IProposal,
    IProposalParams,

    IProposalItem,
    IProposalItemQuery,
    INormalizedProposalItem,
} from '@/types/services/DaoFactoryService';



export default class DaoFactoryService {
    static async createDao(params: ICreateDaoParams) {
        return await API.sendOnChain<ICreateDaoResponse>({
            contractName: 'daoFactory',
            methodName: 'deployDao',
            params: [+params.proposalExpirationTime, +params.quorumRequired, '0x' + '0'.repeat(40)]
        });
    }

    static async fetchDao(params: IDaoParams) {
        return API.get<IDao>(`/${ params.network }/dao/${ params.address }`);
    }

    static async fetchDaoAsDefault(params: IDaoParams) {
        const [data, ...rest] = await DaoFactoryService.fetchDao(params);

        return [data && normalizeDaoAsDefault(data), ...rest] as const;
    }

    static async joinDao(params: IDaoParams, config: Config) {
        return API.post<any>(`/${ params.network }/dao/${ params.address }/join`, {}, config);
    }

    static async changeDao(params: IDaoParams, config: Config) {
        return API.put<any>(`/${ params.network }/dao/${ params.address }/join`, {}, config);
    }


    static async fetchDaoItems(params?: IDaoItemParams) {
        return API.get<IResponsePagination<IDaoItem>>('/dao', params);
    }

    static async fetchDaoItemsAsTable(params?: IDaoItemParams) {
        const [data, ...rest] = await DaoFactoryService.fetchDaoItems(params);

        return [data && normalizeDaoItemsAsTable(data), ...rest] as const;
    }


    static async createSubDao(params: any): Promise<any> {
        const [trxReceipt, error] = await API.sendOnChain<any>({
            contractName: 'daoFactory',
            methodName: 'deployDao',
            params: ['address', 1, 1, params.parentDaoAddress],
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

    static async fetchSubDaoItems(address: ISubDaoItemParams['address'], params: ISubDaoItemQuery) {
        return API.get<IResponsePagination<ISubDaoItem>>('/' + router.currentRoute.value.params.network + `/dao/${ address }` + `/subdao`, params);
    }

    static async fetchSubDaoItemsAsDefault(address: ISubDaoItemParams['address'], params: ISubDaoItemQuery) {
        const [data, ...rest] = await DaoFactoryService.fetchSubDaoItems(address, params);

        return [data && normalizeSubDaoItemsAsTable(data), ...rest] as const;
    }


    static async createProposal(params: object) {
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

    static async fetchProposal(id: IProposalParams['id']) {
        return API.get<IProposal>(`/proposal/${ id }`);
    }


    static async fetchProposalItems(params?: IProposalItemQuery) {
        return API.get<IResponsePagination<IProposalItem>>('/proposal', params);
    }

    static async fetchProposalItemsAsTable(params?: IProposalItemQuery) {
        const [data, ...rest] = await DaoFactoryService.fetchProposalItems(params);

        return [data && normalizeProposalItemsAsTable(data), ...rest] as const;
    }
}


function normalizeDaoAsDefault(data: IDao): INormalizedDaoAsDefault {
    return {
        ...data,
        fullName: data.name || cutAddress(data.address),
        path: data.path?.map(item => ({
            ...item,
            fullName: item.name || cutAddress(item.address),
        }))
    };
}

function normalizeDaoItemsAsTable(data: IResponsePagination<IDaoItem>): IResponsePagination<INormalizedDaoItemAsTable> {
    return {
        ...data,
        items: data.items.map(item => ({
            ...item,
            fullName: item.name || cutAddress(item.address)
        }))
    };
}


function normalizeProposalItemsAsTable(data: IResponsePagination<IProposalItem>): IResponsePagination<INormalizedProposalItem> {
    return {
        ...data,
        items: data.items.map(item => ({
            ...item
        }))
    };
}


function normalizeSubDaoItemsAsTable(data: IResponsePagination<ISubDaoItem>): IResponsePagination<INormalizedSubDaoItemAsDefault> {
    return {
        ...data,
        items: data.items.map(item => ({
            ...item,
            fullName: item.name || cutAddress(item.address),
            isHovered: false
        }))
    };
}
