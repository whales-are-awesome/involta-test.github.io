import { IPaginationParams } from '@/types/api'
import { IProposalAPI, IProposalChain, ProposalPipeline } from '@/types/entries/proposal'

interface IProposal extends IProposalAPI, IProposalChain {
    createdByName?: string
}

interface IProposalItem extends IProposal {
}

interface IProposalNormalizedAsDefault extends Omit<IProposal, 'pipeline'> {
    createdByAddressOrName: string
    pipeline: {
        actionType: ProposalPipeline[0]
        to: ProposalPipeline[1]
        data: ProposalPipeline[2]
        value: ProposalPipeline[3]
        isContract: boolean
        addressOrName: string
    }[]
}

interface INormalizedProposalItem extends IProposalNormalizedAsDefault {
}

interface IProposalPath {
    network: string
    address: string
    id: number | string
}

interface IProposalParams {
    id: string
}

interface ICreateProposalChainParams {
    contractAddress: string
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
    INormalizedProposalItem,

    IPaginationParams
}
