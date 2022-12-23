import API from '@/helpers/api';
import daoControllerABI from '@/abi/daoControllerABI';
import { IResponsePagination, Config } from '@/types/api';
import {
    IProposal,
    IProposalParams,
    ICreateProposalOnChainParams,
    ICreateProposalOnChainResponse,
    ICreateProposalParams,

    IProposalItem,
    IProposalItemQuery,
    INormalizedProposalItem,

    IPaginationParams
} from '@/types/services/ProposalService';

import { IDaoPath } from '@/types/services/DaoService';



export default class DaoService {
    static async createProposalOnChain(params: ICreateProposalOnChainParams) {
        return API.sendOnChain<ICreateProposalOnChainResponse>({
            contractAddress: params.contractAddress,
            contractABI: daoControllerABI,
            methodName: 'createProposal',
            needWait: true,
            needReceipt: true,
            params: [params.actions]
        });
    }

    static async createProposal(path: IDaoPath, params: ICreateProposalParams, config: Config) {
        return API.post<any>(`/${ path.network }/dao/${ path.address }/proposal`, params, config);
    }

    static async fetchProposal(path: IDaoPath) {
        return API.get<IProposal>(`/${ path.network }/dao/${ path.address }/proposal`);
    }


    static async fetchProposalItems(path: IDaoPath, params: any) {
        return API.get<IResponsePagination<IProposal>>(`/${ path.network }/dao/${ path.address }/proposal`, params);
    }

    // static async fetchProposalItemsAsTable(params?: IProposalItemQuery) {
    //     const [data, ...rest] = await DaoService.fetchProposalItems(params);
    //
    //     return [data && normalizeProposalItemsAsTable(data), ...rest] as const;
    // }
}


// function normalizeProposalItemsAsTable(data: IResponsePagination<IProposalItem>): IResponsePagination<INormalizedProposalItem> {
//     return {
//         ...data,
//         items: data.items.map(item => ({
//             ...item
//         }))
//     };
// }
