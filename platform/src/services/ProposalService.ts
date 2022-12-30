import { cloneDeep } from 'lodash';
import API from '@/helpers/api';
import daoControllerABI from '@/abi/daoControllerABI';
import cutAddress from '@/helpers/cutAddress';
import { IResponsePagination, Config } from '@/types/api';
import {
    IProposal,
    IFetchProposalPath,
    IProposalParams,
    ICreateProposalOnChainParams,
    ICreateProposalOnChainResponse,
    ICreateProposalParams,
    IProposalCombined,
    IProposalCombinedDefault,
    IProposalCombinedDefaultNormalizedAsDefault,

    IProposalItem,
    IProposalItemQuery,
    INormalizedProposalItem,

    IPaginationParams
} from '@/types/services/ProposalService';
import { IProposalOnChain } from '@/types/entries/proposal'
import isContract from '@/helpers/isContract'

import { IDaoPath } from '@/types/services/DaoService';

//toDo: добить интерфейсы

export default class ProposalService {
    static async createProposalOnChain(params: ICreateProposalOnChainParams) {
        return API.sendOnChain<ICreateProposalOnChainResponse>({
            contractAddress: params.contractAddress,
            contractABI: daoControllerABI,
            methodName: 'createProposal',
            params: [params.actions]
        });
    }

    static async createProposal(path: IDaoPath, params: ICreateProposalParams, config: Config) {
        return API.post<any>(`/${ path.network }/dao/${ path.address }/proposal`, params, config);
    }

    static async fetchProposal(path: IFetchProposalPath) {
        const [data, ...rest] = await API.get<IProposal>(`/${ path.network }/dao/${ path.address }/proposal/${ path.id }`);
        const [chainData, ...restChainData] = await API.getFromChain<IProposalOnChain>({
            contractAddress: path.address,
            params: [path.id],
            contractABI: daoControllerABI,
            methodName: 'getProposal'
        });
        let fullData: IProposalCombinedDefault | null = null;

        if (data && chainData) {
            fullData = cloneDeep({
                ...data,
                ...chainData
            });

            await Promise.all([
                API.provider.lookupAddress(data.createdBy)
                    .then((result: string) => fullData!.createdByName = result)
            ]);
        }

        return [fullData, ...rest] as const;
    }

    static async fetchProposalAsDefault(path: IFetchProposalPath) {
        const [data, ...rest] = await ProposalService.fetchProposal(path);

        return [data && await normalizeProposalAsDefault(data), ...rest] as const;
    }


    static async fetchDaoProposalItems(path: IDaoPath, params: any) {
        return API.get<IResponsePagination<IProposal>>(`/${ path.network }/dao/${ path.address }/proposal`, params);
    }

    static async voteProposal(params: any) {
        return API.sendOnChain<never>({
            contractAddress: params.contractAddress,
            contractABI: daoControllerABI,
            methodName: 'voteProposal',
            params: [params.proposald, params.decision, []]
        });
    }

    // static async fetchDaoProposalItemsAsTable(params?: IProposalItemQuery) {
    //     const [data, ...rest] = await DaoService.fetchDaoProposalItems(params);
    //
    //     return [data && normalizeProposalItemsAsTable(data), ...rest] as const;
    // }
}


async function normalizeProposalAsDefault(data: IProposalCombinedDefault): Promise<IProposalCombinedDefaultNormalizedAsDefault> {
    return {
        ...data,
        createdByAddressOrName: data.createdByName || cutAddress(data.createdBy),
        pipeline: await Promise.all(data.pipeline.map(async item => ({
            actionType: item[0],
            to: item[1],
            data: item[2],
            value: item[3],
            isContract: await isContract(item[1]),
            addressOrName: (await API.provider.lookupAddress(item[1])) || cutAddress(item[1])
        })))
    };
}
