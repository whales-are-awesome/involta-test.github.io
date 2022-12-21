import API from '@/helpers/api';
import cutAddress from '@/helpers/cutAddress';
import addSpacesToNumber from '@/helpers/addSpacesToNumber';
import daoControllerABI from '@/abi/daoControllerABI';
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
    ICreateProposalParams,

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


    static async fetchSubDaoItems(path: IDaoPath, params: ISubDaoItemQuery) {
        return API.get<IResponsePagination<ISubDaoItem>>('/' + path.network + `/dao/${ path.address }` + `/subdao`, params);
    }

    static async fetchSubDaoItemsAsDefault(path: IDaoPath, params: ISubDaoItemQuery) {
        const [data, ...rest] = await DaoFactoryService.fetchSubDaoItems(path, params);

        return [data && normalizeSubDaoItemsAsTable(data), ...rest] as const;
    }


    static async createProposal(params: ICreateProposalParams) {
        console.log({
            contractAddress: params.contractAddress,
            contractABI: daoControllerABI,
            methodName: 'createProposal',
            params: [params.actions]
        });

        return API.sendOnChain<ICreateDaoResponse>({
            contractAddress: params.contractAddress,
            contractABI: daoControllerABI,
            methodName: 'createProposal',
            params: [params.actions]
        });
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
