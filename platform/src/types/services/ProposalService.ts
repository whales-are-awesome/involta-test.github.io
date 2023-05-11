import { IPaginationParams } from '@/types/api';
import { IProposalAPI, IProposalChain, ProposalPipeline, proposalStatuses, ProposalVoteType } from '@/types/entries/proposal';
import { NetworksType } from '@/types/networks';

interface IProposal extends IProposalAPI, IProposalChain {
    createdByName?: string
    proposalExpirationTime: number
    vote: ProposalVoteType
    votingPower: number
}

interface IProposalItem extends IProposal {
}

interface IProposalNormalizedAsDefault extends Omit<IProposal, 'pipeline'> {
    createdByAddressOrName: string
    statusName: string
    endTime: number
    totalVp: number
    pipeline: {
        actionType: ProposalPipeline[0]
        to: ProposalPipeline[1]
        data: ProposalPipeline[2]
        value: ProposalPipeline[3]
        isContract: boolean
        addressOrName: string
    }[]
}

interface INormalizedProposalItemAsTable extends IProposalItem {
    statusName: string
    endTime: number
}

interface IProposalPath {
    network: NetworksType
    address: string
    id: number | string
}

interface IProposalParams {
    id: string
}

interface ICreateProposalChainParams {
    contractAddress: string
    network: NetworksType,
    actions: Array<{
        actionType: number
        to: string
        data: string
        value: number
    }>
}

interface ICreateProposalChainResponse {
    hash: string
}

interface ICreateProposalParams {
    name: string
    description: string
    actions: Array<{
        actionType: number
        to: string
        data: string
        value: number
    }>
}



interface IProposalItemQuery {
    search: string
    voteId: number | string
    statusId: number | string
}


interface IProposalTransactionCookie {
    network: NetworksType
    address: string
    hash: string
    name: string
}


export {
    IProposal,
    IProposalPath,
    IProposalParams,
    IProposalNormalizedAsDefault,
    ICreateProposalChainParams,
    ICreateProposalChainResponse,
    ICreateProposalParams,

    IProposalItem,
    IProposalItemQuery,
    INormalizedProposalItemAsTable,

    proposalStatuses,

    IPaginationParams,

    IProposalTransactionCookie
}
