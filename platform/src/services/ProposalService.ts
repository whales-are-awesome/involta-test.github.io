import { cloneDeep, omit } from 'lodash';
import API from '@/helpers/api';
import daoControllerABI from '@/abi/daoControllerABI';
import cutAddress from '@/helpers/cutAddress';
import { IResponsePagination, Config } from '@/types/api';
import {
    IProposal,
    IProposalNormalizedAsDefault,
    INormalizedProposalItemAsTable,
    IProposalPath,
    ICreateProposalChainParams,
    ICreateProposalChainResponse,
    ICreateProposalParams,
    IProposalItem
} from '@/types/services/ProposalService';
import { IProposalChain, proposalStatuses, ProposalVoteType } from '@/types/entries/proposal'
import isContract from '@/helpers/isContract'
import { store } from '@/store'

import { IDaoPath } from '@/types/services/DaoService';
import addSpacesToNumber from '@/helpers/addSpacesToNumber';

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
            const [proposalExpirationTime] = await API.getFromChain<number>({
                contractAddress: path.address,
                params: [],
                contractABI: daoControllerABI,
                methodName: 'proposalExpirationTime'
            });
            const [voted] = await API.getFromChain<ProposalVoteType>({
                contractAddress: path.address,
                params: [store.state.wallet.address, path.id],
                contractABI: daoControllerABI,
                methodName: 'voted'
            });

            fullData = cloneDeep({
                ...data,
                ...chainData,
                proposalExpirationTime,
                voted: !!voted
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
        const [data, ...rest] = await API.get<IResponsePagination<IProposal>>(`/${ path.network }/dao/${ path.address }/proposal`, params);

        const fullData = cloneDeep(data) as typeof data;

        if (data?.items.length) {
            const [proposalExpirationTime] = await API.getFromChain<number>({
                contractAddress: path.address,
                params: [],
                contractABI: daoControllerABI,
                methodName: 'proposalExpirationTime'
            });

            await Promise.all(data.items.map(async(item, index) => {
                const [chainData, ...restChainData] = await API.getFromChain<IProposalChain>({
                    contractAddress: path.address,
                    params: [item.id],
                    contractABI: daoControllerABI,
                    methodName: 'getProposal'
                });

                fullData!.items[index] = {
                    ...item,
                    ...chainData,
                    proposalExpirationTime: proposalExpirationTime!
                };
            }))
        }

        console.log(normalizeProposalItemsAsTable(fullData!));

        return [fullData && normalizeProposalItemsAsTable(fullData), ...rest] as const;
    }

    static async voteProposal(params: any) {
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
        statusName: proposalStatuses[data.status],
        endTime: (data.creationTime * 1000) + (data.proposalExpirationTime * 1000),
        totalVp: +data.againstVp.toString() + +data.forVp.toString() + +data.abstainVp.toString(),
        againstVp: +data.againstVp.toString(),
        forVp: +data.forVp.toString(),
        abstainVp: +data.abstainVp.toString(),
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

function normalizeProposalItemsAsTable(data: IResponsePagination<IProposalItem>): IResponsePagination<INormalizedProposalItemAsTable> {
    return {
        ...data,
        items: data.items.map(item => ({
            ...item,
            proposalExpirationTime: +item.proposalExpirationTime * 1000,
            creationTime: item.creationTime * 1000,
            statusName: proposalStatuses[item.status],
            endTime: (item.creationTime * 1000) + (item.proposalExpirationTime * 1000)
        }))
    };
}
