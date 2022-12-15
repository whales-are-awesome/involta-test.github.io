import web3Abi from 'web3-eth-abi';
import router from '@/router';
import API from '@/helpers/api';
import cutAddress from '@/helpers/cutAddress';
import parseEventData from '@/helpers/parseEventData';
import addSpacesToNumber from '@/helpers/addSpacesToNumber';
import daoFactoryABI from '@/abi/daoFactoryABI';
import { IResponsePagination, Config } from '@/types/api';
import {
    IDao,
    IDaoPath,
    INormalizedDaoAsDefault,
    ICreateDaoParams,
    ICreateDaoResponse,
    IChangeDaoParams,

    IDaoItem,
    IDaoItemParams,
    INormalizedDaoItemAsTable,


    ISubDaoItem,
    ISubDaoItemQuery,
    INormalizedSubDaoItemAsDefault,

    IFollowDaoParams,
    IFollower,

    IProposal,
    IProposalParams,

    IProposalItem,
    IProposalItemQuery,
    INormalizedProposalItem,

    IPaginationParams
} from '@/types/services/DaoFactoryService';



export default class DaoFactoryService {
    static async createDao(params: ICreateDaoParams) {
        return API.sendOnChain<ICreateDaoResponse>({
            contractName: 'daoFactory',
            methodName: 'deployDao',
            params: [+params.proposalExpirationTime, +params.quorumRequired, params.parentRegistry]
        });
    }

    static async fetchDao(path: IDaoPath) {
        return API.get<IDao>(`/${ path.network }/dao/${ path.address }`);
    }

    static async fetchDaoAsDefault(params: IDaoPath) {
        const [data, ...rest] = await DaoFactoryService.fetchDao(params);

        return [data && normalizeDaoAsDefault(data), ...rest] as const;
    }

    static async changeDao(path: IDaoPath, params: IChangeDaoParams, config: Config) {
        return API.put<never>(`/${ path.network }/dao/${ path.address }`, params, config);
    }


    static async fetchFollowers(path: IDaoPath, params: IPaginationParams) {
        const [data, ...rest] = await API.get<IResponsePagination<IFollower>>(`/${ path.network }/dao/${ path.address }/followers`, params);

        await Promise.all(data?.items.map(async item => {
            item.name = await API.provider.lookupAddress(item.address);
        }) || []);

        return [data, ...rest] as const;
    }

    static async followDao(path: IDaoPath, params: IFollowDaoParams, config: Config) {
        return API.post<never>(`/${ path.network }/dao/${ path.address }/follow`, params, config);
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

    static async fetchSubDaoItems(path: IDaoPath, params: ISubDaoItemQuery) {
        return API.get<IResponsePagination<ISubDaoItem>>('/' + path.network + `/dao/${ path.address }` + `/subdao`, params);
    }

    static async fetchSubDaoItemsAsDefault(path: IDaoPath, params: ISubDaoItemQuery) {
        const [data, ...rest] = await DaoFactoryService.fetchSubDaoItems(path, params);

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
        followersAmountFormatted: addSpacesToNumber(data.followersAmount),
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
            followersAmountFormatted: addSpacesToNumber(item.followersAmount),
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
