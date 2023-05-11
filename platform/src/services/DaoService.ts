import API from '@/helpers/api';
import daoControllerABI from '@/abi/daoControllerABI';
import cutAddress from '@/helpers/cutAddress';
import addSpacesToNumber from '@/helpers/addSpacesToNumber';
import { IResponsePagination, Config } from '@/types/api';
import {
    IDao,
    IDaoPath,
    INormalizedDaoAsDefault,
    ICreateDaoParams,
    ICreateDaoResponse,
    IChangeDaoParams,

    INormalizedSubDaoItemAsDefault,
    ISubDaoItem,
    ISubDaoItemQuery,

    IDaoItem,
    IDaoItemParams,
    INormalizedDaoItemAsTable,
} from '@/types/services/DaoService';
import { store } from '@/store';



export default class DaoService {
    static async createDao(params: ICreateDaoParams) {
        return API.sendChain<ICreateDaoResponse>({
            contractName: 'daoFactory',
            methodName: 'deployDao',
            network: params.network,
            params: [
                +params.proposalExpirationTime,
                +params.quorumRequired,
                params.parentRegistry,
                params.name,
                params.governanceTokenSupply,
                params.governanceTicker
            ]
        });
    }

    static async fetchDao(path: IDaoPath) {
        const [votingPower] = await API.getFromChain<number>({
            contractAddress: path.address,
            params: [store.state.wallet.address],
            contractABI: daoControllerABI,
            methodName: 'votingPowerOf'
        });

        const [data, error] = await API.get<IDao>(`/${ path.network }/dao/${ path.address }`);

        return [{ ...data, votingPower: +votingPower! } as IDao, error, () => {}] as const;
    }

    static async fetchDaoAsDefault(params: IDaoPath) {
        const [data, ...rest] = await DaoService.fetchDao(params);

        return [data && normalizeDaoAsDefault(data), ...rest] as const;
    }

    static async changeDao(path: IDaoPath, params: IChangeDaoParams, config: Config) {
        return API.put<never>(`/${ path.network }/dao/${ path.address }`, params, config);
    }


    static async fetchDaoItems(network: string, params?: IDaoItemParams) {
        return API.get<IResponsePagination<IDaoItem>>(`/${ network }/dao`, params);
    }

    static async fetchDaoItemsAsTable(network: string, params?: IDaoItemParams) {
        const [data, ...rest] = await DaoService.fetchDaoItems(network, params);

        return [data && normalizeDaoItemsAsTable(data), ...rest] as const;
    }

    static async fetchAllDaoItems(params?: IDaoItemParams) {
        return API.get<IResponsePagination<IDaoItem>>('/dao', params);
    }

    static async fetchAllDaoItemsAsTable(params?: IDaoItemParams) {
        const [data, ...rest] = await DaoService.fetchAllDaoItems(params);

        return [data && normalizeDaoItemsAsTable(data), ...rest] as const;
    }

    static async fetchSubDaoItems(path: IDaoPath, params: ISubDaoItemQuery) {
        return API.get<IResponsePagination<ISubDaoItem>>('/' + path.network + `/dao/${ path.address }` + `/subdao`, params);
    }

    static async fetchSubDaoItemsAsDefault(path: IDaoPath, params: ISubDaoItemQuery) {
        const [data, ...rest] = await DaoService.fetchSubDaoItems(path, params);

        return [data && normalizeSubDaoItemsAsDefault(data), ...rest] as const;
    }
}


function normalizeDaoAsDefault(data: IDao): INormalizedDaoAsDefault {
    return {
        ...data,
        fullName: data.name || cutAddress(data.address),
        path: data.path?.map(item => ({
            ...item,
            fullName: item.name || cutAddress(item.address),
        })),
        get followersAmountFormatted() {
            return addSpacesToNumber(this.followersAmount);
        }
    };
}

function normalizeDaoItemsAsTable(data: IResponsePagination<IDaoItem>): IResponsePagination<INormalizedDaoItemAsTable> {
    return {
        ...data,
        items: data.items.map(item => ({
            ...item,
            fullName: item.name || cutAddress(item.address),
            get followersAmountFormatted() {
                //@ts-ignore
                return addSpacesToNumber(this.followersAmount);
            }
        }))
    };
}

function normalizeSubDaoItemsAsDefault(data: IResponsePagination<ISubDaoItem>): IResponsePagination<INormalizedSubDaoItemAsDefault> {
    return {
        ...data,
        items: data.items.map(item => ({
            ...item,
            fullName: item.name || cutAddress(item.address),
            isHovered: false
        }))
    };
}
