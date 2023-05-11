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

export default class ProposalService {
    static async createProposalChain(params: ICreateProposalChainParams) {
        return API.sendChain<ICreateProposalChainResponse>({
            contractAddress: params.contractAddress,
            network: params.network,
            contractABI: daoControllerABI,
            methodName: 'createProposal',
            params: [params.actions]
        });
    }

    static async createProposal(path: IDaoPath, params: ICreateProposalParams, config: Config) {
        const [response, error] = await ProposalService.createProposalChain({
            network: path.network,
            contractAddress: path.address,
            actions: params.actions
        });

        if (response?.trx) {
            await API.post<never>(`/${ path.network }/dao/${ path.address }/proposal`, omit({
                ...params,
                creationTx: response.trx.hash
            }, ['actions']), config);

            return [response, error, () => {}] as const;
        }

        return [null, error, () => {}] as const;

    }

    static fetchProposal(path: IProposalPath) {
        async function raw() {
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
                const [vote] = await API.getFromChain<string>({
                    contractAddress: path.address,
                    params: [store.state.wallet.address, path.id],
                    contractABI: daoControllerABI,
                    methodName: 'voted'
                });
                const [votingPower] = await API.getFromChain<number>({
                    contractAddress: path.address,
                    params: [store.state.wallet.address],
                    contractABI: daoControllerABI,
                    methodName: 'votingPowerOf'
                });

                fullData = cloneDeep({
                    ...data,
                    ...chainData,
                    proposalExpirationTime,
                    vote: +vote! as ProposalVoteType,
                    votingPower
                });

                await Promise.all([
                    API.lookupAddress(data.createdBy)
                        .then((result: string) => fullData!.createdByName = result)
                ]);
            }

            return [fullData, ...rest] as const;
        }

        async function def() {
            const [data, ...rest] = await raw();

            return [data && await normalizeProposalAsDefault(data), ...rest] as const;
        }

        return {
            raw,
            default: def
        }
    }


    static fetchDaoProposalItems(path: IDaoPath, params: any) {
        async function raw() {
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

            return [fullData, ...rest] as const;
        }

        async function table() {
            const [data, ...rest] = await raw();

            return [data && normalizeProposalItemsAsTable(data), ...rest] as const;
        }

        return {
            raw,
            table
        };
    }

    static async voteProposal(params: any) {
        return API.sendChain<never>({
            contractAddress: params.contractAddress,
            network: params.network,
            contractABI: daoControllerABI,
            methodName: 'voteProposal',
            needWait: true,
            params: [params.proposald, params.decision, []]
        });
    }

    static async executeProposal(params: any) {
        return API.sendChain<never>({
            contractAddress: params.contractAddress,
            network: params.network,
            contractABI: daoControllerABI,
            methodName: 'executeProposal',
            needWait: true,
            params: [params.proposald]
        });
    }
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
            addressOrName: (await API.lookupAddress(item[1])) || cutAddress(item[1])
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
