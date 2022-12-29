import { IPaginationParams } from '@/types/api'

interface IProposal {
    id: number
    name: string
    description: string
    network: string
    daoAddress: string
    creationTx: string
    createdBy: string
}

interface IProposalParams {
    id: string
}

interface ICreateProposalOnChainParams {
    contractAddress: string
    actions: Array<{
        actionType: number
        to: string
        data: string
        value: number
    }>
}

interface ICreateProposalOnChainResponse {
    hash: string
}

interface ICreateProposalParams {
    creationTx: string
    name: string
    description: string
}

interface IProposalItem extends IProposal {
}

interface IProposalItemQuery {
    search: string
    voteId: number | string
    statusId: number | string
}

interface INormalizedProposalItem extends IProposal {
}


export {
    IProposal,
    IProposalParams,
    ICreateProposalOnChainParams,
    ICreateProposalOnChainResponse,
    ICreateProposalParams,

    IProposalItem,
    IProposalItemQuery,
    INormalizedProposalItem,

    IPaginationParams
}
