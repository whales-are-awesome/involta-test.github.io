import { cloneDeep, omit } from 'lodash';
import API from '@/helpers/api';
import daoControllerABI from '@/abi/daoControllerABI';
import cutAddress from '@/helpers/cutAddress';
import { IResponsePagination, Config } from '@/types/api';
import {
    IProposal,
    IProposalNormalizedAsDefault,
    IProposalPath,
    ICreateProposalChainParams,
    ICreateProposalChainResponse,
    ICreateProposalParams
} from '@/types/services/ProposalService';
import { IProposalChain } from '@/types/entries/proposal'
import isContract from '@/helpers/isContract'

import { IDaoPath } from '@/types/services/DaoService';
import { ethers } from 'ethers';

//toDo: добить интерфейсы

export default class ProposalService {
    static async createProposalChain(params: ICreateProposalChainParams) {
        return API.sendChain<ICreateProposalChainResponse>({
            contractAddress: params.contractAddress,
            contractABI: daoControllerABI,
            methodName: 'createProposal',
            params: [params.actions]
        });
    }

    static async createProposal(path: IDaoPath, params: ICreateProposalParams, config: Config) {
        const [response, error] = await ProposalService.createProposalChain({
            contractAddress: path.address,
            actions: params.actions
        });

        if (response?.trx) {
            return API.post<never>(`/${ path.network }/dao/${ path.address }/proposal`, omit({
                ...params,
                creationTx: response?.trx.hash
            }, ['actions']), config);
        }

        return [null, error, () => {}];

    }

    static async fetchProposal(path: IProposalPath) {
        const [data, ...rest] = await API.get<IProposal>(`/${ path.network }/dao/${ path.address }/proposal/${ path.id }`);
        const [chainData, ...restChainData] = await API.getFromChain<IProposalChain>({
            contractAddress: path.address,
            params: [path.id],
            contractABI: daoControllerABI,
            methodName: 'getProposal'
        });
        let fullData: IProposal | null = null;

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

    static async fetchProposalAsDefault(path: IProposalPath) {
        const [data, ...rest] = await ProposalService.fetchProposal(path);

        return [data && await normalizeProposalAsDefault(data), ...rest] as const;
    }


    static async fetchDaoProposalItems(path: IDaoPath, params: any) {
        return API.get<IResponsePagination<IProposal>>(`/${ path.network }/dao/${ path.address }/proposal`, params);
    }

    static async voteProposal(params: any) {
        console.log([params.proposald, params.decision, []])
        return API.sendChain<never>({
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


async function normalizeProposalAsDefault(data: IProposal): Promise<IProposalNormalizedAsDefault> {
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
